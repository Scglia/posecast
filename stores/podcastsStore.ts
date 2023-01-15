import create from "zustand";
import { persist } from "zustand/middleware";

const usePodcastsStore = create(
  persist(
    (set, get: any) => ({
      podcasts: [],
      addPodcast: (newPodcast: {
        imageUrl: string;
        title: string;
        description: string;
        website: string;
        rssFeed: string;
        id: string;
      }) => {
        set(() => ({
          podcasts: [...get().podcasts, newPodcast],
        }));
      },
      getPodcastById: (id: string) => {
        const podcasts = get().podcasts;
        return podcasts.find((podcast: any) => podcast.id === id);
      },
    }),
    { name: "podcasts" }
  )
);
export default usePodcastsStore;
