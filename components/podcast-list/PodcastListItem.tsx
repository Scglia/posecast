import classNames from "classnames";
import {
  box,
  selectedBox,
  image,
  removeButtonBox,
} from "./PodcastListItem.css";
import { semiBold } from "../../styles/fonts.css";
import Button from "../generic/Button";
import Trash from "../../resources/icons/trash.svg";
import { useEffect } from "react";

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
          <Button onClick={removePodcast} type="error" icon={<Trash />} />
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
