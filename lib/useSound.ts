"use client";

import { useRef, useCallback } from "react";

export function useSound(enabled: boolean) {
  const cache = useRef<Record<string, HTMLAudioElement>>({});

  const play = useCallback(
    (name: string, volume = 0.5) => {
      if (!enabled) return;
      try {
        if (!cache.current[name]) {
          cache.current[name] = new Audio(`/sounds/${name}.mp3`);
        }
        const audio = cache.current[name];
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play().catch(() => {
          // autoplay bloqueado ou arquivo ausente: falha silenciosa
        });
      } catch {
        // som nunca deve quebrar a experiência
      }
    },
    [enabled]
  );

  return play;
}