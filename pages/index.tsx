import "../styles/global.css";
import PodcastList from "../components/podcast-list/PodcastList";
import Player from "../components/player/PlayerUI";
import EpisodeListItem from "../components/episode-list/EpisodeListItem";
import EpisodeList from "../components/episode-list/EpisodeList";
import PodcastDetails from "../components/podcast-details/PodcastDetails";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/podcasts">Podcasts</Link>
    </div>
  );
}
