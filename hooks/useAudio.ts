import { throttle } from "lodash";
import { useEffect, useRef, useState } from "react";

interface AudioState {
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  isLoading: boolean;
  error: Error | null;
}

type TimeUpdateCallback = (currentTime: number) => void;

type MediaSessionMetadata = {
  title?: string;
  artist?: string;
  album?: string;
  artworkUrl?: string;
};

type UseAudioOptions = {
  mediaSession?: MediaSessionMetadata;
  onEnded?: () => void;
};

const useAudio = (
  url: string | undefined,
  initialTime: number = 0,
  onTimeUpdate: TimeUpdateCallback,
  options?: UseAudioOptions
) => {
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

  const onTimeUpdateRef = useRef<TimeUpdateCallback>(onTimeUpdate);
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  const optionsRef = useRef<UseAudioOptions | undefined>(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create and wire the audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    // Helps especially on mobile browsers
    // @ts-expect-error playsInline is not in the standard TS defs for HTMLAudioElement
    audio.playsInline = true;

    audioRef.current = audio;

    const setAudioData = () => {
      setAudioState((prevState) => ({
        ...prevState,
        duration: Number.isFinite(audio.duration) ? audio.duration : 0,
        isLoading: false,
      }));
    };

    const throttledTimeUpdate = throttle(() => {
      const current = audio.currentTime;
      onTimeUpdateRef.current?.(current);
      setAudioState((prevState) => ({ ...prevState, currentTime: current }));
    }, 1000);

    const handlePlay = () => {
      setAudioState((prevState) => ({ ...prevState, isPlaying: true }));
      // Media Session play/pause state sync
      if (typeof navigator !== "undefined" && (navigator as any).mediaSession) {
        (navigator as any).mediaSession.playbackState = "playing";
      }
    };

    const handlePause = () => {
      setAudioState((prevState) => ({ ...prevState, isPlaying: false }));
      if (typeof navigator !== "undefined" && (navigator as any).mediaSession) {
        (navigator as any).mediaSession.playbackState = "paused";
      }
    };

    const setIsLoading = (isLoading: boolean) => {
      setAudioState((prevState) => ({ ...prevState, isLoading }));
    };

    const handleError = (e: Event) => {
      setAudioState((prevState) => ({
        ...prevState,
        error: e as unknown as Error,
        isLoading: false,
      }));
    };

    const handleEnded = () => {
      setAudioState((prevState) => ({ ...prevState, isPlaying: false }));
      optionsRef.current?.onEnded?.();
    };

    const setIsLoadingTrue = () => setIsLoading(true);
    const setIsLoadingFalse = () => setIsLoading(false);

    const handleDurationChange = () => {
      setAudioState((prev) => ({
        ...prev,
        duration: Number.isFinite(audio.duration)
          ? audio.duration
          : prev.duration,
      }));
    };

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", throttledTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);
    audio.addEventListener("waiting", setIsLoadingTrue);
    audio.addEventListener("seeking", setIsLoadingTrue);
    audio.addEventListener("seeked", setIsLoadingFalse);
    audio.addEventListener("canplaythrough", setIsLoadingFalse);
    audio.addEventListener("playing", setIsLoadingFalse);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("durationchange", handleDurationChange);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      throttledTimeUpdate.cancel();

      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", throttledTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("waiting", setIsLoadingTrue);
      audio.removeEventListener("seeking", setIsLoadingTrue);
      audio.removeEventListener("seeked", setIsLoadingFalse);
      audio.removeEventListener("canplaythrough", setIsLoadingFalse);
      audio.removeEventListener("playing", setIsLoadingFalse);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("durationchange", handleDurationChange);
    };
  }, []);

  // Update source and perform initial seek when URL changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // If url is undefined, reset state and return
    if (!url) {
      audio.removeAttribute("src");
      audio.load();
      setAudioState((prev) => ({
        ...prev,
        duration: 0,
        currentTime: 0,
        isPlaying: false,
        isLoading: false,
      }));
      return;
    }

    setAudioState((prev) => ({ ...prev, isLoading: true, error: null }));
    audio.src = url;

    // Seek to initial time after metadata is ready
    const seekToInitialTime = () => {
      const t = initialTimeRef.current ?? 0;
      try {
        audio.currentTime = t;
        setAudioState((prev) => ({ ...prev, currentTime: t }));
      } catch {
        // ignore seek errors
      }
    };

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      seekToInitialTime();
    } else {
      const onMeta = () => {
        seekToInitialTime();
        audio.removeEventListener("loadedmetadata", onMeta);
      };
      audio.addEventListener("loadedmetadata", onMeta);
    }

    // Load but do not autoplay
    audio.load();
  }, [url]);

  const play = () => audioRef.current?.play();
  const pause = () => audioRef.current?.pause();
  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const setVolume = (volume: number) => {
    const v = Math.min(1, Math.max(0, volume));
    if (audioRef.current) audioRef.current.volume = v;
  };

  const setPlaybackRate = (rate: number) => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  };

  // Media Session metadata wiring (optional)
  useEffect(() => {
    if (!optionsRef.current?.mediaSession) return;
    if (typeof navigator === "undefined") return;
    const mediaSession = (navigator as any).mediaSession;
    if (!mediaSession) return;

    const { title, artist, album, artworkUrl } =
      optionsRef.current.mediaSession;
    try {
      mediaSession.metadata = new (window as any).MediaMetadata({
        title: title ?? "",
        artist: artist ?? "",
        album: album ?? "",
        artwork: artworkUrl
          ? [
              { src: artworkUrl, sizes: "96x96", type: "image/png" },
              { src: artworkUrl, sizes: "128x128", type: "image/png" },
              { src: artworkUrl, sizes: "192x192", type: "image/png" },
              { src: artworkUrl, sizes: "256x256", type: "image/png" },
              { src: artworkUrl, sizes: "384x384", type: "image/png" },
              { src: artworkUrl, sizes: "512x512", type: "image/png" },
            ]
          : undefined,
      });

      mediaSession.setActionHandler?.("play", () => play());
      mediaSession.setActionHandler?.("pause", () => pause());
      mediaSession.setActionHandler?.("seekto", (details: any) => {
        if (typeof details.seekTime === "number") seek(details.seekTime);
      });
      mediaSession.setActionHandler?.("seekbackward", (details: any) => {
        const skip = details.seekOffset ?? 10;
        if (audioRef.current)
          seek(Math.max(0, audioRef.current.currentTime - skip));
      });
      mediaSession.setActionHandler?.("seekforward", (details: any) => {
        const skip = details.seekOffset ?? 30;
        if (audioRef.current) seek(audioRef.current.currentTime + skip);
      });
    } catch {
      // Best-effort; ignore Media Session errors
    }
  }, [
    options?.mediaSession?.title,
    options?.mediaSession?.artist,
    options?.mediaSession?.album,
    options?.mediaSession?.artworkUrl,
  ]);

  return {
    ...audioState,
    play,
    pause,
    seek,
    setVolume,
    setPlaybackRate,
  };
};

export default useAudio;
