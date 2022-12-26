import { useRef } from "react";
import PlayerUI from "./PlayerUI";
import useAudio from "../../hooks/useAudio";
import { usePlayerContext } from "../../contexts/PlayerContext";

const PlayerWithAudio = () => {
  const [playerData] = usePlayerContext();
  console.log("render", playerData.episodeUrl);
  const audioRef = useRef() as React.LegacyRef<HTMLAudioElement>;

  const { currentTime, duration, isPlaying, setIsPlaying, setClickedTime } =
    useAudio(audioRef, playerData.episodeUrl);

  const fastForward = () => {
    setClickedTime(currentTime + 30);
  };

  const rewind = () => {
    console.log(currentTime - 10);
    setClickedTime(Math.max(0.1, currentTime - 10)); // Setting starting time at 0 doesn't work (nullish bug in useAudio maybe?)
  };

  return (
    <>
      <PlayerUI
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        fastForward={fastForward}
        rewind={rewind}
        episodeImageUrl={playerData.imageUrl}
        episodeTitle={playerData.title}
        currentTime={currentTime}
        episodeDuration={duration}
      />
      <audio ref={audioRef}>
        <source src={playerData.episodeUrl} />
        Your browser does not support the <code>audio</code> element.
      </audio>
    </>
  );
};

export default PlayerWithAudio;
