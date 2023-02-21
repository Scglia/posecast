import { useEffect, useRef, useState } from "react";
import PlayerUI from "./PlayerUI";
import useAudio from "../../hooks/useAudio";
import { formatTimeFromSeconds } from "../../resources/helpers/dateTime";
import usePlayerStore from "../../stores/playerStore";
import { semiBold } from "../../styles/fonts.css";
import clamp from "../../resources/helpers/clamp";
import useWindowSize from "../../hooks/useWindowSize";

const steps = [
  {
    swipeDelta: 0.21,
    value: 10,
    text: "10s",
  },
  {
    swipeDelta: 0.35,
    value: 60,
    text: "1min",
  },
  {
    swipeDelta: 0.5,
    value: 300,
    text: "5min",
  },
  {
    swipeDelta: 0.64,
    value: 600,
    text: "10min",
  },
  {
    swipeDelta: 0.78,
    value: 1800,
    text: "30min",
  },
  {
    swipeDelta: 0.92,
    value: 3600,
    text: "1h",
  },
  {
    swipeDelta: 2,
    value: 7200,
    text: "2h",
  },
];

const multiplyStep = (step: any, multiplier: number) => ({
  swipeDelta: step.swipeDelta,
  value: step.value * multiplier,
  text: multiplier === -1 ? `-${step.text}` : `+${step.text}`,
  multiplier,
});

const getStep = (x: number, direction: "Left" | "Right" | "Up" | "Down") => {
  const multiplier = { Left: -1, Right: 1, Up: 1, Down: -1 };
  console.log("direction: ", direction);
  const step =
    steps.find((step) => x < step.swipeDelta) ?? steps[steps.length - 1];

  return multiplyStep(step, multiplier[direction]);
};

const PlayerWithAudio = () => {
  const imageUrl = usePlayerStore((state: any) => state.imageUrl);
  const title = usePlayerStore((state: any) => state.title);
  const episodeUrl = usePlayerStore((state: any) => state.episodeUrl);
  const savedCurrentTime = usePlayerStore((state: any) => state.currentTime);
  const setSavedCurrentTime = usePlayerStore(
    (state: any) => state.setCurrentTime
  );

  const audioRef = useRef() as React.LegacyRef<HTMLAudioElement>;

  const { width } = useWindowSize();
  const [isBeingSwiped, setIsBeingSwiped] = useState(false);
  const [swipeRatio, setSwipeRatio] = useState(0);
  const [step, setStep] = useState({
    swipeDelta: 0,
    value: 0,
    text: "",
    multiplier: 1,
  });

  const { currentTime, duration, isPlaying, setIsPlaying, setClickedTime } =
    useAudio(audioRef, episodeUrl);

  // Initialize currentTime if one is saved in the store
  useEffect(() => {
    if (savedCurrentTime) {
      setClickedTime(savedCurrentTime);
    }
  }, []);

  // Update the saved currentTime in the store
  useEffect(() => {
    setSavedCurrentTime(currentTime);
  }, [currentTime]);

  // useCallback
  const onSwipeStart = () => {
    setIsBeingSwiped(true);
  };

  const onSwiping = (eventData: any) => {
    if (eventData.dir === "Up" || eventData.dir === "Down") return;
    const ratio = Math.abs(eventData.deltaX / ((width ?? 300) * 0.7));
    setSwipeRatio(ratio);
    setStep(getStep(ratio, eventData.dir));
    console.log(getStep(ratio, eventData.dir));
  };

  const onSwiped = () => {
    setIsBeingSwiped(false);
    setClickedTime(clamp(currentTime + step.value, 1, duration));
  };
  console.log(clamp(currentTime + step.value, 0, duration));
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
              fontSize: 48,
              lineHeight: "120%",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {step.text}
          </div>
          <div
            className={semiBold}
            style={{
              fontSize: 24,
              lineHeight: "120%",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatTimeFromSeconds(
              clamp(currentTime + step.value, 0, duration)
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
                (step.multiplier * Math.min(swipeRatio, 1) - step.multiplier) *
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
