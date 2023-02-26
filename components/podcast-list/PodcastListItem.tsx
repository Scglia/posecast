import classNames from "classnames";
import Trash from "../../resources/icons/trash.svg";
import { semiBold } from "../../styles/fonts.css";
import Button from "../generic/Button";
import {
  box,
  image,
  removeButtonBox,
  selectedBox,
} from "./PodcastListItem.css";

/* eslint-disable @next/next/no-img-element */
const PodcastListItem = ({
  podcastTitle,
  podcastImageUrl,
  isSelected,
  removePodcast,
}: {
  podcastTitle: string;
  podcastImageUrl: string;
  isSelected: boolean;
  removePodcast: () => void;
}) => {
  if (isSelected) {
    return (
      <div className={classNames(box, { [selectedBox]: isSelected })}>
        <div className={removeButtonBox}>
          <Button onClick={removePodcast} variant="error" icon={<Trash />} />
        </div>
        <span className={semiBold}>{podcastTitle}</span>
      </div>
    );
  }

  return (
    <div className={box}>
      <img
        className={image}
        src={podcastImageUrl}
        alt={`Logo of ${podcastTitle}`}
        width="48"
        height="48"
      />
      <span className={semiBold}>{podcastTitle}</span>
    </div>
  );
};

export default PodcastListItem;
