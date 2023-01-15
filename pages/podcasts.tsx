import "../styles/global.css";
import { podcastListBox } from "../styles/podcasts.css";
import DynamicPodcastList from "../components/podcast-list/DynamicPodcastList";

export default function Podcasts() {
  return (
    <>
      <div className={podcastListBox}>
        <DynamicPodcastList />
      </div>
    </>
  );
}
