# Deployment Guide for 123 Hiška Website

## Quick Start

The website is ready for deployment to any web server. All files are contained in the `123hiska-website` folder and can be uploaded directly to your hosting provider.

## File Structure Overview

```
123hiska-website/
├── index.html              # Main website file
├── manifest.json           # PWA manifest
├── robots.txt             # SEO directives
├── sitemap.xml            # Search engine sitemap
├── sw.js                  # Service worker
├── css/                   # Stylesheets
├── js/                    # JavaScript files
├── assets/images/         # Image assets
└── README.md              # Documentation
```

## Deployment Options

### 1. Traditional Web Hosting
1. Upload all files to your web server's public directory
2. Ensure proper file permissions (644 for files, 755 for directories)
3. Configure HTTPS for PWA functionality

### 2. Static Site Hosting (Recommended)
- **Netlify**: Drag and drop the folder or connect to Git
- **Vercel**: Deploy directly from folder or Git repository
- **GitHub Pages**: Push to repository and enable Pages
- **AWS S3**: Upload files and configure static website hosting

### 3. CDN Deployment
- **Cloudflare Pages**: Connect repository or upload files
- **AWS CloudFront**: Use with S3 for global distribution

## Pre-Deployment Checklist

### Content Updates
- [ ] Update company contact information
- [ ] Replace placeholder phone number
- [ ] Add real project images
- [ ] Update meta descriptions and titles
- [ ] Verify all links work correctly

### SEO Configuration
- [ ] Update `sitemap.xml` with correct domain
- [ ] Modify `robots.txt` if needed
- [ ] Update structured data in `index.html`
- [ ] Set up Google Analytics (optional)
- [ ] Configure Google Search Console

### Performance Optimization
- [ ] Compress images (WebP format recommended)
- [ ] Minify CSS and JavaScript for production
- [ ] Enable gzip compression on server
- [ ] Set up proper caching headers

### PWA Setup
- [ ] Generate proper favicon and app icons
- [ ] Test service worker functionality
- [ ] Verify manifest.json settings
- [ ] Test offline functionality

## Domain Configuration

### DNS Settings
Point your domain to your hosting provider:
- **A Record**: Point to server IP address
- **CNAME**: Point www subdomain to main domain
- **SSL Certificate**: Enable HTTPS (required for PWA)

### Recommended Settings
```
Type: A
Name: @
Value: [Your server IP]

Type: CNAME  
Name: www
Value: yourdomain.com
```

## Server Configuration

### Apache (.htaccess)
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
</IfModule>

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
```

### Nginx
```nginx
# Compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

# Cache static assets
location ~* \.(css|js|png|jpg|jpeg|webp|svg|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Security headers
add_header X-Content-Type-Options nosniff;
add_header X-Frame-Options DENY;
add_header X-XSS-Protection "1; mode=block";
```

## Testing After Deployment

### Functionality Tests
- [ ] Navigation works on all devices
- [ ] Contact form submits correctly
- [ ] All images load properly
- [ ] Responsive design works on mobile/tablet
- [ ] Smooth scrolling functions correctly

### Performance Tests
- [ ] Page load speed (aim for <3 seconds)
- [ ] Mobile performance score
- [ ] Core Web Vitals metrics
- [ ] Image optimization effectiveness

### SEO Tests
- [ ] Meta tags display correctly in search results
- [ ] Structured data validates (use Google's Rich Results Test)
- [ ] Sitemap submits to Google Search Console
- [ ] Social media previews work correctly

### PWA Tests
- [ ] Service worker registers successfully
- [ ] Offline functionality works
- [ ] App can be installed on mobile devices
- [ ] Manifest file loads correctly

## Monitoring and Maintenance

### Analytics Setup
1. Add Google Analytics tracking code
2. Set up Google Search Console
3. Monitor Core Web Vitals
4. Track conversion goals

### Regular Updates
- Update project portfolio regularly
- Keep contact information current
- Monitor and fix broken links
- Update dependencies as needed

### Backup Strategy
- Regular file backups
- Database backups (if applicable)
- Version control with Git
- Automated backup scheduling

## Troubleshooting

### Common Issues
1. **Images not loading**: Check file paths and permissions
2. **CSS not applying**: Verify file paths and MIME types
3. **JavaScript errors**: Check browser console for errors
4. **PWA not working**: Ensure HTTPS is enabled
5. **Form not submitting**: Configure server-side form handling

### Support Resources
- Browser developer tools for debugging
- Google PageSpeed Insights for performance
- W3C Validator for HTML validation
- Google Search Console for SEO issues

## Security Considerations

### Best Practices
- Keep server software updated
- Use strong passwords for hosting accounts
- Enable two-factor authentication
- Regular security scans
- Monitor for suspicious activity

### SSL Certificate
- Required for PWA functionality
- Improves SEO rankings
- Builds user trust
- Most hosting providers offer free SSL

---

**Ready to launch your 123 Hiška website!**

For additional support or customization needs, refer to the README.md file or contact your development team.
