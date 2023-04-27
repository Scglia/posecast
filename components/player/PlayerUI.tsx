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
  queueBox,
  queueBoxRelative,
} from "./PlayerUI.css";
import Button from "../generic/Button";
import PlayIcon from "../../resources/icons/play.svg";
import PauseIcon from "../../resources/icons/pause.svg";
import LoadingIcon from "../../resources/icons/loading.svg";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  const openPlayerHeight = initialPlayerHeight + childrenHeight + 48;
  const playerRef = useRef(null);
  const childrenRef = useRef(null);
  useEffect(() => {
    setInitialPlayerHeight(getComponentSize(playerRef.current).height);
  }, []);

  useLayoutEffect(() => {
    setChildrenHeight(getComponentSize(childrenRef.current).height);
  }, [children]);

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

  console.log({ initialPlayerHeight, childrenHeight, openPlayerHeight });

  const handlePan = (event: any, info: PanInfo) => {
    console.log({ initialPlayerHeight, childrenHeight });
    if (isOpen === false) {
      panY.set(info.offset.y);
    } else {
      panY.set(info.offset.y - openPlayerHeight);
    }
  };

  const PAN_THRESHOLD = 50;
  const CHILD_STATE = {
    initial: {
      opacity: 0,
      y: 32,
    },
    open: {
      opacity: 1,
      y: 0,
    },
  };
  const handlePanEnd = (event: any, info: PanInfo) => {
    console.log("end", info);
    if (isOpen === false) {
      if (info.offset.y < -PAN_THRESHOLD) {
        animationControls.start({ height: openPlayerHeight });
        childAnimationControls.start(CHILD_STATE.open);
        setIsOpen(true);
      } else {
        animationControls.start({ height: initialPlayerHeight });
        childAnimationControls.start(CHILD_STATE.initial);
      }
    } else {
      if (info.offset.y > PAN_THRESHOLD) {
        animationControls.start({ height: initialPlayerHeight });
        childAnimationControls.start(CHILD_STATE.initial);
        setIsOpen(false);
      } else {
        animationControls.start({ height: openPlayerHeight });
        childAnimationControls.start(CHILD_STATE.open);
      }
    }
  };

  return (
    // READD {...handlers}
    // eslint-disable-next-line @next/next/no-img-element
    <motion.div
      ref={playerRef}
      animate={animationControls}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      className={episodeTitle ? box : hiddenBox}
      style={{ height: playerHeight.get() > 24 ? playerHeight : "auto" }}
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
