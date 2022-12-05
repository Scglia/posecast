import "../styles/global.css";
import PodcastListItem from "../components/podcast-list/PodcastListItem";

export default function Home() {
  return (
    <div style={{ margin: "16px" }}>
      <PodcastListItem
        imageUrl="https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed"
        podcastTitle="Design Details"
      />
    </div>
  );
}
