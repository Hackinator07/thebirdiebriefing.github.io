'use client';

import { useEffect, useRef } from 'react';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }
  }, []);

  return (
    <div className="fvideo_contain absolute inset-0 z-0">
      <div className="u-container relative w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="background-video absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/golf-background.mp4" type="video/mp4" />
          {/* Fallback background if video doesn't load */}
          <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500"></div>
        </video>

        {/* Overlay to further reduce video prominence - matching Fried Egg style */}
        <div className="video-overlay absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
    </div>
  );
}
