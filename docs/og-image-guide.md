# OG Image Creation Guide

## Requirements
- **Dimensions**: 1200x630px (1.91:1 aspect ratio)
- **Format**: JPG or PNG
- **File Size**: < 1MB (optimal: 200-300KB)
- **Location**: `/public/og-image.jpg`

## Content Recommendations

### Design Elements
1. **Personal Branding**
   - Name: "VICTOR WILLIAMS" (prominent, bold)
   - Title: "Software Engineer | CTO | Full-Stack Developer"
   - Vaporwave theme colors (pink, purple, blue gradient)

2. **Visual Elements**
   - Philadelphia skyline silhouette (optional)
   - Geometric vaporwave patterns
   - Grid overlay with neon glow
   - Code snippet aesthetic elements

3. **Technical Stack Icons** (optional small section)
   - React, TypeScript, Node.js logos
   - Minimal, not overwhelming

### Typography
- **Primary Font**: Bold, sans-serif (e.g., Montserrat, Inter)
- **Size Hierarchy**:
  - Name: 72-96px
  - Title: 36-48px
  - Subtitle: 24-32px

### Color Palette (Vaporwave Theme)
- Primary: `#FF10F0` (Pink)
- Secondary: `#9D4EDD` (Purple)
- Accent: `#00F5FF` (Cyan/Blue)
- Background: Dark gradient or grid

## Design Tools

### Option 1: Canva (Free)
1. Create 1200x630px custom size
2. Use vaporwave templates or start from scratch
3. Add text, gradients, and elements
4. Download as JPG (high quality)

### Option 2: Figma (Free)
1. Create frame: 1200x630px
2. Design with gradients and text
3. Export as JPG at 2x quality

### Option 3: Online OG Image Generators
- **OG Image Generator**: https://og-image.vercel.app/
- **Social Image Generator**: https://social-image.vercel.app/
- Customize with name, title, and theme

### Option 4: Code (HTML/CSS to Image)
Use services like:
- **htmlcsstoimage.com**
- **screenshot.rocks**
- Create HTML/CSS template and convert to image

## Implementation Checklist

After creating image:
- [ ] Save as `og-image.jpg` in `/public/` directory
- [ ] Verify file size < 1MB
- [ ] Test on social media preview tools:
  - Facebook Debugger: https://developers.facebook.com/tools/debug/
  - Twitter Card Validator: https://cards-dev.twitter.com/validator
  - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- [ ] Update SEO component if using different filename
- [ ] Ensure image loads correctly on deployed site

## Quick Template

If using text-based generator, use this layout:

```
╔═══════════════════════════════════════════════════╗
║                                                   ║
║          VICTOR WILLIAMS                          ║
║     SOFTWARE ENGINEER | CTO                       ║
║                                                   ║
║   Building Modern Web Applications with           ║
║   React • TypeScript • Node.js • Cloud            ║
║                                                   ║
║   🌐 www.vaporjawn.dev                            ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
```

## Testing

After adding image, test social media preview:

1. **Twitter**: Share link and check card preview
2. **LinkedIn**: Share link and verify image displays
3. **Facebook**: Use debugger tool to force refresh
4. **Discord**: Paste link and check embed

## Current SEO Component Reference

The SEO component is already configured to use `/og-image.jpg`:
```typescript
image={image || '/og-image.jpg'}
```

No code changes needed once image is added to `/public/og-image.jpg`.
