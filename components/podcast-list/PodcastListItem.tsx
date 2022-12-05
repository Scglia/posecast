import { box, image } from "./PodcastListItem.css";
import { semiBold } from "../../styles/fonts.css";

const PodcastListItem = ({
  podcastTitle,
  imageUrl,
}: {
  podcastTitle: string;
  imageUrl: string;
}) => {
  return (
    <div className={box}>
      <img
        className={image}
        src={imageUrl}
        alt={`Logo of ${podcastTitle}`}
        width="48"
        height="48"
      />
      <span className={semiBold}>{podcastTitle}</span>
    </div>
  );
};

export default PodcastListItem;
