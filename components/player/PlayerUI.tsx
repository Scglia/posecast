/* eslint-disable @next/next/no-img-element */
import { SwipeCallback, useSwipeable } from "react-swipeable";
import {
  box,
  hiddenBox,
  episodeImage,
  contentBox,
  title,
  times,
  buttons,
  bottomLine,
  loadingStyle,
  loadingBox,
} from "./PlayerUI.css";
import Button from "../generic/Button";
import PlayIcon from "../../resources/icons/play.svg";
import PauseIcon from "../../resources/icons/pause.svg";
import LoadingIcon from "../../resources/icons/loading.svg";

type PlayerUIProps = {
  episodeImageUrl: string;
  episodeTitle: string;
  currentTime: string;
  episodeDuration: string;
  isPlaying: boolean;
  play: Function;
  pause: Function;
  isLoading: boolean;
  onSwipeStart: SwipeCallback;
  onSwiping: SwipeCallback;
  onSwiped: SwipeCallback;
};

const PlayerUI = ({
  episodeImageUrl,
  episodeTitle,
  currentTime,
  episodeDuration,
  isPlaying,
  play,
  pause,
  isLoading,
  onSwipeStart,
  onSwiping,
  onSwiped,
}: PlayerUIProps) => {
  const handlers = useSwipeable({
    onSwiping: onSwiping,
    onSwiped: onSwiped,
    onSwipeStart: onSwipeStart,
    trackMouse: true,
  });

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <div {...handlers} className={episodeTitle ? box : hiddenBox}>
      <div className={episodeImage}>
        <div
          className={loadingBox}
          style={{ display: isLoading ? "flex" : "none" }}
        >
          <LoadingIcon className={loadingStyle} />
        </div>
        <img
          src={episodeImageUrl}
          height="72"
          width="72"
          alt={`Current episode illustration`}
        />
      </div>
      <div className={contentBox}>
        <div className={title}>{episodeTitle}</div>
        <div className={bottomLine}>
          <div className={times}>
            {currentTime} / {episodeDuration}
          </div>
          <div className={buttons}>
            <Button
              icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
              onClick={() => {
                if (isPlaying) {
                  pause();
                } else {
                  play();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerUI;
