import "../styles/global.css";
import Button from "../components/generic/Button";
import getPodcastsData from "../resources/data/podcastsData";
import { regular } from "../styles/fonts.css";
import usePodcastsStore from "../stores/podcastsStore";
import Link from "../components/generic/Link";
import Title from "../components/generic/Title";

export default function Home() {
  const addPodcast = usePodcastsStore((state: any) => state.addPodcast);

  const addExemplePodcasts = () => {
    Object.values(getPodcastsData()).forEach((podcast) => {
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
      <Title />
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
        <Link href="/podcasts" variant="unstyled">
          <Button onClick={addExemplePodcasts}>
            Open the app with example podcasts
          </Button>
        </Link>
      </div>
    </div>
  );
}
