import { formatTimeFromSeconds } from "../../resources/helpers/dateTime";
import { box, overlay, progressBar, text } from "./TimeOverlay.css";

type TimeOverlayProps = {
  isBeingSwiped: boolean;
  timeOnSwipe: number;
  duration: number;
};

export default function TimeOverlay({
  isBeingSwiped,
  timeOnSwipe,
  duration,
}: TimeOverlayProps) {
  return (
    <div
      className={overlay}
      style={{ display: isBeingSwiped ? "flex" : "none" }}
    >
      <div className={box}>
        <div className={text}>
          {formatTimeFromSeconds(timeOnSwipe)} /{" "}
          {formatTimeFromSeconds(duration)}
        </div>
        <div
          className={progressBar}
          style={{
            transform: `translateX(${
              (Math.min(timeOnSwipe, duration) / duration) * 100 - 100
            }%)`,
          }}
        ></div>
      </div>
    </div>
  );
}
