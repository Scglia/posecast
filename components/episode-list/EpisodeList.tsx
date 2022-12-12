import { box } from "./EpisodeList.css";
import EpisodeListItem from "./EpisodeListItem";
import useFetchRSS from "../../hooks/useFetchRSS";

const EpisodeList = ({
  rssFeed,
  selectedEpisodeIndex,
}: {
  rssFeed: any;
  selectedEpisodeIndex: number;
}) => {
  const { data, error, isLoading } = useFetchRSS(rssFeed);
  const episodes = data?.items;

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className={box}>
      {episodes.map((item: any, index: number) => {
        return (
          <EpisodeListItem
            key={item.guid}
            episodeTitle={item.title}
            episodeReleaseDate={item.pubDate}
            episodeDuration={item.itunes.duration}
            isSelected={index === selectedEpisodeIndex}
          />
        );
      })}
    </div>
  );
};

export default EpisodeList;
