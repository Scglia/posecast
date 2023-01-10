import dynamic from "next/dynamic";

// Disables Server Side Rendering, because the player data is fetched in localStorage by Zustand.
const DynamicPlayer = dynamic(() => import("./PlayerWithAudio"), {
  ssr: false,
});

export default DynamicPlayer;
