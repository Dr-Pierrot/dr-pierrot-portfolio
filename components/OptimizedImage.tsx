'use client';

/**
 * OptimizedImage Component
 * 
 * A wrapper around Next.js Image component with consistent defaults,
 * error handling, and loading states for the portfolio.
 */

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { trackError } from '@/lib/analytics';
import { getImagePath, getBlurDataURL, getImageQuality } from '@/lib/images';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1' | 'auto';
  unoptimized?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality,
  fill = false,
  sizes,
  objectFit = 'cover',
  objectPosition = 'center',
  loading = 'lazy',
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  fallbackSrc = '/placeholder.jpg',
  aspectRatio = 'auto',
  unoptimized = false,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(getImagePath(src, fallbackSrc));
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    setImgSrc(fallbackSrc);
    trackError(new Error(`Image failed to load: ${src}`), 'optimized_image');
    onError?.();
  };

  // Determine quality based on context if not provided
  const imageQuality = quality || (priority ? 90 : 85);

  // Container classes with aspect ratio
  const containerClasses = cn(
    'relative overflow-hidden',
    aspectRatio !== 'auto' && `aspect-[${aspectRatio}]`,
    className
  );

  // Image classes with loading state
  const imageClasses = cn(
    'transition-opacity duration-300',
    isLoading ? 'opacity-0' : 'opacity-100',
    hasError && 'grayscale'
  );

  // Common image props
  const imageProps = {
    src: imgSrc,
    alt: alt || 'Image',
    quality: imageQuality,
    loading: priority ? undefined : loading,
    priority,
    placeholder: placeholder === 'blur' ? 'blur' as const : 'empty' as const,
    blurDataURL: placeholder === 'blur' ? (blurDataURL || getBlurDataURL()) : undefined,
    onLoad: handleLoad,
    onError: handleError,
    unoptimized,
    className: imageClasses,
    style: {
      objectFit,
      objectPosition,
    },
  };

  return (
    <div className={containerClasses}>
      {fill ? (
        <Image
          {...imageProps}
          fill
          sizes={sizes || '100vw'}
        />
      ) : (
        <Image
          {...imageProps}
          width={width}
          height={height}
          sizes={sizes}
        />
      )}
      
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true" />
      )}
      
      {/* Error indicator (optional - can be removed if you don't want visible error state) */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-xs text-gray-400">Image not available</span>
        </div>
      )}
    </div>
  );
}

/**
 * ProjectImage - Specialized component for project images
 */
interface ProjectImageProps extends Omit<OptimizedImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  type?: 'cover' | 'gallery' | 'thumbnail';
  projectName?: string;
}

export function ProjectImage({
  src,
  alt,
  type = 'cover',
  projectName,
  ...props
}: ProjectImageProps) {
  // Auto-set quality based on type
  const quality = props.quality || getImageQuality(type);
  
  // Generate alt text if not provided
  const altText = alt || (projectName ? `${projectName} - ${type}` : 'Project image');
  
  return (
    <OptimizedImage
      src={src}
      alt={altText}
      quality={quality}
      {...props}
    />
  );
}

/**
 * HeroImage - Specialized component for hero images
 */
interface HeroImageProps extends Omit<OptimizedImageProps, 'priority' | 'quality'> {
  src: string;
  alt: string;
}

export function HeroImage({ src, alt, ...props }: HeroImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      priority={true}
      quality={90}
      fill
      objectFit="cover"
      {...props}
    />
  );
}

/**
 * ThumbnailImage - Specialized component for thumbnail images
 */
interface ThumbnailImageProps extends Omit<OptimizedImageProps, 'width' | 'height'> {
  src: string;
  alt: string;
  size?: number;
}

export function ThumbnailImage({ src, alt, size = 400, ...props }: ThumbnailImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      quality={75}
      aspectRatio="1/1"
      {...props}
    />
  );
}
