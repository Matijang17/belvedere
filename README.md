# 123 Hiška Website

A modern, responsive website for 123 Hiška - a premium interior design, carpentry, and construction company based in Slovenia.

## Features

### Design & User Experience
- **Modern 2025 Design Trends**: Incorporates nature-distilled aesthetics, tactile maximalism, and exaggerated hierarchy
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Animations**: Smooth scroll animations, hover effects, and micro-interactions
- **High-Quality Imagery**: Professional interior design and construction photography
- **Intuitive Navigation**: Smooth scrolling single-page design with fixed navigation

### Technical Features
- **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- **Progressive Web App (PWA)**: Offline capabilities and app-like experience
- **Performance Optimized**: Lazy loading, optimized images, and efficient CSS/JS
- **Accessibility**: WCAG compliant design with proper semantic HTML
- **Cross-Browser Compatible**: Works on all modern browsers

### Sections
1. **Hero Section**: Full-screen background with compelling headline and CTAs
2. **About Section**: Company introduction and philosophy
3. **Services Section**: Four main service categories with visual cards
4. **Projects Section**: Portfolio showcase with hover effects
5. **Contact Section**: Contact form and company information
6. **Footer**: Additional links and company details

## File Structure

```
123hiska-website/
├── index.html                 # Main HTML file
├── manifest.json             # PWA manifest
├── robots.txt               # Search engine directives
├── sitemap.xml              # XML sitemap for SEO
├── sw.js                    # Service worker for PWA
├── structured-data.json     # JSON-LD structured data
├── css/
│   ├── styles.css          # Main stylesheet
│   └── animations.css      # Animation effects
├── js/
│   └── main.js            # JavaScript functionality
├── assets/
│   └── images/            # Image assets
│       ├── hero-background.jpg
│       ├── kitchen-modern.jpg
│       ├── bathroom-luxury.jpg
│       ├── living-space.jpg
│       ├── construction-work.jpg
│       ├── luxury-interior.webp
│       ├── modern-architecture.webp
│       ├── renovation-1.jpg
│       ├── renovation-2.jpg
│       └── hero-interior.jpg
└── fonts/                 # Custom fonts (if needed)
```

## Customization Guide

### Colors
The website uses CSS custom properties (variables) for easy color customization. Edit the `:root` section in `css/styles.css`:

```css
:root {
    --primary-color: #8B7355;    /* Mocha Mousse */
    --secondary-color: #2C2C2C;  /* Charcoal */
    --accent-color: #D4A574;     /* Warm Gold */
    --text-primary: #2C2C2C;
    --text-secondary: #6B6B6B;
    --text-light: #FFFFFF;
    --background-light: #FAFAFA;
    --background-dark: #1A1A1A;
}
```

### Typography
Fonts can be changed by updating the Google Fonts import in `index.html` and the CSS variables:

```css
:root {
    --font-primary: 'Inter', sans-serif;
    --font-display: 'Playfair Display', serif;
}
```

### Content Updates

#### Company Information
Update company details in multiple locations:
1. `index.html` - Contact section and footer
2. `structured-data.json` - Structured data for SEO
3. `manifest.json` - PWA information

#### Services
Modify the services section in `index.html`:
- Update service titles and descriptions
- Replace service images in `assets/images/`
- Adjust service numbers if adding/removing services

#### Images
Replace images in the `assets/images/` folder:
- Maintain similar aspect ratios for best results
- Optimize images for web (WebP format recommended)
- Update image paths in HTML if filenames change

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding CSS styles in `css/styles.css`
3. Update navigation links if needed
4. Add scroll animations in `js/main.js`

### SEO Customization
1. **Meta Tags**: Update title, description, and keywords in `index.html`
2. **Structured Data**: Modify `structured-data.json` with accurate business information
3. **Sitemap**: Update `sitemap.xml` with new pages or sections
4. **Open Graph**: Update social media preview information in HTML head

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Optimization
- Images are lazy-loaded for faster initial page load
- CSS and JavaScript are minified for production
- Service worker caches resources for offline access
- Critical CSS is inlined for faster rendering

## Deployment
1. Upload all files to your web server
2. Ensure proper MIME types are set for all file extensions
3. Configure HTTPS for PWA functionality
4. Test all functionality across different devices and browsers

## Maintenance
- Regularly update project images in the portfolio section
- Keep contact information current
- Monitor and update SEO meta tags as needed
- Update structured data with new services or information

## Support
For technical support or customization requests, contact the development team or refer to the documentation provided with this project.

---

**Built with modern web technologies and 2025 design trends for 123 Hiška**
# belvedere
