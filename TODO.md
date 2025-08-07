- Component no-ssr?
- [ ] Typescript
- [ ] Memoization, optimising renders
- [ ] CSS Theming

---

# Queue

- [x] Swipe left/right vs up
- [ ] Long press to reorder
- [ ] Context menu

---

# Deployment Checklist

- Vercel → Project → Settings → Environment Variables
  - `RSS_ALLOWED_HOSTS`: Comma-separated domains to allow in production (e.g. `feeds.simplecast.com,feeds.megaphone.fm,www.heavybit.com`).
  - OR set `RSS_ALLOW_ALL_HOSTS=true` to allow any RSS host (not recommended in production).
  - (Optional) `RSS_ALLOW_HTTP=true` if you must support `http://` feeds. Default behavior in prod is HTTPS-only.
- Runtime: Keep the RSS API on Node.js Serverless Functions (do not move `pages/api/fetch-rss.ts` to Edge).
- Node version: Use the Vercel default (Node 18+).
- Verify after deploy
  - Allowed host returns 200: `curl "https://posecast.vercel.app/api/fetch-rss?url=https%3A%2F%2Ffeeds.simplecast.com%2Feew_vyNL" | head`
  - Disallowed host returns 400 (if using allowlist): `curl "https://posecast.vercel.app/api/fetch-rss?url=https%3A%2F%2Fexample.com%2Frss" -i`
- Rate limiting & cache are in-memory per instance. For global enforcement, provision a shared store (e.g. Vercel KV/Upstash Redis) and migrate counters/cache there.
- Redirects are capped (3), timeout is 10s, and response size is limited (~2.5MB). If feeds time out or exceed size, adjust code or hosting plan accordingly.
- Monitor: Use Vercel logs to watch for 4xx/5xx responses from `/api/fetch-rss` and adjust allowlist or settings as needed.
