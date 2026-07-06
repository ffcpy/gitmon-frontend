"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "gitmon_music_enabled";
export const PLAY_MUSIC_EVENT = "gitmon:play-music";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setEnabled(stored === null ? true : stored === "true");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !audioRef.current) return;
    audioRef.current.volume = 0.35;

    if (!enabled) {
      audioRef.current.pause();
      return;
    }

    function attemptPlay() {
      audioRef.current?.play().catch(() => {});
    }

    attemptPlay();

    window.addEventListener(PLAY_MUSIC_EVENT, attemptPlay);
    window.addEventListener("pointerdown", attemptPlay, { once: true });
    window.addEventListener("keydown", attemptPlay, { once: true });

    return () => {
      window.removeEventListener(PLAY_MUSIC_EVENT, attemptPlay);
      window.removeEventListener("pointerdown", attemptPlay);
      window.removeEventListener("keydown", attemptPlay);
    };
  }, [enabled, ready]);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  }

  if (!ready) return null;

  return (
    <>
      <audio ref={audioRef} src="/sounds/theme.mp3" loop preload="none" />
      <button
        onClick={toggle}
        aria-label={enabled ? "Desativar música" : "Ativar música"}
        className="fixed bottom-4 left-4 z-40 w-11 h-11 flex items-center justify-center rounded-full bg-slate-950/60 border border-amber-300/30 text-amber-200 hover:text-amber-100 hover:scale-110 transition backdrop-blur-sm"
      >
        {enabled ? "🎵" : "🔇"}
      </button>
    </>
  );
}