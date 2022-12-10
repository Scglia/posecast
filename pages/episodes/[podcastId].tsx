import { useRouter } from "next/router";
import "../../styles/global.css";
import { playerBox } from "../../styles/global.css";
import { regular } from "../../styles/fonts.css";
import { podcastDetailsBox, episodesBox } from "../../styles/episodes.css";
import PlayerWithAudio from "../../components/player/PlayerWithAudio";
import EpisodeList from "../../components/episode-list/EpisodeList";
import PodcastDetails from "../../components/podcast-details/PodcastDetails";
import useFetchRSS from "../../hooks/useFetchRSS";
import podcastsData from "../../resources/data/podcastsData.json";

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

  if (podcastId === undefined) return <div>Unknown podcast id</div>;
  const selectedPodcast = podcastsData[podcastId];
  const { data, error, isLoading } = useFetchRSS(selectedPodcast.rssFeed);
  console.log(data);
  if (error) return <div>error</div>;
  if (isLoading !== false || !data)
    return <div className={regular}>Loading</div>;

  const episodes = data?.items;
  console.log("episodes", episodes);
  return (
    <>
      <div className={podcastDetailsBox}>
        <PodcastDetails
          podcastImgUrl={selectedPodcast.imageUrl}
          podcastTitle={selectedPodcast.title}
          podcastDescription={selectedPodcast.description}
          podcastEpisodeQuantity={selectedPodcast.episodesQuantity}
          podcastWebsite={selectedPodcast.website}
        />
      </div>
      <div className={episodesBox}>
        <EpisodeList episodes={episodes} selectedEpisodeIndex={3} />
      </div>
      <div className={playerBox}>
        <PlayerWithAudio episodeUrl="https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/c44db111-b60d-436e-ab63-38c7c3402406/episodes/bb31ac83-76b3-454f-9306-6216c88fd2eb/audio/23fa3587-eeac-4a1c-84a4-7e42fa147355/default_tc.mp3?aid=rss_feed&feed=dLRotFGk" />
      </div>
    </>
  );
}
