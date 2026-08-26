# Content Management Guide

This guide explains how to manage content for projects, blog articles, and resume data.

## Managing Projects

### Location
Projects are defined in `lib/projects.ts`

### Project Structure

```typescript
{
  id: 1,
  slug: "project-slug",
  name: "Project Name",
  dek: "One-line magazine-style description",
  desc: "Short description for cards",
  longDesc: "Detailed description for project page",
  challenge: "Problem statement",
  approach: ["Solution point 1", "Solution point 2"],
  outcome: "Results and impact",
  stack: ["React", "Node.js", "PostgreSQL"],
  link: "https://github.com/username/repo",
  status: "Complete" | "In Progress",
  type: "Fullstack App" | "REST API" | "Frontend",
  role: "Solo full-stack developer",
  highlight: true, // Featured project
  year: 2026,
  features: ["Feature 1", "Feature 2"],
  cover: "/projects/project-slug/cover.jpg",
  gallery: [
    "/projects/project-slug/gallery-1.jpg",
    "/projects/project-slug/gallery-2.jpg",
  ]
}
```

### Adding a New Project

1. **Prepare Assets**
   - Create folder: `public/projects/your-project-slug/`
   - Add cover image: `cover.jpg` (1200x800px recommended)
   - Add gallery images: `gallery-1.jpg`, `gallery-2.jpg`, etc.
   - Optimize images: `npm run optimize-images`

2. **Add Project Entry**
   Open `lib/projects.ts` and add new project object to array

3. **Test Locally**
   ```bash
   npm run dev
   ```
   Visit `/projects/your-project-slug`

### Image Guidelines

- **Cover**: 1200x800px, < 500KB
- **Gallery**: 1600x900px, < 500KB each
- **Format**: JPG for photos, PNG for screenshots
- **Naming**: Use descriptive names

## Managing Blog Articles

### Location
Articles are stored in `content/articles/` as MDX files

### Article Structure

Create: `content/articles/your-article-slug.mdx`

```mdx
---
title: "Your Article Title"
excerpt: "Brief summary for article cards"
publishedAt: "2026-08-26"
updatedAt: "2026-08-27"
status: "published"
category: "technical"
tags: ["nextjs", "typescript", "react"]
readingTime: 5
coverImage: "/blog/your-article-slug/cover.jpg"
author:
  name: "Jaycee Capulong"
  avatar: "/profile.jpg"
---

# Your Article Title

Introduction paragraph...

## Section 1

Content here...
```

### Article Metadata

- **title**: Article title (required)
- **excerpt**: Short summary (required)
- **publishedAt**: ISO date string (required)
- **status**: `"draft"` | `"published"` | `"archived"`
- **category**: `"technical"` | `"case-study"` | `"tutorial"`
- **tags**: Array of tag strings
- **readingTime**: Estimated minutes
- **coverImage**: Path to image (optional)

### Adding an Article

1. Create file: `content/articles/my-article.mdx`
2. Add frontmatter (metadata between `---`)
3. Write content using Markdown/MDX
4. Add cover image (optional)
5. Preview: `npm run dev` → `/blog/my-article`

### MDX Features

**Code blocks:**
````markdown
```typescript
const example: string = "code";
```
````

**Images:** `![Alt text](/path/to/image.jpg)`

**Links:** `[Link text](https://example.com)`

**Lists:**
- Item 1
- Item 2

## Managing Resume Data

### Location
`data/resume.json`

### Structure

```json
{
  "personalInfo": {
    "name": "Jaycee Capulong",
    "title": "Fullstack Developer",
    "email": "capulongako16@gmail.com",
    "github": "https://github.com/Dr-Pierrot"
  },
  "summary": "Brief professional summary...",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "startDate": "2024-01",
      "endDate": "2026-08",
      "description": ["Achievement 1", "Achievement 2"],
      "technologies": ["React", "Node.js"]
    }
  ],
  "skills": [
    {
      "category": "Frontend",
      "skills": ["React", "Next.js", "TypeScript"]
    }
  ]
}
```

### Updating Resume

1. Edit `data/resume.json`
2. Validate JSON syntax
3. Test: Visit `/api/resume`

## Best Practices

### Writing Style
- Clear and concise
- Active voice: "I built" vs "was built"
- Specific metrics: "40% faster"
- Explain technical terms

### SEO Tips
- Unique titles per page
- Meta descriptions: 150-160 chars
- Proper heading hierarchy (H1→H2→H3)
- Descriptive alt text
- Internal links

### Accessibility
- Meaningful alt text
- Don't skip heading levels
- Descriptive link text (not "click here")
- Good color contrast

### Images
1. Resize to appropriate dimensions
2. Compress (TinyPNG, Squoosh)
3. Use WebP when possible
4. Run: `npm run optimize-images`

## Troubleshooting

**Project not appearing**
- Check unique `id`
- Verify `slug` matches folder name
- Ensure in `projects` array

**Blog article 404**
- File in `content/articles/`?
- Slug matches filename?
- Status is `"published"`?

**Images not loading**
- Path starts with `/`?
- File exists in `public/`?
- Run `npm run optimize-images`

**Resume download fails**
- Validate JSON syntax
- Check `/api/resume`
- Verify environment variables

---

**Last Updated:** 2026-08-26
