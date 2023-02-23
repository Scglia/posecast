import { useState, useEffect } from "react";

function useAudio(audioRef: any, url: any, setSavedCurrentTime: any) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState<Number | null>(null);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audioRef.current === undefined) return;

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => {
      const time = Math.trunc(audio.currentTime);
      if (time !== currentTime) {
        setCurrentTime(time);
        setSavedCurrentTime(time);
      }
    };

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    // Loading state
    audio.addEventListener("loadeddata", () => setIsLoading(false));
    audio.addEventListener("waiting", () => setIsLoading(true));
    audio.addEventListener("playing", () => setIsLoading(false));
    audio.addEventListener("seeking", () => setIsLoading(true));
    audio.addEventListener("seeked", () => setIsLoading(false));

    // TODO - handle errors

    // React state listeners: update DOM on React state changes
    isPlaying ? audio.play() : audio.pause();

    // Reload the audio if the URL changes
    if (currentUrl !== url) {
      setIsLoading(true);
      audio.pause();
      audio.load();
      setCurrentUrl(url);
    }

    if (clickedTime && clickedTime !== currentTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [
    audioRef,
    currentTime,
    clickedTime,
    isPlaying,
    url,
    currentUrl,
    setSavedCurrentTime,
  ]);

  return {
    currentTime,
    duration,
    isPlaying,
    setIsPlaying,
    setClickedTime,
    isLoading,
  };
}

export default useAudio;
