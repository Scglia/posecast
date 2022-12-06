import "../styles/global.css";
import PodcastList from "../components/podcast-list/PodcastList";
import Player from "../components/player/Player";

export default function Home() {
  const podcasts = [
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Design Details",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title:
        "Another Podcast With A Really Long Name By Sam Harris and Calvin Hobbes",
    },
  ];

  return (
    <div style={{ margin: "16px" }}>
      <PodcastList podcasts={podcasts} />
      <Player
        episodeImageUrl="https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed"
        episodeTitle="444: Episode Title Great"
        currentTime="4:20"
        episodeDuration="6:09"
        isPlaying={true}
      />
    </div>
  );
}
