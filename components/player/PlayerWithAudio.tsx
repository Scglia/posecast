import { useEffect, useRef, useState } from "react";
import PlayerUI from "./PlayerUI";
import useAudio from "../../hooks/useAudio";
import { formatTimeFromSeconds } from "../../resources/helpers/dateTime";
import usePlayerStore from "../../stores/playerStore";
import { semiBold } from "../../styles/fonts.css";
import clamp from "../../resources/helpers/clamp";
import useWindowSize from "../../hooks/useWindowSize";

const multiplierConversionTable = { Left: -1, Right: 1 };

const PlayerWithAudio = () => {
  const imageUrl = usePlayerStore((state: any) => state.imageUrl);
  const title = usePlayerStore((state: any) => state.title);
  const episodeUrl = usePlayerStore((state: any) => state.episodeUrl);
  const savedCurrentTime = usePlayerStore((state: any) => state.currentTime);
  const setSavedCurrentTime = usePlayerStore(
    (state: any) => state.setCurrentTime
  );

  const audioRef = useRef() as React.LegacyRef<HTMLAudioElement>;

  const [isBeingSwiped, setIsBeingSwiped] = useState(false);
  const [swipeRatio, setSwipeRatio] = useState(0);
  const [multiplier, setMultiplier] = useState<any>(1);
  const { width } = useWindowSize();

  const { currentTime, duration, isPlaying, setIsPlaying, setClickedTime } =
    useAudio(audioRef, episodeUrl, setSavedCurrentTime);

  // Initialize currentTime if one is saved in the store
  useEffect(() => {
    if (savedCurrentTime) {
      setClickedTime(savedCurrentTime);
    }
  }, []);

  // useCallback
  const onSwipeStart = () => {
    setIsBeingSwiped(true);
    setIsPlaying(false);
  };

  const onSwiping = (eventData: any) => {
    if (eventData.dir == "Up" || eventData.dir == "Down") return;
    const ratio = Math.abs(eventData.deltaX / ((width ?? 300) * 0.8));
    setSwipeRatio(ratio);
    setMultiplier(
      multiplierConversionTable[
        eventData.dir as keyof typeof multiplierConversionTable
      ]
    );
  };

  const onSwiped = () => {
    setIsBeingSwiped(false);
    setClickedTime(
      clamp(
        Math.trunc(currentTime + swipeRatio * multiplier * duration),
        1,
        duration
      )
    );
    setIsPlaying(true);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.8)",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          display: isBeingSwiped ? "flex" : "none",
          overscrollBehavior: "contain",
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(33, 33, 33)",
            padding: "24px 32px",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            className={semiBold}
            style={{
              fontSize: 24,
              lineHeight: "120%",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatTimeFromSeconds(
              clamp(
                currentTime + swipeRatio * multiplier * duration,
                1,
                duration
              )
            )}{" "}
            / {formatTimeFromSeconds(duration)}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgb(51, 51, 51)",
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
      <PlayerUI
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onSwiping={onSwiping}
        onSwiped={onSwiped}
        onSwipeStart={onSwipeStart}
        episodeImageUrl={imageUrl}
        episodeTitle={title}
        currentTime={formatTimeFromSeconds(currentTime)}
        episodeDuration={formatTimeFromSeconds(duration)}
      />
      <audio ref={audioRef}>
        <source src={episodeUrl} />
        Your browser does not support the <code>audio</code> element.
      </audio>
    </>
  );
};

export default PlayerWithAudio;
