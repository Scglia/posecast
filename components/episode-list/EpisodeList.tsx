import { box } from "./EpisodeList.css";
import { regular } from "../../styles/fonts.css";
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

  if (isLoading) return <p className={regular}>Loading...</p>;
  if (!data) return <p className={regular}>No data</p>;
  if (error) return <p className={regular}>{error}</p>;

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
