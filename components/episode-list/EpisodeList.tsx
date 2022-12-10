import { box } from "./EpisodeList.css";
import EpisodeListItem from "./EpisodeListItem";

const EpisodeList = ({
  episodes,
  selectedEpisodeIndex,
}: {
  episodes: any;
  selectedEpisodeIndex: number;
}) => {
  return (
    <div className={box}>
      {episodes.map((item: any, index: number) => {
        return (
          <EpisodeListItem
            key={item.guid}
            episodeTitle={item.title}
            episodeReleaseDate={item.releaseDate}
            episodeDuration={item.itunes.duration}
            isSelected={index === selectedEpisodeIndex}
          />
        );
      })}
    </div>
  );
};

export default EpisodeList;
