import { useEffect, useRef } from "react";
import PlayerUI from "./PlayerUI";
import useAudio from "../../hooks/useAudio";
import { formatTimeFromSeconds } from "../../resources/helpers/dateTime";
import usePlayerStore from "../../stores/playerStore";

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

const multiplyStep = (step: any, multiplier: number) => {
  return {
    swipeDelta: step.swipeDelta,
    value: step.value * multiplier,
    text: multiplier === -1 ? `-${step.text}` : step.text,
  };
};

// Move it outside of the component
const getStep = (x: number, direction: "Left" | "Right") => {
  let multiplier = 1;
  if (direction === "Left") {
    multiplier = -1;
  }

  const step =
    steps.find((step) => x < step.swipeDelta) ?? steps[steps.length - 1];

  return multiplyStep(step, multiplier);
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

  // const fastForward = () => {
  //   setClickedTime(currentTime + 30);
  // };

  // const rewind = () => {
  //   setClickedTime(Math.max(0.1, currentTime - 10)); // Setting starting time at 0 doesn't work (nullish bug in useAudio maybe?)
  // };

  // useCallback
  const onSwiping = (eventData: any) => {
    const ratio = Math.abs(eventData.deltaX / 376);

    console.log(getStep(ratio, eventData.dir));
  };

  const onSwiped = (eventData: any) => {
    const ratio = Math.abs(eventData.deltaX / 376);
    const step = getStep(ratio, eventData.dir).value;
    setClickedTime(currentTime + step);
  };

  return (
    <>
      <PlayerUI
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        fastForward={() => {}}
        rewind={() => {}}
        onSwiping={onSwiping}
        onSwiped={onSwiped}
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
