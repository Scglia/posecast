# Development Guide

## Requirements

- Node 18+
- npm 9+ (or compatible PNPM/Yarn if you prefer; scripts assume npm)

## Install & run

```sh
npm install
npm run dev
```

- App runs at `http://localhost:3000`
- Production build:

```sh
npm run build && npm start
```

## Project scripts

- `dev`: start Next dev server
- `build`: Next production build (generates PWA artifacts)
- `start`: run production server
- `lint`: Next/ESLint

## Conventions

- Components live under `components/*` with co-located `*.css.ts` via vanilla-extract.
- Prefer meaningful names; avoid 1–2 char identifiers; carry intent in variable names.
- Use early returns and clear guard clauses.
- Keep comments for non-obvious “why”; avoid inline comments inside JSX unless essential.
- Types: annotate public APIs and function signatures; avoid `any` where feasible.

## State

- Zustand stores persist to `localStorage` under keys `podcasts` and `player`.
- If you change store shape, consider a migration (Zustand persist supports versions/migrations).

## Data fetching

- Client: `hooks/useFetchRSS` (React Query) → `pages/api/fetch-rss`.
- Server: `rss-parser` fetches remote URL and sanitizes feed items.
- Add validations if exposing publicly (protect against SSRF and timeouts).

## Styling

- Use vanilla-extract: create `Component.css.ts` next to the component.
- Global styles in `styles/global.css.ts`; import in pages (e.g., `pages/index.tsx`).

## SVGs

- Import like React components thanks to SVGR:

```tsx
import PlayIcon from "../../resources/icons/play_small.svg";
```

## PWA

- Enabled via `next-pwa`; SW emitted to `public/` during production build.
- Test PWA features in a production build (`npm run build && npm start`).

## Common tasks

- Add an example podcast set: `pages/index.tsx` uses `resources/data/podcastsData.ts` → `usePodcastsStore().addPodcast()`
- Add a podcast via RSS: `pages/podcasts.tsx` uses input → `usePodcastsStore().addPodcastFromRSS()`
- Render episodes of a podcast: `pages/episodes/[podcastId].tsx` → `components/episode-list/EpisodeList.tsx`
- Start playback when selecting an episode: `EpisodeList` → `playerStore.setPlayerData()` → player picks up via `useAudio`

## Testing & QA

- No test setup is included yet. Recommended next steps:
  - Unit test helpers and hooks (`dateTime`, `useAudio` with JSDOM mocks).
  - Integration test navigation flows with Playwright.

## Troubleshooting

- Player not visible: ensure `playerStore.title` is set by selecting an episode.
- Audio stuck in loading: check CORS and public accessibility of the episode URL.
- Failing to parse feed: try the URL directly in `rss-parser`; some feeds require CORS proxy if fetched client-side (we fetch server-side).

## Security notes

- The RSS proxy (`pages/api/fetch-rss.ts`) enforces:

  - Input validation (URL string only), GET-only method
  - SSRF protections: DNS resolution + block private, loopback, link-local, metadata IP ranges; block `localhost`
  - Optional host allowlist in production
  - Timeouts (10s total), redirect cap (3), and response size limit (~2.5MB)
  - Basic per-IP rate limiting (best-effort, in-memory)
  - Content-type and body sniffing checks (XML/Atom/RSS)
  - Sanitization and item cap (max 500 items)
  - 5-minute private cache of successful responses

- Environment variables:

  - `RSS_ALLOWED_HOSTS`: Comma-separated list of hostnames allowed in production (e.g. `feeds.simplecast.com,feeds.megaphone.fm,www.heavybit.com`).
  - `RSS_ALLOW_ALL_HOSTS`: Set to `true` to allow any host (not recommended in production). Default: allowed only in development.
  - `RSS_ALLOW_HTTP`: Set to `true` to allow `http:` (non-TLS) URLs. Default: allowed in development, blocked in production.

- Defaults:
  - Development: all hosts allowed, HTTP allowed (for convenience).
  - Production: HTTPS required and hosts must be in `RSS_ALLOWED_HOSTS` unless `RSS_ALLOW_ALL_HOSTS=true`.
