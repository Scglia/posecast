import { box } from "./EpisodeList.css";
import EpisodeListItem from "./EpisodeListItem";

const EpisodeList = ({
  episodes,
  selectedEpisodeId,
}: {
  episodes: any;
  selectedEpisodeId: string;
}) => {
  return (
    <div className={box}>
      {episodes.map((item: any) => {
        return (
          <EpisodeListItem
            key={item.uuid}
            episodeTitle={item.title}
            episodeReleaseDate={item.releaseDate}
            episodeDuration={item.duration}
            isSelected={item.uuid === selectedEpisodeId}
          />
        );
      })}
    </div>
  );
};

export default EpisodeList;
