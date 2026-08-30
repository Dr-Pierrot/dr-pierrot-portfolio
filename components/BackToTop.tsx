'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { FOCUS_VISIBLE_CLASSES, getMotionPreferences } from '@/lib/accessibility';

interface BackToTopProps {
  showAfter?: number;
  className?: string;
}

export default function BackToTop({ 
  showAfter = 400,
  className = ''
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check motion preferences
    const motionPrefs = getMotionPreferences();
    setShouldAnimate(!motionPrefs.prefersReducedMotion);

    const handleScroll = () => {
      setIsVisible(window.pageYOffset > showAfter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    if (shouldAnimate) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        fixed bottom-6 right-6 z-40
        w-12 h-12 rounded-full
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        shadow-lg hover:shadow-xl
        text-gray-700 dark:text-gray-300
        hover:text-blue-600 dark:hover:text-blue-400
        ${shouldAnimate ? 'transition-all duration-300 ease-out' : ''}
        ${shouldAnimate ? 'hover:scale-105 active:scale-95' : ''}
        ${FOCUS_VISIBLE_CLASSES}
        ${className}
      `}
      style={{
        transform: `translateY(${isVisible ? '0' : '100px'})`,
        opacity: isVisible ? 1 : 0,
        ...(shouldAnimate ? {} : { transition: 'none' })
      }}
    >
      <ArrowUp className="w-5 h-5 mx-auto" />
    </button>
  );
}