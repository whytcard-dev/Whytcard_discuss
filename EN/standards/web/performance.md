# Web Performance Standards

## Performance Goals

- Lighthouse score: 90+ for all metrics
- Core Web Vitals targets:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
  - INP (Interaction to Next Paint): < 200ms
- Time to Interactive: < 3s
- First Contentful Paint: < 1.8s
- Total page weight: < 1MB (ideally < 500KB)
- HTTP requests: < 50 per page

## Image Optimization

- Use WebP/AVIF formats with fallbacks for older browsers
- Implement responsive images with `srcset` and `sizes` attributes
- Lazy load images below the fold
- Properly size images (avoid serving large images scaled down via CSS)
- Use image CDN for dynamic resizing when possible
- Optimize SVGs and remove unnecessary metadata
- Compress all images with tools like ImageOptim, TinyPNG, or Squoosh
- Consider blur-up technique for progressive loading

## JavaScript Optimization

- Implement code splitting and dynamic imports
- Defer non-critical JavaScript
- Use tree-shaking to eliminate dead code
- Minify and compress JavaScript files
- Avoid render-blocking JavaScript
- Use web workers for CPU-intensive tasks
- Implement request prioritization
- Optimize third-party scripts and use async/defer attributes

## CSS Optimization

- Minimize and inline critical CSS
- Remove unused CSS with tools like PurgeCSS
- Avoid CSS imports (use concatenation instead)
- Use CSS containment for independent components
- Optimize CSS selectors for performance
- Consider CSS-in-JS performance implications
- Use CSS variables for better maintainability
- Implement CSS code splitting for large applications

## Font Optimization

- Use system fonts when possible
- Implement font-display: swap or optional
- Subset fonts to include only necessary characters
- Self-host fonts instead of using third-party services
- Preload critical fonts
- Use variable fonts for multiple weights/styles
- Limit font variations (weights, styles)

## Caching Strategy

- Implement effective cache policies
  - Long cache for static assets (1 year+)
  - Short/no cache for HTML
- Use versioned file names or query strings for cache busting
- Implement service workers for offline support
- Use localStorage/IndexedDB for client-side caching
- Configure HTTP cache headers properly
- Implement CDN caching

## Server Optimization

- Enable HTTP/2 or HTTP/3
- Implement server-side compression (Brotli/Gzip)
- Use CDN for global content delivery
- Optimize API responses (pagination, field selection)
- Implement edge computing for dynamic content
- Configure proper CORS settings
- Optimize Time to First Byte (TTFB)
- Use HTTP preconnect, prefetch, and preload hints

## Mobile Optimization

- Prioritize mobile performance (mobile-first approach)
- Optimize touch targets (min 44×44px)
- Reduce network payload for mobile devices
- Implement responsive design patterns
- Test on actual mobile devices, not just emulators
- Consider reduced motion for animations
- Optimize for offline/poor connectivity scenarios

## Monitoring & Testing

- Implement Real User Monitoring (RUM)
- Set up synthetic monitoring for critical user flows
- Use WebPageTest for detailed performance analysis
- Monitor Core Web Vitals in Google Search Console
- Set up performance budgets and alerts
- Conduct regular performance audits
- Implement A/B testing for performance improvements
- Use Chrome DevTools Performance panel for profiling

## Advanced Techniques

- Implement resource hints (preconnect, preload, prefetch)
- Use intersection observer for lazy loading
- Consider server-side rendering or static site generation
- Implement stale-while-revalidate pattern
- Use requestIdleCallback for non-critical tasks
- Consider import maps for module loading
- Implement predictive prefetching based on user behavior
- Use priority hints for critical resources 