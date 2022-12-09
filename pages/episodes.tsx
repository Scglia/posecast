import "../styles/global.css";
import { playerBox } from "../styles/global.css";
import { podcastDetailsBox, episodesBox } from "../styles/episodes.css";
import Player from "../components/player/Player";
import EpisodeList from "../components/episode-list/EpisodeList";
import PodcastDetails from "../components/podcast-details/PodcastDetails";

export default function Home() {
  const podcasts = [
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Design Details",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "1",
    },
  ];

  const episodes = [
    {
      title: "#144 A short title to being with",
      releaseDate: "Dec 8th",
      duration: "43min",
      uuid: "1",
    },
    {
      title:
        "#143 A longer title for sure this one is super long it's like it never ends",
      releaseDate: "Dec 4th",
      duration: "32min",
      uuid: "2",
    },
    {
      title: "#142 A medium one here, it's manageable",
      releaseDate: "Dec 1st",
      duration: "49min",
      uuid: "3",
    },
    {
      title: "#140 Last one, let's make it count",
      releaseDate: "Nov 28th",
      duration: "39min",
      uuid: "4",
    },
    {
      title: "#140 Last one, let's make it count",
      releaseDate: "Nov 28th",
      duration: "39min",
      uuid: "5",
    },
    {
      title: "#140 Last one, let's make it count",
      releaseDate: "Nov 28th",
      duration: "39min",
      uuid: "6",
    },
    {
      title: "#140 Last one, let's make it count",
      releaseDate: "Nov 28th",
      duration: "39min",
      uuid: "7",
    },
    {
      title: "#140 Last one, let's make it count",
      releaseDate: "Nov 28th",
      duration: "39min",
      uuid: "8",
    },
    {
      title: "#140 Last one, let's make it count",
      releaseDate: "Nov 28th",
      duration: "39min",
      uuid: "9",
    },
    {
      title: "#140 Last one, let's make it count",
      releaseDate: "Nov 28th",
      duration: "39min",
      uuid: "10",
    },
  ];

  return (
    <>
      <div className={podcastDetailsBox}>
        <PodcastDetails
          podcastImgUrl={podcasts[0].imageUrl}
          podcastTitle={podcasts[0].title}
          podcastDescription={podcasts[0].description}
          podcastEpisodeQuantity={podcasts[0].episodesQuantity}
          podcastWebsite={podcasts[0].website}
        />
      </div>
      <div className={episodesBox}>
        <EpisodeList episodes={episodes} selectedEpisodeId="3" />
      </div>
      <div className={playerBox}>
        <Player
          episodeImageUrl="https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed"
          episodeTitle="444: Episode Title Great"
          currentTime="4:20"
          episodeDuration="6:09"
          isPlaying={true}
        />
      </div>
    </>
  );
}
