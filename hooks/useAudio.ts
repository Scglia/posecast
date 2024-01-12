import { throttle } from "lodash";
import { useState, useEffect, useRef } from "react";

interface AudioState {
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  isLoading: boolean;
  error: Error | null;
}

const useAudio = (url: string, initialTime = 0, onTimeUpdate: Function) => {
  const [audioState, setAudioState] = useState<AudioState>({
    duration: 0,
    currentTime: 0,
    isPlaying: false,
    isLoading: true,
    error: null,
  });

  const initialTimeRef = useRef(initialTime);
  // Update the ref whenever initialTime changes
  useEffect(() => {
    initialTimeRef.current = initialTime;
  }, [initialTime]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(url);
    audioRef.current = audio;

    const setAudioData = () => {
      setAudioState((prevState) => ({
        ...prevState,
        duration: audio.duration,
        isLoading: false,
      }));
    };

    const setTime = throttle(() => {
      onTimeUpdate(audio.currentTime);
      setAudioState((prevState) => ({
        ...prevState,
        currentTime: audio.currentTime,
      }));
    }, 1000); // Update once per second

    const setPlay = () => {
      setAudioState((prevState) => ({ ...prevState, isPlaying: true }));
    };

    const setPause = () => {
      setAudioState((prevState) => ({ ...prevState, isPlaying: false }));
    };

    const setIsLoading = (isLoading: boolean) => {
      setAudioState((prevState) => ({ ...prevState, isLoading }));
    };

    const setIsLoadingTrue = () => setIsLoading(true);
    const setIsLoadingFalse = () => setIsLoading(false);

    const handleError = (e: Event) => {
      setAudioState((prevState) => ({
        ...prevState,
        error: e as unknown as Error,
        isLoading: false,
      }));
    };

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setTime);
    audio.addEventListener("play", setPlay);
    audio.addEventListener("pause", setPause);
    audio.addEventListener("error", handleError);
    audio.addEventListener("waiting", setIsLoadingTrue);
    audio.addEventListener("seeking", setIsLoadingTrue);
    audio.addEventListener("seeked", setIsLoadingFalse);
    audio.addEventListener("canplaythrough", setIsLoadingFalse);
    audio.addEventListener("playing", setIsLoadingFalse);

    // Reset currentTime when URL changes
    const currentInitialTime = initialTimeRef.current;
    setAudioState((prevState) => ({
      ...prevState,
      currentTime: currentInitialTime,
    }));
    audioRef.current.currentTime = currentInitialTime;

    // Cleanup function
    return () => {
      audio.pause();
      setPause();
      audio.currentTime = 0;
      setTime.cancel();

      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setTime);
      audio.removeEventListener("play", setPlay);
      audio.removeEventListener("pause", setPause);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("waiting", setIsLoadingTrue);
      audio.removeEventListener("seeking", setIsLoadingTrue);
      audio.removeEventListener("seeked", setIsLoadingFalse);
      audio.removeEventListener("canplaythrough", setIsLoadingFalse);
      audio.removeEventListener("playing", setIsLoadingFalse);
    };
  }, [url, onTimeUpdate]);

  const play = () => audioRef.current?.play();
  const pause = () => audioRef.current?.pause();
  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return {
    ...audioState,
    play,
    pause,
    seek,
  };
};

export default useAudio;
