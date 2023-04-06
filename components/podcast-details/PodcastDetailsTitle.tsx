import { box, cover } from "./PodcastDetailsTitle.css";
import { title } from "../../styles/fonts.css";

type PodcastDetailsTitleProps = {
  podcastImgUrl: string;
  podcastTitle: string;
};

/* eslint-disable @next/next/no-img-element */
const PodcastDetailsTitle = ({
  podcastImgUrl,
  podcastTitle,
}: PodcastDetailsTitleProps) => {
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
