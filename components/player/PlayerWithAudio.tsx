import { useRef } from "react";
import PlayerUI from "./PlayerUI";
import useAudio from "../../hooks/useAudio";

const PlayerWithAudio = ({ episodeUrl }: { episodeUrl?: string }) => {
  const audioRef = useRef() as React.LegacyRef<HTMLAudioElement>;
  const { currentTime, duration, isPlaying, setIsPlaying, setClickedTime } =
    useAudio(audioRef, episodeUrl);

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
        episodeImageUrl="https://image.simplecastcdn.com/images/56e415f0-1911-44b3-9b1c-99551f7146c3/993ebed2-9e1d-4455-8d97-fa64f173572f/3000x3000/1471485006-artwork.jpg?aid=rss_feed"
        episodeTitle="444: Episode Title Great"
        currentTime={currentTime}
        episodeDuration={duration}
      />
      <audio ref={audioRef}>
        <source src={episodeUrl} />
        Your browser does not support the <code>audio</code> element.
      </audio>
    </>
  );
};

export default PlayerWithAudio;
