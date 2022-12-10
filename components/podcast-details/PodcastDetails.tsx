import { box, metadata, episodeQuantity, website } from "./PodcastDetails.css";
import PodcastDetailsTitle from "./PodcastDetailsTitle";
import { regular } from "../../styles/fonts.css";
import { episodeImage } from "../player/PlayerUI.css";

const PodcastDetails = ({
  podcastImgUrl,
  podcastTitle,
  podcastDescription,
  podcastEpisodeQuantity,
  podcastWebsite,
}: {
  podcastImgUrl: string;
  podcastTitle: string;
  podcastDescription: string;
  podcastEpisodeQuantity: number;
  podcastWebsite: string;
}) => {
  return (
    <div className={box}>
      <PodcastDetailsTitle
        podcastImgUrl={podcastImgUrl}
        podcastTitle={podcastTitle}
      />
      <div className={regular}>{podcastDescription}</div>
      <div className={metadata}>
        <span className={episodeQuantity}>
          {podcastEpisodeQuantity} episodes
        </span>
        <a href={podcastWebsite} className={website}>
          {podcastWebsite}
        </a>
      </div>
    </div>
  );
};

export default PodcastDetails;
