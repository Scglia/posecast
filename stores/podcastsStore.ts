import create from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

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

      addPodcastFromRSS: async (rssUrl: string) => {
        const response = await fetch(`/api/fetch-rss?url=${rssUrl}`);
        const jsonData = await response.json();
        console.log(jsonData);
        const newPodcast = {
          imageUrl: jsonData.itunes.image,
          title: jsonData.title,
          description: jsonData.description,
          website: jsonData.link,
          rssFeed: rssUrl,
          id: uuidv4(),
        };

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
