import clamp from "../../resources/helpers/clamp";
import { formatTimeFromSeconds } from "../../resources/helpers/dateTime";
import { box, overlay, progressBar, text } from "./TimeOverlay.css";

export default function TimeOverlay({
  isBeingSwiped,
  swipeRatio,
  multiplier,
  currentTime,
  duration,
}: {
  isBeingSwiped: boolean;
  swipeRatio: number;
  multiplier: number;
  currentTime: number;
  duration: number;
}) {
  return (
    <div
      className={overlay}
      style={{ display: isBeingSwiped ? "flex" : "none" }}
    >
      <div className={box}>
        <div className={text}>
          {formatTimeFromSeconds(
            clamp(currentTime + swipeRatio * multiplier * duration, 1, duration)
          )}{" "}
          / {formatTimeFromSeconds(duration)}
        </div>
        <div
          className={progressBar}
          style={{
            transform: `translateX(${
              (Math.min(
                currentTime + swipeRatio * multiplier * duration,
                duration
              ) /
                duration) *
                100 -
              100
            }%)`,
          }}
        ></div>
      </div>
    </div>
  );
}
