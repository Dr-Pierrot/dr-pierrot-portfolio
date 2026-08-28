/**
 * Environment Variable Utilities
 * 
 * Provides type-safe access to environment variables with validation
 * and default values where appropriate.
 */

/**
 * Get an environment variable with optional default value
 * @param key - The environment variable key
 * @param defaultValue - Optional default value if not found
 * @throws Error if required variable is missing and no default provided
 */
export function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value;
}

/**
 * Get a public environment variable (NEXT_PUBLIC_*)
 * @param key - The environment variable key (without NEXT_PUBLIC_ prefix)
 * @param defaultValue - Optional default value if not found
 */
export function getPublicEnvVar(key: string, defaultValue?: string): string {
  return getEnvVar(`NEXT_PUBLIC_${key}`, defaultValue);
}

/**
 * Check if a feature flag is enabled
 * @param flag - The feature flag name (without NEXT_PUBLIC_ENABLE_ prefix)
 */
export function isFeatureEnabled(flag: string): boolean {
  const value = process.env[`NEXT_PUBLIC_ENABLE_${flag}`];
  return value === 'true' || value === '1';
}

/**
 * Get the current environment
 */
export function getEnvironment(): 'development' | 'production' | 'test' {
  const env = process.env.NODE_ENV || 'development';
  if (env === 'development' || env === 'production' || env === 'test') {
    return env;
  }
  return 'development';
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return getEnvironment() === 'production';
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return getEnvironment() === 'development';
}

/**
 * Check if running in test environment
 */
export function isTest(): boolean {
  return getEnvironment() === 'test';
}

// Site Configuration
export const siteConfig = {
  url: getPublicEnvVar('SITE_URL', 'http://localhost:3000'),
  name: getPublicEnvVar('SITE_NAME', 'Dr. Pierrot Portfolio'),
  description: getPublicEnvVar('SITE_DESCRIPTION', 'Full-stack developer and creative technologist'),
} as const;

// Email Configuration (server-side only)
export const emailConfig = {
  resendApiKey: process.env.RESEND_API_KEY,
  fromEmail: getEnvVar('RESEND_FROM_EMAIL', 'onboarding@resend.dev'),
  toEmail: getEnvVar('RESEND_TO_EMAIL', 'capulongako16@gmail.com'),
} as const;

// Analytics Configuration
export const analyticsConfig = {
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  enabled: isFeatureEnabled('ANALYTICS'),
} as const;

// Feature Flags
export const features = {
  analytics: isFeatureEnabled('ANALYTICS'),
  blog: isFeatureEnabled('BLOG'),
  resumeDownload: isFeatureEnabled('RESUME_DOWNLOAD'),
} as const;
