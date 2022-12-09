import "../styles/global.css";
import { playerBox } from "../styles/global.css";
import { podcastListBox } from "../styles/podcasts.css";
import PodcastList from "../components/podcast-list/PodcastList";
import Player from "../components/player/Player";
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
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title:
        "Another Podcast With A Really Long Name By Sam Harris and Calvin Hobbes",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "2",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Another Podcast With A Really Long Name",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "3",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Another Podcast With A Really Long Name By Sam Harris",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "4",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Another Podcast",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "5",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Another Podcast With A Name",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "6",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Another Podcast With A Really Long Name By Sam",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "7",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Another Podcast With A Really Long Name",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "8",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Another Podcast",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "9",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Another Podcast By Sam Harris",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "10",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title:
        "Another Podcast With A Really Long Name By Sam Harris and Calvin Hobbes",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "11",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Another Podcast",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "12",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Another Podcast By Sam Harris and Calvin Hobbes",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "13",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Another Podcast By Calvin Hobbes",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "14",
    },
    {
      imageUrl:
        "https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed",
      title: "Another Podcast With A Really Long Name",
      description:
        "A weekly conversation about design process and culture. Hosted by Marshall Bock and Brian Lovin.",
      episodesQuantity: 445,
      website: "https://designdetails.fm",
      id: "15",
    },
  ];

  return (
    <>
      <div className={podcastListBox}>
        <PodcastList podcasts={podcasts} />
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
