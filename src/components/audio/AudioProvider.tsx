"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { invitationData } from "@/config/invitationData";

interface AudioContextValue {
  isPlaying: boolean;
  hasSource: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSource, setHasSource] = useState(true);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // No BGM file at the configured path yet, or the browser blocked it.
        setHasSource(false);
        setIsPlaying(false);
      });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  return (
    <AudioCtx.Provider value={{ isPlaying, hasSource, play, pause, toggle }}>
      <audio
        ref={audioRef}
        src={invitationData.bgm.src}
        loop
        preload="none"
        onEnded={() => setIsPlaying(false)}
      />
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within an AudioProvider");
  return ctx;
}
