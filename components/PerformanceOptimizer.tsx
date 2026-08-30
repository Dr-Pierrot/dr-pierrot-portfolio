/**
 * Performance Optimization Component
 * 
 * Handles performance monitoring initialization, resource preloading,
 * and critical performance optimizations for the application.
 */

'use client';

import { useEffect } from 'react';
import { initializePerformanceMonitoring, addResourceHints, preloadImage } from '@/lib/performance';

interface PerformanceOptimizerProps {
  criticalImages?: string[];
  enableMonitoring?: boolean;
}

export default function PerformanceOptimizer({ 
  criticalImages = [],
  enableMonitoring = true 
}: PerformanceOptimizerProps) {
  useEffect(() => {
    // Initialize performance monitoring
    if (enableMonitoring) {
      initializePerformanceMonitoring();
    }

    // Add resource hints for faster loading
    addResourceHints();

    // Preload critical images
    criticalImages.forEach(src => {
      preloadImage(src);
    });

    // Preload critical fonts with Google Fonts URLs
    const fontPreloads = [
      'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      'https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C4sVBs3zzPw.woff2',
      'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2',
    ];

    fontPreloads.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

  }, [criticalImages, enableMonitoring]);

  return null; // This component doesn't render anything
}