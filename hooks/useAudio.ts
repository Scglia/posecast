import { useReducer, useEffect, useRef, useCallback, useMemo } from "react";
import throttle from "lodash/throttle";

const initialState = {
  audio: null,
  duration: 0,
  currentTime: 0,
  isPlaying: false,
  isLoading: true,
  error: null,
};

const audioReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_IS_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

const useAudio = (
  url: string,
  initialTimestamp = 0,
  onTimeUpdateCallback: Function,
  onEndedCallback: Function
) => {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  const audioRef = useRef<HTMLAudioElement>(new Audio(url));

  const play = useCallback(() => {
    audioRef.current.play();
    dispatch({ type: "SET_IS_PLAYING", payload: true });
  }, []);

  const pause = useCallback(() => {
    audioRef.current.pause();
    dispatch({ type: "SET_IS_PLAYING", payload: false });
  }, []);

  const setCurrentTime = useCallback(
    (timestamp: number) => {
      audioRef.current.currentTime = timestamp;
      dispatch({ type: "SET_CURRENT_TIME", payload: timestamp });
      play();
    },
    [play]
  );

  const onLoadedMetadata = useCallback(() => {
    dispatch({ type: "SET_DURATION", payload: audioRef.current.duration });
  }, []);

  const itsLoading = useCallback(() => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
  }, []);

  const notLoading = useCallback(() => {
    dispatch({ type: "SET_IS_LOADING", payload: false });
  }, []);

  const onTimeUpdate = useMemo(() => {
    const func = () => {
      dispatch({
        type: "SET_CURRENT_TIME",
        payload: Math.trunc(audioRef.current.currentTime),
      });
      onTimeUpdateCallback({ currentTime: audioRef.current.currentTime });
    };
    return throttle(func, 1000);
  }, [onTimeUpdateCallback]);

  const onEnded = useCallback(() => {
    dispatch({ type: "SET_IS_PLAYING", payload: false });
    dispatch({ type: "SET_CURRENT_TIME", payload: 0 });
    onEndedCallback();
  }, [onEndedCallback]);

  const onError = useCallback((error: ErrorEvent) => {
    dispatch({ type: "SET_ERROR", payload: error });
    dispatch({ type: "SET_IS_LOADING", payload: false });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    // Autoplay when the user selects a new episode
    if (audio.src !== url) {
      onEnded();
      audio.src = url;
      play();
    } else {
      audio.currentTime = initialTimestamp;
    }

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    // Loading state
    audio.addEventListener("loadeddata", notLoading);
    audio.addEventListener("waiting", itsLoading);
    audio.addEventListener("playing", notLoading);
    audio.addEventListener("seeking", itsLoading);
    audio.addEventListener("seeked", notLoading);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("loadeddata", notLoading);
      audio.removeEventListener("waiting", itsLoading);
      audio.removeEventListener("playing", notLoading);
      audio.removeEventListener("seeking", itsLoading);
      audio.removeEventListener("seeked", notLoading);
    };
  }, [
    url,
    initialTimestamp,
    play,
    onTimeUpdateCallback,
    onEndedCallback,
    onError,
    onLoadedMetadata,
    onTimeUpdate,
    onEnded,
    itsLoading,
    notLoading,
  ]);

  return {
    currentTime: state.currentTime,
    duration: state.duration,
    isPlaying: state.isPlaying,
    isLoading: state.isLoading,
    error: state.error,
    play,
    pause,
    setCurrentTime,
  };
};

export default useAudio;
