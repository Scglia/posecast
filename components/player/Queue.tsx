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
      <div className={headline}>next</div>
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
            <div className={semiBold}>
              456: Should Designers Name Their Layers?
            </div>
            <div className={podcastName}>Design Details</div>
          </div>
          <div className={reorder}>
            <ReorderIcon />
          </div>
        </div>
        <div className={queueItem}>
          <div className={episodeName}>
            <div className={semiBold}>
              457: Do Designers Need to Learn to Code?
            </div>
            <div className={podcastName}>Design Details</div>
          </div>
          <div className={reorder}>
            <ReorderIcon />
          </div>
        </div>
        <div className={queueItem}>
          <div className={episodeName}>
            <div className={semiBold}>458: How to Get a Job as a Designer</div>
            <div className={podcastName}>Design Details</div>
          </div>
          <div className={reorder}>
            <ReorderIcon />
          </div>
        </div>
        <div className={queueItem}>
          <div className={episodeName}>
            <div className={semiBold}>
              459: Managing Designers as a Designer
            </div>
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
