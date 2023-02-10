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
        episodeQuantity: undefined;
      }) => {
        set(() => ({
          podcasts: [newPodcast, ...get().podcasts],
        }));
      },

      removePodcast: (podcastId: string) => {
        set(() => ({
          podcasts: get().podcasts.filter(
            (podcast: any) => podcast.id !== podcastId
          ),
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
            const newPodcast = {
              imageUrl: jsonData.itunes.image,
              title: jsonData.title,
              description: jsonData.description,
              website: jsonData.link,
              rssFeed: rssUrl,
              episodeQuantity: `${jsonData.items.length}`,
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
      setEpisodeQuantity: (podcastId: string, episodeQuantity: string) => {
        const podcasts = get().podcasts;
        const podcastIndex = podcasts.findIndex(
          (podcast: any) => podcast.id === podcastId
        );
        podcasts[podcastIndex].episodeQuantity = episodeQuantity;
        set(() => ({
          podcasts: [...podcasts],
        }));
      },
    }),
    { name: "podcasts" }
  )
);
export default usePodcastsStore;
