# Portfolio Enhancement - Implementation Plan

**Project:** Dr-Pierrot Portfolio Upgrade  
**Date:** August 26, 2026  

---

## Overview: 8 Phases | 23 Steps | ~16-18 Hours

Transform portfolio to production-grade with:
- ✅ Optimized images (Next.js Image, WebP/AVIF)
- ✅ Enhanced SEO (structured data, sitemaps)
- ✅ Analytics (Google Analytics 4)
- ✅ Blog system (MDX articles)
- ✅ Resume download (API endpoint)
- ✅ Error boundaries & loading states
- ✅ WCAG 2.1 AA accessibility
- ✅ Performance optimization

---

## PHASE 1: Foundation & Setup

### Step 1: Environment (30 min)
- 1.1. `.env.example` file
- 1.2. `lib/env.ts` utilities
- 1.3. `lib/constants.ts` 
- 1.4. Update `.gitignore`
- 1.5. `next.config.ts` optimization

### Step 2: TypeScript (20 min)
- 2.1. Stricter `tsconfig.json`
- 2.2. Path aliases
- 2.3. Fix type errors
- 2.4. Add type-check script

### Step 3: Documentation (45 min)
- 3.1. `docs/CONTRIBUTING.md`
- 3.2. `docs/DEPLOYMENT.md`
- 3.3. `docs/CONTENT.md`
- 3.4. `CHANGELOG.md`
- 3.5. Update `README.md`

---

## PHASE 2: Images & Assets

### Step 4: Organization (30 min)
- 4.1. `public/projects/` structure
- 4.2. Asset naming guide
- 4.3. `.gitkeep` files
- 4.4. `scripts/optimize-images.mjs`
- 4.5. `npm install sharp`

### Step 5: Infrastructure (45 min)
- 5.1. `lib/images.ts`
- 5.2. `components/OptimizedImage.tsx`
- 5.3. Update `lib/projects.ts`
- 5.4. Configure image formats

### Step 6: Apply (90 min)
- 6.1-6.8. Update all components to use Next.js Image

---

## PHASE 3: SEO & Analytics

### Step 7: SEO (60 min)
- 7.1. Dynamic `sitemap.ts`
- 7.2. Update `robots.ts`
- 7.3. Enhanced metadata
- 7.4. Organization schema
- 7.5. CreativeWork schema
- 7.6. Breadcrumb schema

### Step 8: Analytics (45 min)
- 8.1. `lib/analytics.ts`
- 8.2. `components/GoogleAnalytics.tsx`
- 8.3-8.7. Event tracking

---

## PHASE 4: Resume System

### Step 9: Data (30 min)
- 9.1. `data/resume.json`
- 9.2. `lib/resume.ts`
- 9.3. TypeScript types

### Step 10: API (45 min)
- 10.1. `app/api/resume/route.ts`
- 10.2-10.5. Implementation

### Step 11: UI (30 min)
- 11.1-11.4. Link components

---

## PHASE 5: Blog System

### Step 12: Infrastructure (45 min)
- 12.1-12.2. Install MDX packages
- 12.3. `content/articles/`
- 12.4. `lib/blog.ts`
- 12.5. Configure MDX

### Step 13: Components (90 min)
- 13.1. `components/ArticleCard.tsx`
- 13.2. `components/ArticleContent.tsx`
- 13.3. `app/blog/page.tsx`
- 13.4. `app/blog/[slug]/page.tsx`
- 13.5. Loading states
- 13.6. Example template

### Step 14: Integration (30 min)
- 14.1-14.5. Link to site

---

## PHASE 6: Error & Loading

### Step 15: Errors (45 min)
- 15.1. `components/ErrorFallback.tsx`
- 15.2. `app/error.tsx`
- 15.3. Error tracking
- 15.4. Recovery

### Step 16: Loading (45 min)
- 16.1. `components/LoadingSpinner.tsx`
- 16.2-16.5. Loading states

---

## PHASE 7: Accessibility

### Step 17: Core (45 min)
- 17.1. `lib/accessibility.ts`
- 17.2. `components/SkipToContent.tsx`
- 17.3-17.5. Integration

### Step 18: Audit (90 min) ✅ COMPLETE
- 18.1. **ContactMe.tsx**: Added `type="button"`, `aria-pressed` states, `FOCUS_VISIBLE_CLASSES` to subject quick-select buttons and submit button
- 18.2. **ResumeLink.tsx & ResumeDownload.tsx**: Added `type="button"`, `FOCUS_VISIBLE_CLASSES`, proper focus management for all download buttons
- 18.3. **Project.tsx**: Added `type="button"`, `aria-pressed`, `FOCUS_VISIBLE_CLASSES` to filter buttons
- 18.4. **ProjectGallery.tsx**: Added `FOCUS_VISIBLE_CLASSES` to navigation buttons, gallery container, and pagination dots
- 18.5. **Blog pages**: Added `type="button"`, `FOCUS_VISIBLE_CLASSES` to newsletter subscription and social share buttons
- 18.6. **TOC links**: Fixed empty href="#" links with proper anchor targets
- 18.7. **Button semantics**: Ensured all interactive elements have proper button types and ARIA attributes

### Step 19: Motion (30 min) ✅ COMPLETE
- 19.1. **CSS Global Reduced Motion**: Added comprehensive `@media (prefers-reduced-motion: reduce)` rules to disable all animations and transitions
- 19.2. **Accessibility Utilities**: Enhanced `lib/accessibility.ts` with `getTransitionClasses()`, `getAnimationClasses()`, `getMotionPreferences()` functions
- 19.3. **Component Updates**: Applied reduced motion utilities to Hero, Footer, ErrorFallback, About components with proper motion-safe/motion-reduce classes

---

## PHASE 8: Polish & QA

### Step 20: Contact (60 min) ✅ COMPLETE
- 20.1. **Honeypot Protection**: Added invisible honeypot field to catch bots automatically
- 20.2. **Rate Limiting**: Implemented IP-based rate limiting (3 requests per 15 minutes, 1-hour blocks)
- 20.3. **Spam Detection**: Added pattern-based spam filtering for common spam content
- 20.4. **Enhanced Validation**: Improved email regex, input sanitization, and minimum message length
- 20.5. **Security Headers**: Added rate limit headers, timestamp validation, and detailed logging

### Step 21: Performance (60 min)
- 21.1. Bundle analyzer
- 21.2-21.7. Optimizations

### Step 22: Features (45 min)
- 22.1-22.4. Additional features

### Step 23: QA (90 min)
- 23.1-23.10. Final testing

---

## Dependencies

```bash
npm install sharp
npm install @mdx-js/loader @mdx-js/react next-mdx-remote gray-matter reading-time
npm install rehype-highlight rehype-slug rehype-autolink-headings remark-gfm
npm install @next/bundle-analyzer
npm install --save-dev @types/mdx
```

---

## Success Criteria

- Lighthouse ≥90
- WCAG 2.1 AA
- Complete docs
- <10min setup


