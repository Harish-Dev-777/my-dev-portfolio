"use client";

import { useRef, useState, useCallback } from "react";

const VIDEOS = [
  "/bg-scenes/Penguin_walks_alone_toward_mountain.mp4",
  "/bg-scenes/Pengiun_Walking.mp4",
];

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // When a video ends, advance to the next (looping back to the start)
  const handleEnded = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <video
        ref={videoRef}
        key={currentIndex} // remount element to trigger new src load
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="w-full h-full object-cover opacity-35 saturate-50 transition-opacity duration-1000 scale-[1.3] min-[768px]:scale-[1.1]"
      >
        <source src={VIDEOS[currentIndex]} type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
