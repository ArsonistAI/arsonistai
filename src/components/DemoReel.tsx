"use client";

import { useRef, useState, useCallback } from "react";

export default function DemoReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState("16/9");
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fadeInAudio = useCallback((video: HTMLVideoElement) => {
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);

    const targetVolume = 0.1;
    const durationMs = 10_000;
    const intervalMs = 100;
    const increment = targetVolume / (durationMs / intervalMs);

    video.volume = 0;
    fadeTimerRef.current = setInterval(() => {
      if (video.volume + increment >= targetVolume) {
        video.volume = targetVolume;
        if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
      } else {
        video.volume += increment;
      }
    }, intervalMs);
  }, []);

  function handlePlay() {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 0;
    video.src = "/videos/demo-reel.mp4";
    video.load();
    video.play().then(() => {
      fadeInAudio(video);
    });
    setLoaded(true);
    setPlaying(true);
  }

  function handleLoadedMetadata() {
    const video = videoRef.current;
    if (!video) return;
    if (video.videoWidth && video.videoHeight) {
      setAspectRatio(`${video.videoWidth} / ${video.videoHeight}`);
    }
  }

  function handleVideoClick() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <section id="demo-reel" className="py-24">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-label-lg text-lava uppercase tracking-widest mb-2">
          Our Work
        </p>
        <h2 className="text-headline-md font-bold">Demo Reel</h2>
      </div>

      <div
        className="relative max-w-7xl mx-auto px-6 overflow-hidden bg-surface rounded-shape-lg border border-border group cursor-pointer"
        style={{ aspectRatio }}
        onClick={playing || loaded ? handleVideoClick : undefined}
      >
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0800] via-[#0A0A0A] to-[#140800] flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 50%, #FF4000 0%, transparent 60%), radial-gradient(circle at 70% 50%, #FF6633 0%, transparent 50%)",
                }}
              />
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          preload="none"
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setPlaying(false)}
        />

        {!playing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePlay();
            }}
            aria-label="Play demo reel"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-shape-full bg-lava/90 flex items-center justify-center shadow-2xl m3-button group-hover:scale-110 group-hover:bg-lava">
              <svg
                className="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}

        {playing && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 m3-transition transition-opacity">
            <div className="w-14 h-14 rounded-shape-full bg-black/50 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
