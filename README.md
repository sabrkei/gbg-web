# GBG-Web Portfolio

A modern, responsive portfolio website for Scott, a front-end developer and designer based in Gothenburg, Sweden.

## Overview

This is a single-page portfolio application built with Vue 3, featuring smooth scroll-snap navigation, theme switching, and interactive animations.

## Tech Stack

- **Vue 3** - Reactive UI framework (via CDN)
- **CSS3** - Custom styling with CSS variables for theming
- **Font Awesome 6** - Icon library
- **Devicon** - Technology stack icons
- **Lottie Animations** - Interactive animations
- **Google Fonts** - Lora & Montserrat typefaces

## Features

- Full-viewport scroll-snap sections
- Dark/Light theme toggle with CSS variables
- Auto-hiding header on scroll with hover reveal
- Animated Lottie illustration
- Horizontal scrolling project cards
- Responsive design
- Contact form
- Embedded CV/resume viewer

## Project Structure

```
├── index.html          # Main HTML file with Vue app
├── style.css           # All styles with CSS variables
├── script.js           # Vue 3 application logic
├── README.md           # This file
├── robots.txt          # SEO crawler directives
├── sitemap.xml         # SEO sitemap
│
├── Assets
│   ├── gbg-web.png             # Site logo
│   ├── profilephoto.png        # Profile image
│   ├── hero-bg.mp4             # Hero section video
│   ├── SAKCV.pdf               # Resume/CV document
│   ├── Lego.lottie             # Lottie animation file
│   │
│   └── Project Images
│       ├── thedailygrindlogo.webp
│       ├── thedailygrind.png
│       ├── unitedbysound.png
│       ├── footballstatshublogo.png
│       └── nyds.png
```

## Sections

1. **Hero** - Full-screen video background with title
2. **About Me** - Personal story with Lottie animation
3. **Portfolio** - Personal projects showcase
4. **Customer Projects** - Client work showcase
5. **Skills** - Technical skillset icons + CV viewer
6. **Contact** - Contact form and social links

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No build step required - all dependencies loaded via CDN

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
  --color-accent: #90ee90;  /* Main accent color */
  --bg-dark: #000000;       /* Dark theme background */
  --bg-light: #1a2e1a;      /* Light theme background */
  --card-bg: #111111;       /* Card backgrounds */
  --text-dim: #aaa;         /* Dimmed text color */
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
