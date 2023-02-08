import create from "zustand";
import { persist } from "zustand/middleware";

const usePlayerStore = create(
  persist(
    (set, get) => ({
      imageUrl: "default.jpg",
      title: "",
      episodeUrl: undefined,
      episodeId: undefined,
      currentTime: undefined,
      setPlayerData: (params: {
        imageUrl: string;
        title: string;
        episodeUrl: string;
        episodeId: string;
      }) => {
        set(() => ({
          imageUrl: params.imageUrl,
          title: params.title,
          episodeUrl: params.episodeUrl,
          episodeId: params.episodeId,
          currentTime: undefined,
        }));
      },
      setCurrentTime: (currentTime: number) => {
        set(() => ({
          currentTime,
        }));
      },
    }),
    { name: "player" }
  )
);
export default usePlayerStore;
