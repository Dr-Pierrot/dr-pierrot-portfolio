# Contributing to Dr-Pierrot Portfolio

Thank you for your interest in contributing to this portfolio project!

## Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher
- Git

### Initial Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Dr-Pierrot/dr-pierrot-portfolio.git
   cd dr-pierrot-portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required values in `.env.local`

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Development Workflow

### Branch Naming
- `feature/` - New features (e.g., `feature/blog-system`)
- `fix/` - Bug fixes (e.g., `fix/contact-form`)
- `docs/` - Documentation (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring
- `chore/` - Maintenance tasks

### Working on a Feature

1. Create branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test locally
4. Commit with descriptive messages
5. Push: `git push origin feature/your-feature-name`
6. Open a Pull Request

## Code Standards

### TypeScript
- Strict mode enabled
- Avoid `any` types
- Use interfaces for object shapes
- Export shared types

### React Components
- Functional components with hooks
- Named exports for components
- Props interface defined above component
- Use `"use client"` directive when needed

### Styling
- TailwindCSS utility classes (primary method)
- CSS variables for theme tokens
- Mobile-first responsive design
- Semantic HTML with ARIA labels

### File Organization
```
app/           # Routes and pages
components/    # React components
lib/           # Utilities and helpers
content/       # MDX articles
data/          # JSON data files
docs/          # Documentation
```

### Naming Conventions
- Components: PascalCase (`ProjectCard.tsx`)
- Utilities: kebab-case (`image-utils.ts`)
- Functions: camelCase (`getProjectBySlug`)
- Constants: UPPER_SNAKE_CASE (`SITE_URL`)

## Commit Guidelines

### Format
```
<type>(<scope>): <subject>
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code refactoring
- `perf` - Performance
- `chore` - Maintenance

### Examples
```bash
feat(blog): add MDX article rendering
fix(contact): validate email format
docs(readme): update setup instructions
```

## Pull Request Process

### Before Submitting
1. Run `npm run type-check`
2. Run `npm run lint`
3. Run `npm run build`
4. Test manually

### PR Template
- What does this PR do?
- Why are these changes needed?
- What was changed?
- How was this tested?

### Checklist
- [ ] Code follows style guidelines
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Build succeeds
- [ ] Tested on mobile/desktop
- [ ] Accessibility verified

## Questions?

- Questions: Open a Discussion
- Bugs: Open an Issue
- Security: Email capulongako16@gmail.com

Thank you for contributing! 🚀
