/* eslint-disable @next/next/no-img-element */
import { SwipeCallback, useSwipeable } from "react-swipeable";
import {
  motion,
  useAnimation,
  PanInfo,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import {
  box,
  hiddenBox,
  episodeImage,
  contentBox,
  title,
  bottomText,
  bottomLine,
  loadingStyle,
  loadingBox,
  controls,
  queueBox,
  queueBoxRelative,
  queueCount,
} from "./PlayerUI.css";
import PlayIcon from "../../resources/icons/play_small.svg";
import PauseIcon from "../../resources/icons/pause_small.svg";
import LoadingIcon from "../../resources/icons/loading.svg";
import QueueIcon from "../../resources/icons/queue.svg";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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

function getComponentSize(componentRef: any) {
  const rect = componentRef.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
}

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

  const [isOpen, setIsOpen] = useState(false);
  const [initialPlayerHeight, setInitialPlayerHeight] = useState(0);
  const [childrenHeight, setChildrenHeight] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const openPlayerHeight = initialPlayerHeight + childrenHeight + 12;
  const playerRef = useRef(null);
  const childrenRef = useRef(null);

  const animationControls = useAnimation();
  const childAnimationControls = useAnimation();
  const panY = useMotionValue(0);
  const playerHeight = useTransform(
    panY,
    [0, -openPlayerHeight],
    [initialPlayerHeight, openPlayerHeight]
  );
  const childOpacity = useTransform(
    panY,
    [-openPlayerHeight * 0.5, -openPlayerHeight],
    [0, 1]
  );
  const childOffset = useTransform(
    panY,
    [-openPlayerHeight * 0.5, -openPlayerHeight],
    [32, 0]
  );

  useEffect(() => {
    setInitialPlayerHeight(getComponentSize(playerRef.current).height);
    getComponentSize(playerRef.current).height;
  }, []);

  useLayoutEffect(() => {
    setChildrenHeight(getComponentSize(childrenRef.current).height);
  }, [children]);

  const handleTap = useCallback(() => {
    if (!isPanning) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    }

    setIsPanning(false);
  }, [isPlaying, play, pause, isPanning]);

  const handlePanStart = (event: any, info: PanInfo) => {
    setIsPanning(true);
  };

  const handlePan = (event: any, info: PanInfo) => {
    if (isOpen === false) {
      panY.set(info.offset.y);
    } else {
      panY.set(info.offset.y - openPlayerHeight);
    }
  };

  const PAN_THRESHOLD = 50;
  const handlePanEnd = (event: any, info: PanInfo) => {
    console.log("end", info);
    if (isOpen === false) {
      if (info.offset.y < -PAN_THRESHOLD) {
        animate(panY, -openPlayerHeight);
        setIsOpen(true);
      } else {
        animate(panY, 0);
      }
    } else {
      if (info.offset.y > PAN_THRESHOLD) {
        animate(panY, 0);
        setIsOpen(false);
      } else {
        animate(panY, -openPlayerHeight);
      }
    }
  };

  return (
    // READD {...handlers}
    // eslint-disable-next-line @next/next/no-img-element
    <motion.div
      ref={playerRef}
      animate={animationControls}
      onPanStart={handlePanStart}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      className={episodeTitle ? box : hiddenBox}
      style={{ height: playerHeight.get() > 24 ? playerHeight : "auto" }}
    >
      <motion.div className={controls} onTap={handleTap}>
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
            <div className={queueCount}>
              <QueueIcon />
              <span>2</span>
            </div>
            <div className={bottomText}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
              <span>
                <span>
                  {currentTime} / {episodeDuration}
                </span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      <div className={queueBoxRelative}>
        <motion.div
          animate={childAnimationControls}
          className={queueBox}
          ref={childrenRef}
          style={{
            opacity: childOpacity,
            y: childOffset,
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlayerUI;
