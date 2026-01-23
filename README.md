# GBG-Web Portfolio

A modern, responsive portfolio website for Scott, a front-end developer and designer based in Gothenburg, Sweden.

## Overview

This is a single-page portfolio application built with Vue 3, featuring smooth scroll-snap navigation, theme switching, and interactive animations.

## Tech Stack

- **Vue 3** - Reactive UI framework (via CDN)
- **Formspree** - Contact form handling
- **CSS3** - Custom styling with CSS variables for theming
- **Font Awesome 6** - Icon library
- **Devicon** - Technology stack icons
- **Google Fonts** - Lora & Montserrat typefaces

## Features

- Full-viewport scroll-snap sections
- Dark/Light theme toggle with CSS variables
- Auto-hiding header on scroll with hover reveal
- CSS-animated photo mosaic
- Horizontal scrolling project cards
- Responsive design
- Functional contact form via Formspree
- Embedded CV/resume viewer

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
│   ├── familyphoto.webp
│   ├── thedailygrind.webp
│   ├── thedailygrindlogo.webp
│   ├── unitedbysound.webp
│   ├── footballstatshublogo.webp
│   ├── nyds.webp
│   └── locksafe_cinema-1.webp
│
├── videos/
│   └── hero.mp4        # Hero section video
│
├── audio/
│   └── switch.mp3      # Theme toggle sound
│
└── assets/
    └── SAKCV.pdf       # Resume/CV document
```

## Sections

1. **Hero** - Full-screen video background with title
2. **Portfolio** - Personal projects showcase
3. **Customer Projects** - Client work showcase
4. **Skills** - Technical skillset icons + CV viewer
5. **About Me** - Personal story with a CSS photo mosaic animation
6. **Contact** - Contact form and social links

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No build step required - all dependencies loaded via CDN

The contact form uses [Formspree](https://formspree.io) for handling submissions. To use your own form:
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
  --card-bg: #ffffff;       /* Card backgrounds */
  --text-dim: #4b5563;      /* Dimmed text color */
}

[data-theme="light"] {
  --color-accent: #81c784;  /* Soft Green accent (light theme) */
  --bg-light: #000000;      /* Black background */
  --card-bg: #1a221e;       /* Dark green-grey cards */
}
```

### Adding Projects

Edit `script.js` and add to the `projects` or `customerProjects` arrays:

```javascript
{
  title: "Project Name",
  description: "Project description.",
  image: "project-image.png",
  link: "https://github.com/..."
}
```

## SEO

The site includes:
- Meta description and keywords
- Open Graph tags for social sharing
- Twitter Card meta tags
- JSON-LD structured data
- Semantic HTML with ARIA labels
- robots.txt & sitemap.xml
- Canonical URL

## Performance Notes

- **Lazy Loading**: Images below the fold use `loading="lazy"`
- **Video Optimization**: Hero video includes a WebP poster image for instant LCP
- **Vue Production**: Uses the production build of Vue 3 for smaller bundle size
- **Modern Formats**: Images use WebP
- External resources preconnected for faster loading

## Contact

- Email: contact@gbg-web.com
- Website: [gbg-web.com](https://gbg-web.com)

## License

All rights reserved.
