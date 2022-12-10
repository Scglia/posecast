import "../styles/global.css";
import { playerBox } from "../styles/global.css";
import { podcastListBox } from "../styles/podcasts.css";
import PodcastList from "../components/podcast-list/PodcastList";
import PlayerWithAudio from "../components/player/PlayerWithAudio";
import podcastData from "../resources/data/podcastsData.json";

export default function Podcasts() {
  return (
    <>
      <div className={podcastListBox}>
        <PodcastList podcasts={podcastData} />
      </div>
      <div className={playerBox}>
        <PlayerWithAudio episodeUrl="https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/c44db111-b60d-436e-ab63-38c7c3402406/episodes/bb31ac83-76b3-454f-9306-6216c88fd2eb/audio/23fa3587-eeac-4a1c-84a4-7e42fa147355/default_tc.mp3?aid=rss_feed&feed=dLRotFGk" />
      </div>
    </>
  );
}
