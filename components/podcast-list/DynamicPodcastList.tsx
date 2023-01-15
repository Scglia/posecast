import dynamic from "next/dynamic";

// Disables Server Side Rendering, because the podcast data is fetched in localStorage by Zustand.
const DynamicPodcastList = dynamic(() => import("./PodcastList"), {
  ssr: false,
});

export default DynamicPodcastList;
