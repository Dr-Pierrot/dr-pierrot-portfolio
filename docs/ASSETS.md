# Asset Naming & Organization Guide

## Overview

This guide defines the structure and naming conventions for all assets in the portfolio, ensuring consistency and optimized performance.

---

## Directory Structure

```
public/
├── projects/
│   ├── covers/              # Project cover images (1200x800px)
│   ├── gallery/             # Project gallery images (1920x1080px)
│   ├── thumbnails/          # Project thumbnails (600x400px)
│   └── .gitkeep
├── images/                  # General site images
├── icons/                   # Favicons and app icons
└── files/                   # Downloadable files (resume, etc.)
```

---

## Naming Conventions

### Project Images

All project images follow this pattern: `[project-slug]-[type]-[variant].[ext]`

#### Cover Images
- **Location:** `public/projects/covers/`
- **Format:** `[project-slug]-cover.[ext]`
- **Recommended Size:** 1200x800px (3:2 ratio)
- **Example:** `ecommerce-platform-cover.jpg`

#### Gallery Images
- **Location:** `public/projects/gallery/`
- **Format:** `[project-slug]-gallery-[number].[ext]`
- **Recommended Size:** 1920x1080px (16:9 ratio)
- **Example:** 
  - `ecommerce-platform-gallery-1.jpg`
  - `ecommerce-platform-gallery-2.jpg`

#### Thumbnails
- **Location:** `public/projects/thumbnails/`
- **Format:** `[project-slug]-thumb.[ext]`
- **Recommended Size:** 600x400px (3:2 ratio)
- **Example:** `ecommerce-platform-thumb.jpg`

### General Site Images
- **Location:** `public/images/`
- **Format:** `[descriptive-name].[ext]`
- **Examples:**
  - `hero-background.jpg`
  - `profile-photo.jpg`
  - `logo.svg`

---

## File Formats

### Recommended Formats by Use Case

| Use Case | Primary Format | Fallback | Notes |
|----------|---------------|----------|-------|
| Photos | WebP | JPG | Use WebP for 30-50% smaller size |
| Graphics/Logos | SVG | PNG | SVG for scalability |
| Icons | SVG | PNG | Inline SVG when possible |
| Screenshots | WebP/PNG | JPG | PNG for text clarity |

### Format Guidelines

- **WebP**: Best for most images (photos, graphics)
- **AVIF**: Future consideration (even smaller than WebP)
- **JPEG**: Fallback for photos, use 80-85% quality
- **PNG**: Logos, icons, images requiring transparency
- **SVG**: Vector graphics, logos, icons

---

## Image Optimization

### Quality Settings
- **WebP:** 80-85 quality
- **JPEG:** 80-85 quality
- **PNG:** Compress with tools like TinyPNG

### Size Guidelines

| Type | Dimensions | Max File Size |
|------|-----------|---------------|
| Cover | 1200x800px | 150KB |
| Gallery | 1920x1080px | 250KB |
| Thumbnail | 600x400px | 50KB |
| Hero | 1920x1080px | 300KB |
| Profile | 400x400px | 50KB |

### Optimization Script

Use the provided optimization script:

```bash
npm run optimize-images
```

This will:
1. Convert images to WebP format
2. Generate multiple sizes for responsive images
3. Compress images to optimal quality
4. Generate thumbnails automatically

---

## Responsive Images

### Using Next.js Image Component

```tsx
import Image from 'next/image';

<Image
  src="/projects/covers/project-slug-cover.jpg"
  alt="Descriptive alt text"
  width={1200}
  height={800}
  priority={false}
  quality={85}
/>
```

### Sizes Attribute

Define appropriate sizes for responsive loading:

```tsx
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
```

---

## Alt Text Guidelines

### Good Alt Text
- Describes the image content
- Provides context
- Avoids "image of" or "picture of"
- Concise (< 125 characters)

### Examples

**Bad:**
```tsx
alt="image"
alt="picture of website"
```

**Good:**
```tsx
alt="E-commerce dashboard showing sales analytics"
alt="Modern minimalist portfolio homepage design"
alt="Mobile app interface with navigation menu"
```

---

## Adding New Project Assets

### Step-by-Step Process

1. **Prepare Images**
   - Cover image (1200x800px)
   - Gallery images (1920x1080px)
   - Thumbnail (600x400px) - optional, can be auto-generated

2. **Name Files**
   ```
   your-project-slug-cover.jpg
   your-project-slug-gallery-1.jpg
   your-project-slug-gallery-2.jpg
   your-project-slug-thumb.jpg
   ```

3. **Place in Directories**
   ```bash
   public/projects/covers/your-project-slug-cover.jpg
   public/projects/gallery/your-project-slug-gallery-1.jpg
   public/projects/gallery/your-project-slug-gallery-2.jpg
   public/projects/thumbnails/your-project-slug-thumb.jpg
   ```

4. **Optimize**
   ```bash
   npm run optimize-images
   ```

5. **Update Project Data**
   - Edit `lib/projects.ts`
   - Add image paths to project object

---

## Performance Best Practices

### 1. Lazy Loading
- Use `loading="lazy"` for below-fold images
- Use `priority` prop only for above-fold images

### 2. Proper Sizing
- Always provide `width` and `height` props
- Prevents layout shift (CLS)

### 3. Format Selection
- Modern browsers: WebP
- Fallback: JPEG/PNG
- Next.js handles this automatically

### 4. CDN & Caching
- Next.js Image component uses built-in optimization
- Configure `next.config.ts` for custom domains

---

## Troubleshooting

### Image Not Loading
1. Check file path and name
2. Verify file exists in `public/` directory
3. Check Next.js Image configuration
4. Clear `.next` cache: `rm -rf .next`

### Image Quality Issues
1. Check source image quality
2. Adjust `quality` prop (default: 75)
3. Verify optimization settings

### Slow Image Loading
1. Check file sizes (use optimization script)
2. Verify image formats (use WebP)
3. Check network throttling
4. Use `priority` for critical images

---

## Tools & Resources

### Image Optimization Tools
- [TinyPNG](https://tinypng.com/) - Online PNG/JPEG compression
- [Squoosh](https://squoosh.app/) - Google's image optimizer
- [ImageOptim](https://imageoptim.com/) - Mac app for image compression
- Sharp (built-in) - Node.js image processing

### Design Tools
- [Figma](https://figma.com/) - Design and export images
- [Photoshop](https://adobe.com/photoshop) - Professional image editing
- [GIMP](https://gimp.org/) - Free alternative to Photoshop

### Testing Tools
- Chrome DevTools - Network tab for image analysis
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance testing
- [WebPageTest](https://webpagetest.org/) - Detailed performance analysis

---

## Checklist

Before committing new images:

- [ ] Images follow naming convention
- [ ] Images are in correct directories
- [ ] Images are optimized (< max file size)
- [ ] WebP format is used where possible
- [ ] Alt text is descriptive and meaningful
- [ ] Width and height are specified
- [ ] Project data is updated in `lib/projects.ts`
- [ ] Images display correctly locally
- [ ] No console warnings about image optimization

---

**Last Updated:** August 27, 2026



