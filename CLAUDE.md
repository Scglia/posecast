# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Posecast is a mobile-first RSS podcast reader PWA built with Next.js, React, and TypeScript. The app focuses on podcast listening with local data storage and offline capabilities.

**Tech Stack:**
- Next.js 14 with React 18
- TypeScript with strict mode
- Vanilla Extract CSS for styling
- Zustand for state management with persistence
- TanStack React Query for data fetching
- PWA with next-pwa

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Architecture

### State Management
- **Zustand stores** in `/stores/` with persistence:
  - `playerStore.ts` - Audio player state (current episode, time position)
  - `podcastsStore.ts` - Podcast subscriptions and RSS data fetching

### Data Flow
- RSS feeds are fetched via `/api/fetch-rss.ts` API route using rss-parser
- Podcast data is stored locally in Zustand with browser persistence
- Audio playback managed by custom `useAudio` hook with throttled time updates

### Key Components
- **PlayerLayout** - Main layout wrapper with persistent audio player
- **DynamicPlayer** - Audio player component (client-side only)
- **PodcastList/EpisodeList** - Main content views with loading states
- All components use Vanilla Extract CSS (`.css.ts` files)

### Custom Hooks
- `useAudio` - Audio playback with state management and cleanup
- `useFetchRSS` - RSS feed fetching with React Query
- `useLongPress` - Mobile touch interaction handling
- `useWindowSize` - Responsive behavior

### Styling System
- Vanilla Extract CSS-in-JS with `.css.ts` files
- Mobile-first responsive design
- Font loading via next/font (Inter)
- SVG icons loaded via @svgr/webpack

### PWA Features
- Service worker for offline functionality
- Manifest configuration for mobile app behavior
- Context menu disabled for mobile long-press support

## File Organization

- `/components/` - React components organized by feature
- `/hooks/` - Custom React hooks
- `/pages/` - Next.js pages and API routes
- `/stores/` - Zustand state management
- `/styles/` - Global and page-specific Vanilla Extract styles
- `/resources/` - Static assets (icons, helpers, mock data)