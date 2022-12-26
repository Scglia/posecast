import { useRouter } from "next/router";
import "../../styles/global.css";
import { playerBox } from "../../styles/global.css";
import { regular } from "../../styles/fonts.css";
import { podcastDetailsBox, episodesBox } from "../../styles/episodes.css";
import PlayerWithAudio from "../../components/player/PlayerWithAudio";
import EpisodeList from "../../components/episode-list/EpisodeList";
import PodcastDetails from "../../components/podcast-details/PodcastDetails";
import podcastsData from "../../resources/data/podcastsData";
import { PlayerProvider } from "../../contexts/PlayerContext";
import Link from "next/link";

export default function Episodes() {
  // const episodes = [
  //   {
  //     title: "#144 A short title to being with",
  //     releaseDate: "Dec 8th",
  //     duration: "43min",
  //     uuid: "1",
  //   },
  //   {
  //     title:
  //       "#143 A longer title for sure this one is super long it's like it never ends",
  //     releaseDate: "Dec 4th",
  //     duration: "32min",
  //     uuid: "2",
  //   },
  //   {
  //     title: "#142 A medium one here, it's manageable",
  //     releaseDate: "Dec 1st",
  //     duration: "49min",
  //     uuid: "3",
  //   },
  //   {
  //     title: "#140 Last one, let's make it count",
  //     releaseDate: "Nov 28th",
  //     duration: "39min",
  //     uuid: "4",
  //   },
  //   {
  //     title: "#140 Last one, let's make it count",
  //     releaseDate: "Nov 28th",
  //     duration: "39min",
  //     uuid: "5",
  //   },
  //   {
  //     title: "#140 Last one, let's make it count",
  //     releaseDate: "Nov 28th",
  //     duration: "39min",
  //     uuid: "6",
  //   },
  //   {
  //     title: "#140 Last one, let's make it count",
  //     releaseDate: "Nov 28th",
  //     duration: "39min",
  //     uuid: "7",
  //   },
  //   {
  //     title: "#140 Last one, let's make it count",
  //     releaseDate: "Nov 28th",
  //     duration: "39min",
  //     uuid: "8",
  //   },
  //   {
  //     title: "#140 Last one, let's make it count",
  //     releaseDate: "Nov 28th",
  //     duration: "39min",
  //     uuid: "9",
  //   },
  //   {
  //     title: "#140 Last one, let's make it count",
  //     releaseDate: "Nov 28th",
  //     duration: "39min",
  //     uuid: "10",
  //   },
  // ];

  const { podcastId } = useRouter().query;

  if (podcastId === undefined) return <div>Unknown podcast index</div>;
  const selectedPodcast = podcastsData[podcastId as keyof typeof podcastsData];

  return (
    <>
      <div className={podcastDetailsBox}>
        <Link href={"/podcasts"}>Back</Link>
        <PodcastDetails
          podcastImgUrl={selectedPodcast.imageUrl}
          podcastTitle={selectedPodcast.title}
          podcastDescription={selectedPodcast.description}
          podcastEpisodeQuantity={0}
          podcastWebsite={selectedPodcast.website}
        />
      </div>
      <div className={episodesBox}>
        <EpisodeList
          rssFeed={selectedPodcast.rssFeed}
          selectedEpisodeIndex={3}
        />
      </div>
    </>
  );
}
