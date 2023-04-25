/* eslint-disable @next/next/no-img-element */
import { SwipeCallback, useSwipeable } from "react-swipeable";
import {
  motion,
  useAnimation,
  PanInfo,
  useTransform,
  useMotionValue,
} from "framer-motion";
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
  controls,
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
  children?: React.ReactNode;
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
  children,
}: PlayerUIProps) => {
  const handlers = useSwipeable({
    onSwiping: onSwiping,
    onSwiped: onSwiped,
    onSwipeStart: onSwipeStart,
    trackMouse: true,
  });

  const animationControls = useAnimation();
  const panY = useMotionValue(0);
  const playerHeight = useTransform(panY, [0, -300], [92, 300]);

  const handlePan = (event: any, info: PanInfo) => {
    console.log(info);
    panY.set(info.offset.y);
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    console.log("end", info);
  };

  return (
    // READD {...handlers}
    // eslint-disable-next-line @next/next/no-img-element
    <motion.div
      animate={animationControls}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      className={episodeTitle ? box : hiddenBox}
      style={{ height: playerHeight }}
    >
      <div className={controls}>
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
      {children}
    </motion.div>
  );
};

export default PlayerUI;
