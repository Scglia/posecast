import ReorderIcon from "../../resources/icons/reorder.svg";
import { semiBold } from "../../styles/fonts.css";
import {
  episodeName,
  headline,
  podcastName,
  queueBox,
  queueItem,
  reorder,
} from "./Queue.css";

const Queue = () => {
  return (
    <>
      <div className={headline}>Next</div>
      <div className={queueBox}>
        <div className={queueItem}>
          <div className={episodeName}>
            <div className={semiBold}>441: WWDC 2022</div>
            <div className={podcastName}>Design Details</div>
          </div>
          <div className={reorder}>
            <ReorderIcon />
          </div>
        </div>
        <div className={queueItem}>
          <div className={episodeName}>
            <div className={semiBold}>441: WWDC 2022</div>
            <div className={podcastName}>Design Details</div>
          </div>
          <div className={reorder}>
            <ReorderIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Queue;
