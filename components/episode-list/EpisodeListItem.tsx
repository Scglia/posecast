import { box, metadata } from "./EpisodeListItem.css";
import { semiBold } from "../../styles/fonts.css";
import ClockIcon from "../../resources/icons/clock.svg";

const EpisodeListItem = ({
  episodeTitle,
  episodeDuration,
  episdeReleaseDate,
  isSelected,
}: {
  episodeTitle: string;
  episodeDuration: string;
  episdeReleaseDate: string;
  isSelected: boolean;
}) => {
  return (
    <div className={`${box} ${isSelected ? "selected" : ""}`}>
      <div className={semiBold}>{episodeTitle}</div>
      <div className={metadata}>
        <ClockIcon />
        {episodeDuration}
        <span>·</span>
        <span>{episdeReleaseDate}</span>
      </div>
    </div>
  );
};

export default EpisodeListItem;
