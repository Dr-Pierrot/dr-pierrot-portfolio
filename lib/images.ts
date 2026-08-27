/**
 * Image Utilities
 * 
 * Helper functions for working with Next.js Image optimization,
 * image paths, and responsive image configurations.
 */

import { IMAGE_CONFIG } from './constants';

/**
 * Image size presets for different use cases
 */
export const IMAGE_SIZES = {
  thumbnail: {
    width: 400,
    height: 267,
  },
  cover: {
    width: 1200,
    height: 800,
  },
  gallery: {
    width: 1920,
    height: 1080,
  },
  hero: {
    width: 1920,
    height: 1080,
  },
  avatar: {
    width: 400,
    height: 400,
  },
} as const;

/**
 * Responsive sizes attribute for Next.js Image
 */
export const RESPONSIVE_SIZES = {
  grid: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  featured: '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw',
  full: '100vw',
  half: '50vw',
  hero: '100vw',
  thumbnail: '(max-width: 768px) 50vw, 400px',
  gallery: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
} as const;

/**
 * Get optimized image path
 */
export function getImagePath(path: string | undefined, fallback = '/placeholder.jpg'): string {
  if (!path) return fallback;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Get project image path
 */
export function getProjectImagePath(
  slug: string,
  type: 'cover' | 'gallery' | 'thumbnail',
  index?: number
): string {
  const basePath = `/projects/${type}s`;
  
  switch (type) {
    case 'cover':
      return `${basePath}/${slug}-cover.webp`;
    case 'thumbnail':
      return `${basePath}/${slug}-thumb.webp`;
    case 'gallery':
      return `${basePath}/${slug}-gallery-${index || 1}.webp`;
    default:
      return '/placeholder.jpg';
  }
}

/**
 * Get blur data URL for image placeholder
 */
export function getBlurDataURL(color = '#e5e7eb'): string {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="${color}"/>
    </svg>`
  ).toString('base64')}`;
}

/**
 * Get image alt text
 */
export function getImageAlt(
  projectName: string,
  type: 'cover' | 'gallery' | 'thumbnail',
  index?: number
): string {
  switch (type) {
    case 'cover':
      return `${projectName} - Project cover image`;
    case 'thumbnail':
      return `${projectName} - Project thumbnail`;
    case 'gallery':
      return `${projectName} - Gallery image ${index || 1}`;
    default:
      return projectName;
  }
}

/**
 * Check if image exists
 */
export function hasImage(path: string | undefined): boolean {
  return Boolean(path && path.trim().length > 0);
}

/**
 * Get responsive image sizes for specific breakpoints
 */
export function getResponsiveSizes(
  mobile = '100vw',
  tablet = '50vw',
  desktop = '33vw'
): string {
  return `(max-width: 768px) ${mobile}, (max-width: 1200px) ${tablet}, ${desktop}`;
}

/**
 * Get image quality based on use case
 */
export function getImageQuality(type: 'thumbnail' | 'cover' | 'gallery' | 'hero'): number {
  const qualityMap = {
    thumbnail: 75,
    cover: 85,
    gallery: 85,
    hero: 90,
  };
  
  return qualityMap[type] || IMAGE_CONFIG.quality;
}

/**
 * Get image priority
 */
export function shouldPrioritize(
  isFeatured: boolean,
  isAboveFold: boolean,
  type: 'cover' | 'gallery' | 'thumbnail'
): boolean {
  return (isFeatured && type === 'cover') || isAboveFold;
}

/**
 * Image loader for external images
 */
export function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  return `${src}?w=${width}&q=${quality || 75}`;
}

/**
 * Parse image dimensions from path
 */
export function parseImageDimensions(path: string): { width: number; height: number } | null {
  const match = path.match(/(\d+)x(\d+)/);
  if (match) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  }
  return null;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get image aspect ratio
 */
export function getAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Calculate dimensions maintaining aspect ratio
 */
export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  targetWidth?: number,
  targetHeight?: number
): { width: number; height: number } {
  const aspectRatio = getAspectRatio(originalWidth, originalHeight);
  
  if (targetWidth && !targetHeight) {
    return {
      width: targetWidth,
      height: Math.round(targetWidth / aspectRatio),
    };
  }
  
  if (targetHeight && !targetWidth) {
    return {
      width: Math.round(targetHeight * aspectRatio),
      height: targetHeight,
    };
  }
  
  if (targetWidth && targetHeight) {
    return { width: targetWidth, height: targetHeight };
  }
  
  return { width: originalWidth, height: originalHeight };
}

