"use client";

import React, { useState, useRef, useEffect } from "react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error("Audio play failed:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-8 right-8 z-[100] flex items-center gap-4">
      <audio ref={audioRef} src="/backsound3.mp3" loop />

      <button
        onClick={togglePlay}
        className="flex items-center gap-2 px-4 py-2 border border-white/20 bg-black/40 backdrop-blur-md text-chalk font-mono text-xs uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:border-white/50 group pointer-events-auto"
      >
        <div className="flex items-center gap-1 h-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1 bg-sage transition-all duration-300 ${isPlaying ? "animate-musicBars" : "h-1"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <span>{isPlaying ? "SYSTEM_AUDIO: ON" : "SYSTEM_AUDIO: OFF"}</span>
      </button>
    </div>
  );
}
