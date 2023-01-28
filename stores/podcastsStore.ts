import create from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

const usePodcastsStore = create(
  persist(
    (set, get: any) => ({
      podcasts: [],
      fetchStatus: undefined,
      addPodcast: (newPodcast: {
        imageUrl: string;
        title: string;
        description: string;
        website: string;
        rssFeed: string;
        id: string;
      }) => {
        set(() => ({
          podcasts: [newPodcast, ...get().podcasts],
        }));
      },

      addPodcastFromRSS: async (rssUrl: string) => {
        set(() => ({
          fetchStatus: "LOADING",
        }));

        const response = await fetch(`/api/fetch-rss?url=${rssUrl}`)
          .then((response) => {
            if (response.status >= 400 && response.status < 600) {
              throw new Error("Bad response from server");
            }
            return response;
          })
          .then(async (response) => {
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
              podcasts: [newPodcast, ...get().podcasts],
              fetchStatus: "SUCCESS",
            }));
          })
          .catch((error) => {
            set(() => ({
              fetchStatus: "ERROR",
            }));
            console.log(error);
          });
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
