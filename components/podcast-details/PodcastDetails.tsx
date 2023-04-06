import { box, metadata, episodeQuantity } from "./PodcastDetails.css";
import Link from "../generic/Link";
import PodcastDetailsTitle from "./PodcastDetailsTitle";
import { regular } from "../../styles/fonts.css";

type PodcastDetailsProps = {
  podcastImgUrl: string;
  podcastTitle: string;
  podcastDescription: string;
  podcastEpisodeQuantity: string;
  podcastWebsite: string;
};

const PodcastDetails = ({
  podcastImgUrl,
  podcastTitle,
  podcastDescription,
  podcastEpisodeQuantity,
  podcastWebsite,
}: PodcastDetailsProps) => {
  return (
    <div className={box}>
      <PodcastDetailsTitle
        podcastImgUrl={podcastImgUrl}
        podcastTitle={podcastTitle}
      />
      <div className={regular}>{podcastDescription}</div>
      <div className={metadata}>
        <span className={episodeQuantity}>
          {podcastEpisodeQuantity ? `${podcastEpisodeQuantity} episodes` : null}
        </span>
        <Link href={podcastWebsite}>{podcastWebsite}</Link>
      </div>
    </div>
  );
};

export default PodcastDetails;
