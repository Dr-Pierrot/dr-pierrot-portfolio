# Deployment Guide

This document provides instructions for deploying the Dr-Pierrot portfolio to production.

## Deployment Platforms

### Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   ```
   RESEND_API_KEY=your_production_api_key
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Deploy** - Vercel will automatically build and deploy

#### Automatic Deployments
- **Production**: Pushes to `main` branch auto-deploy
- **Preview**: Pull requests get preview URLs

## Pre-Deployment Checklist

### Content Review
- [ ] All project entries complete
- [ ] Images optimized and uploaded
- [ ] Resume data current
- [ ] Blog articles proofread
- [ ] Contact form tested

### Environment Variables
- [ ] `.env.example` complete
- [ ] Production API keys obtained
- [ ] Google Analytics configured
- [ ] No secrets in git

### Performance
- [ ] `npm run build` succeeds
- [ ] Images < 500KB
- [ ] Lighthouse score ≥90

### SEO
- [ ] Unique titles on all pages
- [ ] Meta descriptions present
- [ ] Sitemap generates correctly
- [ ] Structured data validates

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast passes
- [ ] ARIA labels present

### Security
- [ ] No API keys in client code
- [ ] Rate limiting enabled
- [ ] Security headers configured

## Build Commands

```bash
npm run type-check  # Type check
npm run lint        # Lint code
npm run build       # Build for production
npm run start       # Test production build
npm run analyze     # Analyze bundle
```

## Post-Deployment

### 1. DNS Configuration
Add DNS records for custom domain:
```
Type: A, Name: @, Value: 76.76.19.19
Type: CNAME, Name: www, Value: cname.vercel-dns.com
```

### 2. Submit Sitemap
- Google Search Console: Submit sitemap.xml
- Bing Webmaster Tools: Submit sitemap

### 3. Test Production
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Projects render
- [ ] Contact form submits
- [ ] Resume downloads
- [ ] Mobile responsive

## Rollback

If issues occur:
1. Go to Vercel Deployments tab
2. Find previous working deployment
3. Click "Promote to Production"

Or manually:
```bash
git revert <commit-hash>
git push origin main
```

## Troubleshooting

**Build fails with TypeScript errors**
```bash
npm run type-check
# Fix errors, then rebuild
```

**Images not loading**
- Check `next.config.ts` image configuration
- Verify image domains whitelisted

**API routes fail**
- Verify API keys in Vercel dashboard
- Test with Postman/curl first

**Slow performance**
```bash
npm run analyze
# Review bundle, lazy load heavy components
```

## Monitoring

### Key Metrics
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Page views
- Form submissions

### Tools
- Vercel Analytics
- Google Analytics 4
- Google Search Console
- Lighthouse

## Maintenance Schedule

**Weekly**
- Check analytics
- Review error logs
- Test contact form

**Monthly**
- Update dependencies
- Check broken links
- Verify SSL certificate

**Quarterly**
- Performance audit
- Security audit
- Content refresh

---

**Last Updated:** 2026-08-26
