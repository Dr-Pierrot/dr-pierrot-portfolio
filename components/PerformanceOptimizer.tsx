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

    // Preload critical fonts
    const fontPreloads = [
      '/fonts/inter-var.woff2',
      '/fonts/space-grotesk-var.woff2',
      '/fonts/jetbrains-mono-var.woff2',
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