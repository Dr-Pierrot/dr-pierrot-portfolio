# Dr-Pierrot Portfolio

A modern, production-grade portfolio website showcasing fullstack development projects, built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

🔗 **Live Site:** [Your Portfolio URL]  
👤 **Developer:** Jaycee Capulong  
📧 **Contact:** capulongako16@gmail.com

## Features

✨ **Project Showcase**
- Interactive filtering by technology, type, and status
- Case study format with challenge/approach/outcome structure
- Project gallery with optimized images
- Featured project highlighting

🎨 **Modern Design**
- Dark/light theme with system preference detection
- Responsive mobile-first design
- Smooth animations with Framer Motion
- Clean, accessible UI components

📧 **Contact Integration**
- Working contact form with Resend email delivery
- Form validation and error handling
- Success/error state management

🚀 **Performance & SEO**
- Server-side rendering and static generation
- Optimized images and lazy loading
- Meta tags and Open Graph support
- Sitemap and robots.txt
- Fast page loads and Core Web Vitals optimized

## Tech Stack

- **Framework:** Next.js 15.0.3 (App Router)
- **React:** 19.0.0-rc
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Email:** Resend
- **Deployment:** Vercel

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dr-Pierrot/dr-pierrot-portfolio.git
   cd dr-pierrot-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables to `.env.local`:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Project Structure

```
dr-pierrot-portfolio/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── projects/          # Project pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Project.tsx
│   └── ...
├── lib/                   # Utilities and helpers
│   ├── projects.ts        # Project data
│   ├── theme.ts          # Theme utilities
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   └── projects/         # Project images
├── docs/                 # Documentation
│   ├── CONTRIBUTING.md
│   ├── DEPLOYMENT.md
│   └── CONTENT.md
└── ...
```

## Documentation

- **[Contributing Guide](docs/CONTRIBUTING.md)** - How to contribute to this project
- **[Deployment Guide](docs/DEPLOYMENT.md)** - How to deploy to production
- **[Content Management](docs/CONTENT.md)** - How to manage projects and content
- **[Changelog](CHANGELOG.md)** - Version history and changes

## Adding Content

### Adding a Project

1. Add project data to `lib/projects.ts`
2. Add project images to `public/projects/[slug]/`
3. See [Content Management Guide](docs/CONTENT.md) for details

### Managing Content

All content management instructions are available in the [Content Guide](docs/CONTENT.md).

## Environment Variables

Required environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Resend API key for contact form | Yes |
| `NEXT_PUBLIC_SITE_URL` | Full site URL | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | No |

See `.env.example` for full list.

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

See [Deployment Guide](docs/DEPLOYMENT.md) for detailed instructions.

## Performance

- **Lighthouse Score:** 90+
- **Core Web Vitals:** Optimized
- **Image Optimization:** Automatic with Next.js Image
- **Code Splitting:** Automatic with App Router

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

Contributions are welcome! Please read the [Contributing Guide](docs/CONTRIBUTING.md) first.

## License

This project is private and proprietary.

## Contact

**Jaycee Capulong**
- Email: capulongako16@gmail.com
- GitHub: [@Dr-Pierrot](https://github.com/Dr-Pierrot)
- LinkedIn: [Jaycee Capulong](https://ph.linkedin.com/in/jaycee-capulong-9a37922b9)

---

Built with ❤️ using Next.js and TypeScript
