'use client';

import { useState, useEffect } from 'react';

interface CourseMapProps {
  courseMapUrl?: string;
  courseName?: string;
  className?: string;
}

export default function CourseMap({ courseMapUrl, courseName, className = '' }: CourseMapProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      
      // If mobile and we have a PDF URL, immediately set as loaded
      if (mobile && courseMapUrl) {
        const isImageFile = courseMapUrl.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/);
        if (!isImageFile) {
          setIsLoading(false);
          setHasError(false);
        }
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [courseMapUrl]);


  if (!courseMapUrl) {
    return (
      <div className={`bg-gray-50 rounded border border-gray-200 p-4 ${className}`}>
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500 text-[10px] sm:text-xs text-center">
            Course map not available
          </p>
        </div>
      </div>
    );
  }

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Determine if the URL is an image or PDF
  const isImage = courseMapUrl.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/);

  return (
    <div className={`bg-white rounded border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gray-50 px-2 py-1.5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Course Map
          </h3>
          <a
            href={courseMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] sm:text-[10px] text-primary-600 hover:text-primary-700 transition-colors"
          >
            View Full Size
          </a>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500 mx-auto mb-2"></div>
              <p className="text-[9px] sm:text-[10px] text-gray-500">Loading map...</p>
            </div>
          </div>
        )}

        {hasError ? (
          <div className="flex items-center justify-center h-32 bg-gray-50">
            <div className="text-center">
              <p className="text-[9px] sm:text-[10px] text-gray-500 mb-1">
                Unable to load course map
              </p>
              <a
                href={courseMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] sm:text-[10px] text-primary-600 hover:text-primary-700 transition-colors"
              >
                Open in new tab
              </a>
            </div>
          </div>
        ) : (
          <div className="relative">
            {isImage ? (
              <a
                href={courseMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src={courseMapUrl}
                  alt={`Course map for ${courseName || 'this course'}`}
                  className="w-full h-48 sm:h-56 object-cover"
                  onLoad={handleLoad}
                  onError={handleError}
                />
              </a>
            ) : (
              // For PDFs, show different content on mobile vs desktop
              isMobile ? (
                <div className="w-full h-48 sm:h-56 bg-gray-50 flex flex-col items-center justify-center p-4">
                  <div className="text-center">
                    <div className="mb-3">
                      <img 
                        src="/optimized/coursemap-icon.webp" 
                        alt="Course Map Preview"
                        className="w-16 h-16 mx-auto object-contain opacity-60"
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-3">
                      Course Map PDF
                    </p>
                    <a
                      href={courseMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 bg-primary-600 text-white text-[10px] sm:text-xs rounded hover:bg-primary-700 transition-colors"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open PDF
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  src={courseMapUrl}
                  className="w-full h-48 sm:h-56 border-0"
                  onLoad={handleLoad}
                  onError={handleError}
                  title={`Course map for ${courseName || 'this course'}`}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
