/* eslint-disable @next/next/no-img-element */
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
  queueCount,
  overflowBox,
} from "./PlayerUI.css";
import PlayIcon from "../../resources/icons/play_small.svg";
import PauseIcon from "../../resources/icons/pause_small.svg";
import LoadingIcon from "../../resources/icons/loading.svg";
import QueueIcon from "../../resources/icons/queue.svg";
import { useCallback, useEffect, useRef, useState } from "react";

type PlayerUIProps = {
  episodeImageUrl: string;
  episodeTitle: string;
  currentTime: string;
  episodeDuration: string;
  isPlaying: boolean;
  onTap: Function;
  isLoading: boolean;
  onSwipeStart: Function;
  onSwiping: Function;
  onSwipeEnd: Function;
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
  isLoading,
  onTap,
  onSwipeStart,
  onSwiping,
  onSwipeEnd,
  children,
}: PlayerUIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [panAxis, setPanAxis] = useState<null | "x" | "y">(null);
  const [openPlayerHeight, setOpenPlayerHeight] = useState(0);
  const [childrenHeight, setChildrenHeight] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const closedPlayerHeight = openPlayerHeight - childrenHeight;
  const playerRef = useRef(null);
  const childrenRef = useRef(null);

  const animationControls = useAnimation();
  const childAnimationControls = useAnimation();
  const panY = useMotionValue(0);
  const playerOffset = useTransform(panY, [0, 1], [childrenHeight, 0]);
  const childOpacity = useTransform(panY, [0.5, 1], [0, 1]);

  const queueCountOpacity = useTransform(panY, [0.5, 1], [1, 0]);

  const childOffset = useTransform(panY, [0.5, 1], [32, 0]);

  useEffect(() => {
    setOpenPlayerHeight(getComponentSize(playerRef.current).height);
  }, [episodeTitle]);

  useEffect(() => {
    setChildrenHeight(getComponentSize(childrenRef.current).height);
  }, [children]);

  const handleTap = useCallback(() => {
    if (!isPanning) {
      onTap();
    }

    setIsPanning(false);
  }, [onTap, isPanning]);

  const handlePanStart = (event: any, info: PanInfo) => {
    setIsPanning(true);
    const panAxis =
      Math.abs(info.offset.x) > Math.abs(info.offset.y) ? "x" : "y";
    setPanAxis(panAxis);

    if (panAxis === "x") {
      onSwipeStart();
    }
  };

  const handlePanY = (event: any, info: PanInfo) => {
    if (isOpen === false) {
      const closedOffset = -info.offset.y / openPlayerHeight;
      panY.set(closedOffset);
    } else {
      const openOffset = 1 - info.offset.y / openPlayerHeight;
      panY.set(openOffset);
    }
  };

  const PAN_THRESHOLD = 0.2;
  const handlePanEndY = (event: any, info: PanInfo) => {
    if (isOpen === false) {
      if (info.offset.y < -PAN_THRESHOLD) {
        setIsOpen(true);
        animate(panY, 1);
      } else {
        animate(panY, 0);
      }
    } else {
      if (info.offset.y > PAN_THRESHOLD) {
        animate(panY, 0).then(() => {
          setIsOpen(false);
        });
      } else {
        animate(panY, 1);
      }
    }
  };

  const handlePanX = (event: any, info: PanInfo) => {
    onSwiping(info.offset.x);
  };

  const handlePanEndX = (event: any, info: PanInfo) => {
    onSwipeEnd(info.offset.x);
  };

  const handlePan = (event: any, info: PanInfo) => {
    if (panAxis === "y") {
      handlePanY(event, info);
    } else if (panAxis === "x") {
      handlePanX(event, info);
    }
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    if (panAxis === "y") {
      handlePanEndY(event, info);
    } else if (panAxis === "x") {
      handlePanEndX(event, info);
    }

    setIsPanning(false);
    setPanAxis(null);
  };

  const overflowBoxHeight =
    isOpen || isPanning ? openPlayerHeight : closedPlayerHeight;

  const showLoader = isLoading ? "flex" : "none";

  return (
    // READD {...handlers}
    // eslint-disable-next-line @next/next/no-img-element
    <div className={overflowBox} style={{ height: overflowBoxHeight }}>
      <motion.div
        ref={playerRef}
        animate={animationControls}
        className={episodeTitle ? box : hiddenBox}
        style={{ y: playerOffset }}
      >
        <motion.div
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          className={controls}
          onTap={handleTap}
        >
          <div className={episodeImage}>
            <div className={loadingBox} style={{ display: showLoader }}>
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
              <motion.div
                className={queueCount}
                style={{ opacity: queueCountOpacity }}
              >
                <QueueIcon />
                <span>2</span>
              </motion.div>
              <div className={bottomText}>
                {isPlaying ? <PlayIcon /> : <PauseIcon />}
                <span>
                  <span>
                    {currentTime} / {episodeDuration}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          animate={childAnimationControls}
          ref={childrenRef}
          style={{
            opacity: childOpacity,
            y: childOffset,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlayerUI;
