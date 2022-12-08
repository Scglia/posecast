import { box, metadata } from "./EpisodeListItem.css";
import { semiBold } from "../../styles/fonts.css";
import ClockIcon from "../../resources/icons/clock.svg";

const EpisodeListItem = ({
  episodeTitle,
  episodeDuration,
  episodeReleaseDate,
  isSelected,
}: {
  episodeTitle: string;
  episodeDuration: string;
  episodeReleaseDate: string;
  isSelected: boolean;
}) => {
  return (
    <div className={`${box} ${isSelected ? "selected" : ""}`}>
      <div className={semiBold}>{episodeTitle}</div>
      <div className={metadata}>
        <ClockIcon />
        {episodeDuration}
        <span>·</span>
        <span>{episodeReleaseDate}</span>
      </div>
    </div>
  );
};

export default EpisodeListItem;
