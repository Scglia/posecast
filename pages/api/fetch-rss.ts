import type { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";
import dns from "node:dns";
import net from "node:net";

// In-memory caches/limits (best-effort; per-instance only)
const responseCache = new Map<
  string,
  { expiresAt: number; payload: unknown }
>();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX_REQUESTS = 60; // per IP per window
const ipWindowCounters = new Map<string, { resetAt: number; count: number }>();

// Network constraints
const REQUEST_TIMEOUT_MS = 10_000; // total request timeout
const MAX_REDIRECTS = 3;
const MAX_CONTENT_LENGTH_BYTES = 2_500_000; // ~2.5MB

// Content-Type allowlist (some feeds are text/xml or even text/plain)
const ALLOWED_CONTENT_TYPES = [
  "application/rss+xml",
  "application/atom+xml",
  "application/xml",
  "text/xml",
  "text/plain",
];

// Default host allowlist derived from bundled example data.
// You can extend/override via env `RSS_ALLOWED_HOSTS` (comma-separated).
const defaultAllowedHosts = new Set<string>([
  "feeds.simplecast.com",
  "feeds.megaphone.fm",
  "www.heavybit.com",
]);

function getAllowedHosts(): Set<string> {
  const fromEnv =
    process.env.RSS_ALLOWED_HOSTS?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  if (fromEnv.length > 0) return new Set(fromEnv);
  return defaultAllowedHosts;
}

function isHttpsRequired(): boolean {
  // Require HTTPS in production by default; allow HTTP in dev for convenience.
  return (
    process.env.NODE_ENV === "production" &&
    process.env.RSS_ALLOW_HTTP !== "true"
  );
}

function getClientIp(req: NextApiRequest): string {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length > 0) return xf.split(",")[0].trim();
  if (Array.isArray(xf) && xf.length > 0) return xf[0].split(",")[0].trim();
  return req.socket.remoteAddress || "unknown";
}

function hitRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipWindowCounters.get(ip);
  if (!entry || now >= entry.resetAt) {
    ipWindowCounters.set(ip, { resetAt: now + RATE_LIMIT_WINDOW_MS, count: 1 });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  entry.count += 1;
  return false;
}

function isPrivateIPv4(ip: string): boolean {
  // IPv4 only (basic ranges)
  if (!net.isIPv4(ip)) return false;
  const parts = ip.split(".").map((n) => parseInt(n, 10));
  const [a, b] = parts;
  if (a === 10) return true; // 10.0.0.0/8
  if (a === 127) return true; // 127.0.0.0/8 loopback
  if (a === 0) return true; // 0.0.0.0/8
  if (a === 100 && b >= 64 && b <= 127) return true; // 100.64.0.0/10 shared addr space
  if (a === 169 && b === 254) return true; // 169.254.0.0/16 link-local
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a >= 224 && a <= 239) return true; // multicast 224.0.0.0/4 (block it)
  // Block metadata well-known IPv4
  if (ip === "169.254.169.254") return true; // AWS/GCP/Azure metadata
  return false;
}

function isBlockedIPv6(ip: string): boolean {
  if (!net.isIPv6(ip)) return false;
  const lower = ip.toLowerCase();
  if (lower === "::1") return true; // loopback
  // Unique local fc00::/7, link-local fe80::/10, site-local fec0::/10 (deprecated)
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // fc00::/7
  if (
    lower.startsWith("fe8") ||
    lower.startsWith("fe9") ||
    lower.startsWith("fea") ||
    lower.startsWith("feb")
  )
    return true; // fe80::/10
  if (lower.startsWith("fec")) return true; // fec0::/10
  // IPv4-mapped loopback ::ffff:127.0.0.1
  if (lower.includes("::ffff:127.")) return true;
  return false;
}

function isBlockedHostname(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost")) return true;
  if (h === "0" || h === "0.0.0.0") return true;
  return false;
}

async function resolveAllIPs(hostname: string): Promise<string[]> {
  // If input is already an IP literal, return as-is
  if (net.isIP(hostname)) return [hostname];
  try {
    const results = await dns.promises.lookup(hostname, {
      all: true,
      verbatim: false,
    });
    return results.map((r) => r.address);
  } catch {
    return [];
  }
}

function isXmlLike(contentType: string | null): boolean {
  if (!contentType) return false;
  const value = contentType.split(";")[0].trim().toLowerCase();
  return ALLOWED_CONTENT_TYPES.includes(value) || value.endsWith("+xml");
}

function xmlLooksLikeFeedSample(sample: string): boolean {
  const s = sample.slice(0, 1024).toLowerCase();
  return s.includes("<rss") || s.includes("<feed") || s.includes("<rdf");
}

async function secureFetch(
  url: URL,
  { timeoutMs }: { timeoutMs: number }
): Promise<{ bodyText: string; contentType: string | null }> {
  // Manual redirect handling with revalidation
  let currentUrl = new URL(url.toString());
  for (let i = 0; i <= MAX_REDIRECTS; i += 1) {
    // Validate scheme each hop
    if (currentUrl.protocol !== "https:" && currentUrl.protocol !== "http:") {
      throw Object.assign(new Error("URL must use http or https"), {
        status: 400,
      });
    }

    // Enforce HTTPS if required
    if (isHttpsRequired() && currentUrl.protocol !== "https:") {
      throw Object.assign(new Error("HTTPS required"), { status: 400 });
    }

    // Basic hostname checks
    if (isBlockedHostname(currentUrl.hostname)) {
      throw Object.assign(new Error("Blocked hostname"), { status: 400 });
    }

    // Resolve and block private IPs for SSRF defense
    const ips = await resolveAllIPs(currentUrl.hostname);
    if (ips.length === 0) {
      throw Object.assign(new Error("Host could not be resolved"), {
        status: 400,
      });
    }
    for (const ip of ips) {
      if (isPrivateIPv4(ip) || isBlockedIPv6(ip)) {
        throw Object.assign(new Error("Blocked IP range"), { status: 400 });
      }
    }

    // Optional host allowlist (production recommended)
    const allowedHosts = getAllowedHosts();
    const allowAll =
      process.env.RSS_ALLOW_ALL_HOSTS === "true" ||
      process.env.NODE_ENV !== "production";
    if (!allowAll) {
      if (!allowedHosts.has(currentUrl.hostname)) {
        throw Object.assign(new Error("Host not in allowlist"), {
          status: 400,
        });
      }
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    let res: Response;
    try {
      res = await fetch(currentUrl, {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          "User-Agent": "PosecastRSSProxy/1.0 (+https://posecast.local)",
          Accept:
            "application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.8, text/plain;q=0.5, */*;q=0.1",
        },
      });
    } finally {
      clearTimeout(timeout);
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) {
        throw Object.assign(new Error("Redirect without Location header"), {
          status: 502,
        });
      }
      const nextUrl = new URL(location, currentUrl);
      currentUrl = nextUrl;
      // loop continues to revalidate next hop
      if (i === MAX_REDIRECTS) {
        throw Object.assign(new Error("Too many redirects"), { status: 502 });
      }
      continue;
    }

    if (!res.ok) {
      throw Object.assign(new Error(`Upstream responded ${res.status}`), {
        status: 502,
      });
    }

    // Pre-check content length
    const contentLengthHeader = res.headers.get("content-length");
    if (contentLengthHeader) {
      const contentLength = Number(contentLengthHeader);
      if (
        Number.isFinite(contentLength) &&
        contentLength > MAX_CONTENT_LENGTH_BYTES
      ) {
        throw Object.assign(new Error("Feed too large"), { status: 413 });
      }
    }

    const contentType = res.headers.get("content-type");

    // Stream and enforce size limit
    const reader = res.body?.getReader();
    if (!reader) {
      throw Object.assign(new Error("No response body"), { status: 502 });
    }
    const chunks: Uint8Array[] = [];
    let received = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        received += value.byteLength;
        if (received > MAX_CONTENT_LENGTH_BYTES) {
          try {
            reader.cancel();
          } catch {}
          throw Object.assign(new Error("Feed too large"), { status: 413 });
        }
      }
    }

    const decoder = new TextDecoder("utf-8", { fatal: false });
    const bodyText = decoder.decode(Buffer.concat(chunks as any));

    // Content-type sanity check (be lenient but require XML-ish or XML-looking content)
    if (!isXmlLike(contentType) && !xmlLooksLikeFeedSample(bodyText)) {
      throw Object.assign(new Error("Response is not an RSS/Atom XML"), {
        status: 415,
      });
    }

    return { bodyText, contentType };
  }

  // Should not reach here
  throw Object.assign(new Error("Unexpected redirect handling error"), {
    status: 500,
  });
}

function sanitizeFeed(feed: any) {
  if (!feed) return feed;
  if (Array.isArray(feed.items)) {
    // Hard cap number of items to avoid huge payloads
    if (feed.items.length > 500) {
      feed.items = feed.items.slice(0, 500);
    }
    feed.items.forEach((item: any) => {
      delete item.author;
      delete item.content;
      delete item["content:encoded"];
      delete item["content:encodedSnippet"];
      delete item.contentSnippet;
      delete item.creator;
      delete item.link;
      if (item.itunes) {
        delete item.itunes.author;
        delete item.itunes.explicit;
        delete item.itunes.subtitle;
        delete item.itunes.summary;
      }
    });
  }
  return feed;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  const urlParam = request.query?.url;

  if (urlParam === undefined) {
    return response
      .status(400)
      .json({ error: 'Query parameter "url" unspecified' });
  }

  if (Array.isArray(urlParam)) {
    return response
      .status(400)
      .json({ error: 'Query parameter "url" must be a single string' });
  }

  const clientIp = getClientIp(request);
  if (hitRateLimit(clientIp)) {
    return response.status(429).json({ error: "Too many requests" });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(urlParam);
  } catch {
    return response.status(400).json({ error: "Invalid URL" });
  }

  // Simple cache by absolute URL (including query)
  const cacheKey = targetUrl.toString();
  const cached = responseCache.get(cacheKey);
  const now = Date.now();
  if (cached && cached.expiresAt > now) {
    response.setHeader("Cache-Control", "private, max-age=300");
    return response.status(200).json(cached.payload);
  }

  try {
    const { bodyText } = await secureFetch(targetUrl, {
      timeoutMs: REQUEST_TIMEOUT_MS,
    });

    const parser = new Parser();
    const feed = await parser.parseString(bodyText);
    const sanitized = sanitizeFeed(feed);

    // Cache for 5 minutes
    responseCache.set(cacheKey, {
      expiresAt: now + 5 * 60 * 1000,
      payload: sanitized,
    });

    response.setHeader("Cache-Control", "private, max-age=300");
    return response.status(200).json(sanitized);
  } catch (error: any) {
    const status = typeof error?.status === "number" ? error.status : 502;
    const message =
      typeof error?.message === "string"
        ? error.message
        : "Failed to fetch feed";
    return response.status(status).json({ error: message });
  }
}
