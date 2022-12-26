import { createContext, useContext, useState } from "react";
const PlayerContext = createContext({});

export function PlayerProvider(props: any) {
  const [playerData, setPlayerData] = useState({
    imageUrl: "default.jpg",
    title: "",
    episodeUrl: undefined,
  });
  const value = [playerData, setPlayerData];
  return <PlayerContext.Provider value={value} {...props} />;
}

export function usePlayerContext() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context as any;
}
