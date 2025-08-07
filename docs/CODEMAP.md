# Code Map

A quick reference of where things live and where to make changes.

## Top-level

- `next.config.js`: vanilla-extract plugin, SVGR for SVGs, next-pwa.
- `package.json`: scripts and deps.
- `public/`: PWA manifest and icons, mock assets.
- `styles/`: global and page-level styles via vanilla-extract.

## Pages

- `pages/_app.tsx`: React Query provider, wraps pages in `PlayerLayout` and Google font.
- `pages/_document.tsx`: HTML shell with PWA meta and icons.
- `pages/index.tsx`: Landing; loads example podcasts into store and links to `/podcasts`.
- `pages/podcasts.tsx`: Input to add RSS, `DynamicPodcastList` rendering from store.
- `pages/episodes/[podcastId].tsx`: Podcast details, filter box, and `EpisodeList`.
- `pages/api/fetch-rss.ts`: RSS proxy using `rss-parser`; strips heavy fields.

## State stores

- `stores/podcastsStore.ts`
  - `addPodcast(newPodcast)` push to top of list
  - `removePodcast(podcastId)`
  - `addPodcastFromRSS(rssUrl)` → sets `fetchStatus` and appends parsed feed as a `Podcast`
  - `setEpisodeQuantity(podcastId, episodeQuantity)`
- `stores/playerStore.ts`
  - `setPlayerData({ imageUrl, title, episodeUrl, episodeId })`
  - `setCurrentTime(currentTime)`

## Hooks

- `hooks/useFetchRSS.ts`: React Query wrapper for `/api/fetch-rss`.
- `hooks/useAudio.ts`: Manages `HTMLAudioElement`, time/playing/loading/error; exposes `play/pause/seek`.
- `hooks/useLongPress.ts`: Long-press gesture props factory.
- `hooks/useWindowSize.ts`: Tracks viewport size.

## Player components

- `components/player/DynamicPlayer.tsx`: `ssr: false` import of player.
- `components/player/Player.tsx`: Player logic, swipe seek, formatting, composition.
- `components/player/PlayerUI.tsx`: Visual UI and pan/tap gesture handlers via framer-motion.
- `components/player/TimeOverlay.tsx`: Time preview when seeking.
- `components/player/Queue.tsx`: Static placeholder queue UI.

## Podcasts and episodes

- `components/podcast-list/DynamicPodcastList.tsx`: Client-only podcast list (if present) or simple pass-through.
- `components/podcast-list/PodcastList.tsx`: Lists podcasts from store; long-press to show delete; link to episodes.
- `components/podcast-list/PodcastListItem.tsx`: Renders item, delete state.
- `components/episode-list/EpisodeList.tsx`: Fetch RSS, filter items, set episode count, render items.
- `components/episode-list/EpisodeListItem.tsx`: Individual episode line.
- `components/podcast-details/PodcastDetails*.tsx`: Header and details.

## Generic components

- `components/generic/Button.tsx`: Variants + optional loading overlay; accepts `status="LOADING"`.
- `components/generic/TextInput.tsx`: Styled text input.
- `components/generic/Link.tsx`: Wraps `next/link` with vanilla-extract variants.
- `components/input-with-button/InputWithButton.tsx`: Input + button combo with fetch status.
- `components/generic/Placeholder.tsx`: Skeleton placeholder (for list items).

## Helpers and data

- `resources/data/podcastsData.ts`: Example podcast fixtures (with random IDs).
- `resources/helpers/dateTime.ts`: Time and date formatting utilities.
- `resources/helpers/clamp.ts`: Clamp helper.

## Where to…

- Add a podcast programmatically: `stores/podcastsStore.ts` → `addPodcast()`
- Add via RSS: `stores/podcastsStore.ts` → `addPodcastFromRSS()` and `pages/api/fetch-rss.ts`
- Change player behavior: `components/player/Player.tsx` and `hooks/useAudio.ts`
- Change player UI/gestures: `components/player/PlayerUI.tsx`
- Persist additional player fields: `stores/playerStore.ts` + update consumers
- Add new styling tokens/variants: local `*.css.ts` next to component, or `styles/*`
- Add a new page: `pages/*.tsx` (pages router)

## Known edge cases

- Some feeds omit `image.url` or `itunes.duration`; add fallbacks in `EpisodeList` and formatters.
- API route currently lacks URL validation; consider allowlist and/or fetch timeout handling.
- Long-press relies on disabling context menu in `PlayerLayout`; be mindful if removing that effect.
