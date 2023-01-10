import { useRef } from "react";
import PlayerUI from "./PlayerUI";
import useAudio from "../../hooks/useAudio";
import { formatTimeFromSeconds } from "../../resources/helpers/dateTime";
import usePlayerStore from "../../stores/playerStore";

const PlayerWithAudio = () => {
  const imageUrl = usePlayerStore((state: any) => state.imageUrl);
  const title = usePlayerStore((state: any) => state.title);
  const episodeUrl = usePlayerStore((state: any) => state.episodeUrl);

  const audioRef = useRef() as React.LegacyRef<HTMLAudioElement>;

  const { currentTime, duration, isPlaying, setIsPlaying, setClickedTime } =
    useAudio(audioRef, episodeUrl);

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
