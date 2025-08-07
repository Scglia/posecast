# Posecast Architecture

## Stack

- Next.js 14 (pages router), React 18
- State: Zustand (persist with localStorage)
- Data fetching: React Query + Next API route using rss-parser
- Styling: vanilla-extract CSS
- Animations/gestures: framer-motion
- SVG: @svgr/webpack
- PWA: next-pwa

## Runtime layout

- `pages/_app.tsx`: wraps pages with React Query provider and `pages/app/PlayerLayout.tsx`.
- `pages/app/PlayerLayout.tsx`: renders page content and the bottom, client-only player (`components/player/DynamicPlayer.tsx`).
- Player is SSR-disabled (depends on localStorage via Zustand).

## Data flow

```mermaid
flowchart TD
  A[User enters RSS URL or picks example] --> B[podcastsStore.addPodcastFromRSS]
  B --> C[/api/fetch-rss?url=...]
  C -->|rss-parser, strip heavy fields| D[Sanitized feed JSON]
  D --> E[podcastsStore.podcasts]
  E --> F[/podcasts page list]

  subgraph Episodes page
    G[useFetchRSS(rssFeed)] --> H[EpisodeList]
    H --> I[EpisodeListItem click]
    I --> J[playerStore.setPlayerData]
    J --> K[Player]
  end

  K -->|useAudio timeupdate (throttled)| L[playerStore.setCurrentTime]
```

## State (Zustand)

- `stores/podcastsStore.ts` (persist key: `podcasts`)
  - State: `podcasts: Podcast[]`, `fetchStatus?: 'LOADING'|'SUCCESS'|'ERROR'`
  - Actions: `addPodcast`, `removePodcast`, `addPodcastFromRSS`, `setEpisodeQuantity`
- `stores/playerStore.ts` (persist key: `player`)
  - State: `imageUrl`, `title`, `episodeUrl?`, `episodeId?`, `currentTime?`
  - Actions: `setPlayerData({ imageUrl, title, episodeUrl, episodeId })`, `setCurrentTime(number)`

### Suggested types

```ts
export type Podcast = {
  id: string;
  title: string;
  description: string;
  website: string;
  rssFeed: string;
  imageUrl: string;
  episodeQuantity?: string;
};

export type PlayerState = {
  imageUrl: string;
  title: string;
  episodeUrl?: string;
  episodeId?: string;
  currentTime?: number;
};
```

## Player architecture

- `components/player/Player.tsx` composes:
  - `usePlayerStore` for episode meta and saved `currentTime`.
  - `useAudio(episodeUrl, savedCurrentTime, setSavedCurrentTime)` which creates an `HTMLAudioElement`, wires events, exposes `play/pause/seek`, and throttles `timeupdate` to 1s.
  - `useWindowSize()` to scale horizontal swipe distance to seek magnitude.
  - `PlayerUI` for gestures and visuals, `TimeOverlay` to preview seek time, `Queue` as placeholder.
- Gestures:
  - Tap toggles play/pause.
  - Horizontal pan: compute target time by squared ratio of swipe distance over viewport width; clamp to [1, duration]; seek on end.
  - Vertical pan: expand/collapse the player.

## Fetching flow

- Client: `useFetchRSS(url)` uses React Query → `/api/fetch-rss`.
- Server: `pages/api/fetch-rss.ts` uses `rss-parser.parseURL(url)` and strips heavy/non-needed fields from `feed.items`.
- Episodes: `components/episode-list/EpisodeList.tsx` consumes data, filters by title text, sets episode count on the parent podcast.

## Styling

- vanilla-extract collocated `.css.ts` files per component.
- Global gradient and fixed bottom player container in `styles/global.css.ts`.

## PWA

- `next-pwa` configured in `next.config.js` with `dest: public`. Build for production to generate SW.

## Notes & caveats

- API route accepts arbitrary `url` and proxies server-side via rss-parser; consider validation/allowlist if deploying publicly.
- `EpisodeList` assumes image is at `data.image.url`; add fallback for feeds without it.
- `useAudio` persists `currentTime` once per second; resets to `initialTime` on URL change.
- Long-press behavior (podcast deletion UI) disables context menu via `PlayerLayout` effect.
