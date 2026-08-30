/**
 * Lazy-loaded components for performance optimization
 * 
 * Heavy components that can be loaded on-demand to improve
 * initial page load performance.
 */

import { createLazyComponent } from '@/lib/performance';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load heavy components
export const LazyProjectGallery = createLazyComponent(
  () => import('@/components/ProjectGallery'),
  LoadingSpinner
);

export const LazyContactMe = createLazyComponent(
  () => import('@/components/ContactMe'),
  LoadingSpinner
);

export const LazyBlogContent = createLazyComponent(
  () => import('@/components/ArticleContent'),
  LoadingSpinner
);

export const LazyAnalyticsDashboard = createLazyComponent(
  () => import('@/components/GoogleAnalytics'),
  () => null // No fallback needed for analytics
);