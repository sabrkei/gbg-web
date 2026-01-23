# GBG-Web Portfolio

A modern, responsive portfolio website for Scott, a front-end developer and designer based in Gothenburg, Sweden.

## Overview

This is a single-page portfolio application built with Vue 3, featuring smooth scroll-snap navigation, theme switching, and interactive 3D animations.

## Tech Stack

- **Vue 3** - Reactive UI framework (via CDN, production build)
- **Formspree** - Contact form handling
- **CSS3** - Custom styling with CSS variables for theming
- **Font Awesome 6** - Icon library
- **Google Fonts** - Lora & Montserrat typefaces

## Features

- **Bento Grid Portfolio** - Modern asymmetric tile layout with 3D tilt effects
- Full-viewport scroll-snap sections
- Dark/Light theme toggle with smooth CSS transitions
- Auto-hiding header on scroll with hover reveal
- Looping background videos
- Interactive project cards with mouse-tracking 3D transforms
- Fully responsive design (mobile-first)
- Functional contact form via Formspree
- Native PDF CV viewer (no third-party dependencies)
- Section fade-in animations on scroll

## Performance Optimizations

- **LCP Optimized**: Hero poster preloaded with `fetchpriority="high"`
- **Lazy Loading**: Below-fold images use `loading="lazy"` and `decoding="async"`
- **Font Loading**: Google Fonts loaded asynchronously with print media swap
- **No Third-Party Cookies**: Native PDF embed instead of Google Docs viewer
- **Minimal Dependencies**: Only essential external resources
- **WebP Images**: All images in modern WebP format
- **Deferred Scripts**: Vue and app scripts use `defer` attribute
- **Preconnect**: Critical external domains preconnected

## Project Structure

```
├── index.html          # Main HTML file with Vue app
├── style.css           # All styles with CSS variables
├── script.js           # Vue 3 application logic
├── .gitignore          # Git ignore rules
├── README.md           # This file
├── robots.txt          # SEO crawler directives
├── sitemap.xml         # SEO sitemap
├── CNAME               # GitHub Pages custom domain
│
├── images/             # All image assets (WebP format)
│   ├── gbg-web.webp
│   ├── profilephoto.webp
│   ├── hero-poster.webp
│   ├── thedailygrindlogo.webp
│   ├── unitedbysound.webp
│   ├── footballstatshublogo.webp
│   ├── nyds.webp
│   └── locksafe_cinema-1.webp
│
├── videos/
│   ├── hero.mp4        # Hero section background video
│   └── family.mp4      # About section video
│
├── audio/
│   └── switch.mp3      # Theme toggle sound effect
│
└── assets/
    └── SAKCV.pdf       # Resume/CV document
```

## Sections

1. **Hero** - Full-screen video background with animated logo
2. **Portfolio** - Bento grid personal projects showcase
3. **Customer Projects** - Bento grid client work showcase
4. **Skills** - Technical skillset icons + embedded CV viewer
5. **About Me** - Personal story with looping family video
6. **Contact** - Split-layout contact form and social links

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No build step required - all dependencies loaded via CDN

### Contact Form Setup

The contact form uses [Formspree](https://formspree.io) for handling submissions:
1. Create a free account at formspree.io
2. Create a new form and copy the endpoint
3. Update the `FORMSPREE_ENDPOINT` in `script.js`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Theme Colors

Edit CSS variables in `style.css`:

```css
:root {
  --color-accent: #0056b3;  /* Royal Blue accent (dark theme) */
  --bg-dark: #0f172a;       /* Deep Slate background */
  --bg-light: #e2e8f0;      /* Slate 200 background */
}

[data-theme="light"] {
  --color-accent: #81c784;  /* Soft Green accent (light theme) */
  --bg-light: #000000;      /* Black background */
}
```

### Adding Projects

Edit the `projects` or `customerProjects` arrays in `script.js`:

```javascript
{
  title: "Project Name",
  description: "Brief project description.",
  image: "images/project-image.webp",
  link: "https://github.com/..."
}
```

## SEO Features

- Meta description and keywords
- Open Graph tags for social sharing
- Twitter Card meta tags
- JSON-LD structured data (Person schema)
- Semantic HTML with ARIA labels
- robots.txt & sitemap.xml
- Canonical URL

## Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators for keyboard users
- Reduced motion support via `prefers-reduced-motion`
- Minimum tap target sizes (48px)
- Screen reader optimized with `.sr-only` class

## Contact

- Email: contact@gbg-web.com
- Website: [gbg-web.com](https://gbg-web.com)
- LinkedIn: [scottabrahamkeinstrom](https://www.linkedin.com/in/scottabrahamkeinstrom/)
- GitHub: [sabrkei](https://github.com/sabrkei)

## License

All rights reserved.
