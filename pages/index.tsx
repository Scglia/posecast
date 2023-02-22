import "../styles/global.css";
import Button from "../components/generic/Button";
import examplePodcasts from "../resources/data/podcastsData";
import { regular } from "../styles/fonts.css";
import usePodcastsStore from "../stores/podcastsStore";

export default function Home() {
  const addPodcast = usePodcastsStore((state: any) => state.addPodcast);

  const addExemplePodcasts = () => {
    Object.values(examplePodcasts).forEach((podcast) => {
      addPodcast(podcast);
    });
  };

  return (
    <div
      style={{
        padding: "24px",
        height: "100vh",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div style={{ width: "100%" }}>
        <span style={{ color: "rgb(186, 186, 186)" }}>Welcome to posecast</span>{" "}
        <br />
        <span className={regular}> Listen to podcasts via RSS</span> <br />
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Button href="/podcasts" onClick={addExemplePodcasts}>
          Open the app with example podcasts
        </Button>
      </div>
    </div>
  );
}
