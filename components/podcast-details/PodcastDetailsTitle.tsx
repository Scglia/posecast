import { box, cover } from "./PodcastDetailsTitle.css";
import { title } from "../../styles/fonts.css";

const PodcastDetailsTitle = ({
  podcastImgUrl,
  podcastTitle,
}: {
  podcastImgUrl: string;
  podcastTitle: string;
}) => {
  return (
    <div className={box}>
      <img
        className={cover}
        src={podcastImgUrl}
        alt="Podcast cover photo"
        height="64"
        width="64"
      />
      <span className={title}>{podcastTitle}</span>
    </div>
  );
};

export default PodcastDetailsTitle;
