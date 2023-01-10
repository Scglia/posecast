import "../styles/global.css";
import { podcastListBox } from "../styles/podcasts.css";
import PodcastList from "../components/podcast-list/PodcastList";
import podcastData from "../resources/data/podcastsData";

export default function Podcasts() {
  return (
    <>
      <div className={podcastListBox}>
        <PodcastList podcasts={podcastData} />
      </div>
    </>
  );
}
