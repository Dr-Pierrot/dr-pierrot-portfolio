import type { NextConfig } from "next";

// Type for bundle analyzer
type BundleAnalyzer = (config: NextConfig) => NextConfig;

// Bundle analyzer setup - using dynamic import for better TypeScript support
const createBundleAnalyzer = (): BundleAnalyzer => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: process.env.ANALYZE === 'true',
    });
    return withBundleAnalyzer;
  } catch (error) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Bundle analyzer not available:', error);
  }
    return (config: NextConfig) => config;
  }
};

const withBundleAnalyzer = createBundleAnalyzer();

const nextConfig: NextConfig = {
  // Image Optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler Options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Performance & Output
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  // Server External Packages (moved from experimental in Next.js 2026)
  serverExternalPackages: ['sharp'],

  // Experimental Features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'clsx', 'tailwind-merge'],
  },

  // Turbopack Configuration (Next.js 16+ default)
  turbopack: {
    // Turbopack-specific optimizations
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
    resolveAlias: {
      // Production optimizations moved to Turbopack
      ...(process.env.NODE_ENV === 'production' && {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
      }),
    },
  },

  // Webpack optimizations (fallback for --webpack flag)
  webpack: (config, { dev, isServer }) => {
    // Only apply webpack config when explicitly using webpack
    if (process.env.WEBPACK_MODE === 'true') {
      // Production optimizations
      if (!dev && !isServer) {
        config.resolve.alias = {
          ...config.resolve.alias,
          'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        };
      }

      // Split chunks optimization
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
            common: {
              minChunks: 2,
              priority: -5,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },

  // Headers for Security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      // Add custom redirects here if needed
    ];
  },

  // Rewrites
  async rewrites() {
    return [
      // Add custom rewrites here if needed
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
