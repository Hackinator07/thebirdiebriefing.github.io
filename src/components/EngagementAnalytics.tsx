'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import analytics from '@/lib/analytics';

interface EngagementAnalyticsProps {
  articleId?: string;
  articleTitle?: string;
  category?: string;
}

export default function EngagementAnalytics({ 
  articleId, 
  articleTitle, 
  category 
}: EngagementAnalyticsProps) {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const lastScrollDepthRef = useRef<number>(0);
  const hasTrackedHalfwayRef = useRef<boolean>(false);
  const hasTrackedCompleteRef = useRef<boolean>(false);

  useEffect(() => {
    startTimeRef.current = Date.now();
    lastScrollDepthRef.current = 0;
    hasTrackedHalfwayRef.current = false;
    hasTrackedCompleteRef.current = false;

    const trackScrollDepth = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track scroll milestones
      if (scrollPercent >= 25 && lastScrollDepthRef.current < 25) {
        analytics.track('Article Scroll Depth', {
          depth: '25%',
          articleId,
          articleTitle,
          category,
          url: pathname
        });
      }

      if (scrollPercent >= 50 && lastScrollDepthRef.current < 50) {
        analytics.track('Article Scroll Depth', {
          depth: '50%',
          articleId,
          articleTitle,
          category,
          url: pathname
        });
        hasTrackedHalfwayRef.current = true;
      }

      if (scrollPercent >= 75 && lastScrollDepthRef.current < 75) {
        analytics.track('Article Scroll Depth', {
          depth: '75%',
          articleId,
          articleTitle,
          category,
          url: pathname
        });
      }

      if (scrollPercent >= 90 && lastScrollDepthRef.current < 90) {
        analytics.track('Article Scroll Depth', {
          depth: '90%',
          articleId,
          articleTitle,
          category,
          url: pathname
        });
        hasTrackedCompleteRef.current = true;
      }

      lastScrollDepthRef.current = scrollPercent;
    };

    // Track time spent thresholds
    const timeTracking = setInterval(() => {
      const timeSpent = Date.now() - startTimeRef.current;
      const timeSpentSeconds = Math.floor(timeSpent / 1000);

      // Track engagement milestones
      if (timeSpentSeconds === 30) {
        analytics.track('Article Engagement', {
          milestone: '30_seconds',
          articleId,
          articleTitle,
          category,
          url: pathname
        });
      }

      if (timeSpentSeconds === 60) {
        analytics.track('Article Engagement', {
          milestone: '1_minute',
          articleId,
          articleTitle,
          category,
          url: pathname
        });
      }

      if (timeSpentSeconds === 120) {
        analytics.track('Article Engagement', {
          milestone: '2_minutes',
          articleId,
          articleTitle,
          category,
          url: pathname
        });
      }

      if (timeSpentSeconds === 300) {
        analytics.track('Article Engagement', {
          milestone: '5_minutes',
          articleId,
          articleTitle,
          category,
          url: pathname
        });
      }
    }, 1000);

    // Add event listeners
    window.addEventListener('scroll', trackScrollDepth, { passive: true });

    // Track when user leaves the page
    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTimeRef.current;
      const timeSpentSeconds = Math.floor(timeSpent / 1000);
      
      analytics.track('Article Session End', {
        timeSpent: timeSpentSeconds,
        scrollDepth: lastScrollDepthRef.current,
        reachedHalfway: hasTrackedHalfwayRef.current,
        reachedEnd: hasTrackedCompleteRef.current,
        articleId,
        articleTitle,
        category,
        url: pathname
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      clearInterval(timeTracking);
      window.removeEventListener('scroll', trackScrollDepth);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Final tracking on component unmount
      handleBeforeUnload();
    };
  }, [pathname, articleId, articleTitle, category]);

  // Track link clicks within articles
  useEffect(() => {
    const trackLinkClicks = (event: Event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href) {
        const isInternal = link.href.includes(window.location.hostname) || link.href.startsWith('/');
        const linkText = link.textContent?.trim() || 'Unknown';
        const linkUrl = link.href;
        
        analytics.track('Article Link Click', {
          linkText,
          linkUrl,
          isInternal,
          articleId,
          articleTitle,
          category,
          url: pathname
        });
      }
    };

    document.addEventListener('click', trackLinkClicks);
    
    return () => {
      document.removeEventListener('click', trackLinkClicks);
    };
  }, [pathname, articleId, articleTitle, category]);

  return null; // This component doesn't render anything
}
