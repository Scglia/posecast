import { useCallback, useRef, useState } from "react";
import PlayerUI from "./PlayerUI";
import useAudio from "../../hooks/useAudio";
import { formatTimeFromSeconds } from "../../resources/helpers/dateTime";
import usePlayerStore from "../../stores/playerStore";
import clamp from "../../resources/helpers/clamp";
import useWindowSize from "../../hooks/useWindowSize";
import TimeOverlay from "./TimeOverlay";

const multiplierConversionTable = { Left: -1, Right: 1 };

const getRatio = (deltaX: number, width?: number) => {
  const viewportWidth = width ? width - 48 : 300; // 48 is the width of the player's padding

  // The ratio is squared to make the swipe more precise at the beginning
  return Math.min(Math.abs(Math.pow(deltaX / viewportWidth, 2)), 1);
};

const selectors = {
  imageUrl: (state: any) => state.imageUrl,
  title: (state: any) => state.title,
  episodeUrl: (state: any) => state.episodeUrl,
  currentTime: (state: any) => state.currentTime,
  setCurrentTime: (state: any) => state.setCurrentTime,
};

const PlayerWithAudio = () => {
  const imageUrl = usePlayerStore(selectors.imageUrl);
  const title = usePlayerStore(selectors.title);
  const episodeUrl = usePlayerStore(selectors.episodeUrl);
  const savedCurrentTime = usePlayerStore(selectors.currentTime);
  const setSavedCurrentTime = usePlayerStore(selectors.setCurrentTime);

  const [isBeingSwiped, setIsBeingSwiped] = useState(false);
  const [swipeRatio, setSwipeRatio] = useState(0);
  const [multiplier, setMultiplier] = useState<any>(1);
  const { width } = useWindowSize();
  const [initialTime] = useState(savedCurrentTime);

  const onTimeUpdate = useCallback(
    ({ currentTime }: { currentTime: number }) => {
      setSavedCurrentTime(currentTime);
    },
    [setSavedCurrentTime]
  );

  const onEnded = useCallback(() => {
    setSavedCurrentTime(0);
  }, [setSavedCurrentTime]);

  const {
    currentTime,
    duration,
    isPlaying,
    play,
    pause,
    setCurrentTime,
    isLoading,
  } = useAudio(episodeUrl, initialTime, onTimeUpdate, onEnded);

  const onSwipeStart = useCallback(() => {
    setIsBeingSwiped(true);
    pause();
  }, [setIsBeingSwiped, pause]);

  const onSwiping = useCallback(
    (eventData: any) => {
      if (eventData.dir == "Up" || eventData.dir == "Down") return;
      const ratio = getRatio(eventData.deltaX, width);
      setSwipeRatio(ratio);
      setMultiplier(
        multiplierConversionTable[
          eventData.dir as keyof typeof multiplierConversionTable
        ]
      );
    },
    [width, setSwipeRatio, setMultiplier]
  );

  const onSwiped = useCallback(() => {
    setIsBeingSwiped(false);
    setCurrentTime(
      clamp(
        Math.trunc(currentTime + swipeRatio * multiplier * duration),
        1,
        duration
      )
    );

    play();
  }, [
    setCurrentTime,
    currentTime,
    swipeRatio,
    multiplier,
    duration,
    play,
    setIsBeingSwiped,
  ]);

  return (
    <>
      <TimeOverlay
        isBeingSwiped={isBeingSwiped}
        swipeRatio={swipeRatio}
        multiplier={multiplier}
        currentTime={currentTime}
        duration={duration}
      />
      <PlayerUI
        isPlaying={isPlaying}
        play={play}
        pause={pause}
        isLoading={isLoading}
        onSwiping={onSwiping}
        onSwiped={onSwiped}
        onSwipeStart={onSwipeStart}
        episodeImageUrl={imageUrl}
        episodeTitle={title}
        currentTime={formatTimeFromSeconds(currentTime)}
        episodeDuration={formatTimeFromSeconds(duration)}
      />
    </>
  );
};

export default PlayerWithAudio;
