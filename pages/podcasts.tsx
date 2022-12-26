import "../styles/global.css";
import { playerBox } from "../styles/global.css";
import { podcastListBox } from "../styles/podcasts.css";
import PodcastList from "../components/podcast-list/PodcastList";
import PlayerWithAudio from "../components/player/PlayerWithAudio";
import podcastData from "../resources/data/podcastsData";
import { PlayerProvider } from "../contexts/PlayerContext";

export default function Podcasts() {
  return (
    <>
      <div className={podcastListBox}>
        <PodcastList podcasts={podcastData} />
      </div>
      <div className={playerBox}>
        <PlayerProvider>
          <PlayerWithAudio />
        </PlayerProvider>
      </div>
    </>
  );
}
