'use client';

import { useState, useEffect, useRef } from 'react';

interface ReadingProgressProps {
  className?: string;
  showPercentage?: boolean;
  color?: string;
}

export default function ReadingProgress({ 
  className = '',
  showPercentage = false,
  color = 'bg-primary-500'
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
      
      // Show progress bar after scrolling a bit
      setIsVisible(scrollTop > 100);
    };

    // Initial calculation
    calculateProgress();

    // Add scroll listener
    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress);

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, []);

  return (
    <>
      {/* Fixed top progress bar */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        ref={progressRef}
      >
        <div 
          className={`h-full ${color} transition-all duration-150 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Optional percentage indicator */}
      {showPercentage && isVisible && (
        <div className="fixed top-4 right-4 z-50 bg-black/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {Math.round(progress)}%
        </div>
      )}
    </>
  );
}
