'use client';

import { useEffect, useState } from 'react';
import { getMotionPreferences } from '@/lib/accessibility';

interface ScrollProgressProps {
  showOnPages?: string[];
  className?: string;
}

export default function ScrollProgress({ 
  showOnPages = ['/blog/', '/projects/'], 
  className = '' 
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check motion preferences
    const motionPrefs = getMotionPreferences();
    setShouldAnimate(!motionPrefs.prefersReducedMotion);

    // Check if we should show on current page
    const currentPath = window.location.pathname;
    const shouldShow = showOnPages.some(page => currentPath.includes(page));
    setIsVisible(shouldShow);

    if (!shouldShow) return;

    const calculateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    const handleScroll = () => {
      calculateProgress();
    };

    // Initial calculation
    calculateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOnPages]);

  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800
        ${className}
      `}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div 
        className={`
          h-full bg-gradient-to-r from-blue-500 to-purple-600
          transform-gpu origin-left
          ${shouldAnimate ? 'transition-transform duration-75 ease-out' : ''}
        `}
        style={{ 
          transform: `scaleX(${progress / 100})`,
          ...(shouldAnimate ? {} : { transition: 'none' })
        }}
      />
    </div>
  );
}