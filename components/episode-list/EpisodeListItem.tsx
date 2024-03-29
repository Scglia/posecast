import {
  formatDurationFromTime,
  formattedReleaseDate,
} from "../../resources/helpers/dateTime";
import { box, metadata } from "./EpisodeListItem.css";
import { semiBold } from "../../styles/fonts.css";
import ClockIcon from "../../resources/icons/clock.svg";

type EpisodeListItemProps = {
  episodeTitle: string;
  episodeDuration: string;
  episodeReleaseDate: string;
  isSelected: boolean;
};

const EpisodeListItem = ({
  episodeTitle,
  episodeDuration,
  episodeReleaseDate,
  isSelected,
}: EpisodeListItemProps) => {
  return (
    <div className={`${box} ${isSelected ? "selected" : ""}`}>
      <div className={semiBold}>{episodeTitle}</div>
      <div className={metadata}>
        <ClockIcon />
        {formatDurationFromTime(episodeDuration)}
        <span>·</span>
        <span>{formattedReleaseDate(episodeReleaseDate)}</span>
      </div>
    </div>
  );
};

export default EpisodeListItem;
