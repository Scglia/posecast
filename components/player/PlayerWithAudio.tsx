import { useRef } from "react";
import PlayerUI from "./PlayerUI";
import useAudio from "../../hooks/useAudio";
import { usePlayerContext } from "../../contexts/PlayerContext";
import { formatTimeFromSeconds } from "../../resources/helpers/dateTime";

const PlayerWithAudio = () => {
  const [playerData] = usePlayerContext();
  const audioRef = useRef() as React.LegacyRef<HTMLAudioElement>;

  const { currentTime, duration, isPlaying, setIsPlaying, setClickedTime } =
    useAudio(audioRef, playerData.episodeUrl);

  const fastForward = () => {
    setClickedTime(currentTime + 30);
  };

  const rewind = () => {
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
        currentTime={formatTimeFromSeconds(currentTime)}
        episodeDuration={formatTimeFromSeconds(duration)}
      />
      <audio ref={audioRef}>
        <source src={playerData.episodeUrl} />
        Your browser does not support the <code>audio</code> element.
      </audio>
    </>
  );
};

export default PlayerWithAudio;
