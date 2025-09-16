'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const handleVideoReady = () => {
    console.log('Video is ready to play');
    setVideoReady(true);
    
    // Ensure video starts playing
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
      console.log('Video should now be playing and visible');
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      console.log('Video element created:', videoRef.current);
      console.log('Video src:', videoRef.current.src);
      console.log('Video readyState:', videoRef.current.readyState);
      
      // If video is already loaded (readyState 4), trigger ready immediately
      if (videoRef.current.readyState >= 4) {
        console.log('Video already loaded, triggering ready state');
        handleVideoReady();
      }
    }
  }, []);

  useEffect(() => {
    console.log('Video ready state changed:', videoReady);
  }, [videoReady]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video failed to load:', e);
    console.error('Video error details:', e.currentTarget.error);
  };

  return (
    <div className="fvideo_contain absolute inset-0 z-0">
      <div className="u-container relative w-full h-full">
        {/* Static background that appears before video loads */}
        <img
          src="/optimized/golf-background-poster.webp"
          alt="Video poster"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoReady ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Video element */}
        <video
          ref={videoRef}
          src="https://hackinator07.github.io/thebirdiebriefing.github.io/videos/golf-background.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/optimized/golf-background-poster.webp"
          onCanPlayThrough={handleVideoReady}
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          onError={handleVideoError}
          className={`background-video absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Overlay to further reduce video prominence - matching Fried Egg style */}
        <div className="video-overlay absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
    </div>
  );
}
