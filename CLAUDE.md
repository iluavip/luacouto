# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Luana Couto, built with vanilla HTML, CSS, and JavaScript. The site uses Bootstrap 4, jQuery, and various JavaScript plugins for enhanced functionality.

## Technology Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **CSS Framework**: Bootstrap 4
- **JavaScript Libraries**: jQuery 3.3.1, various jQuery plugins (Owl Carousel, Lightbox, ScrollIt, Vegas, Filterizr)
- **Icons**: Font Awesome 4.7.0
- **Hosting**: GitHub Pages (configured with CNAME for luanacouto.com.br)

## Project Structure

```
luacouto/
├── index.html         # Main Portuguese version
├── index_en.html      # English version
├── css/              # Stylesheets and frameworks
│   ├── style.css     # Main custom styles
│   └── custom_fix.css # Additional fixes
├── js/               # JavaScript files
│   └── main.js       # Main application logic
├── img/              # Images and graphics
├── video/            # Video content
└── CNAME            # GitHub Pages custom domain
```

## Development Commands

This is a static website with no build process. To develop locally:

```bash
# Open index.html directly in a browser or use a local server
python -m http.server 8000
# or
npx http-server
```

## Key Files

- **index.html**: Main website (Portuguese version) - Contains SEO meta tags, structured data schemas, and platform links
- **index_en.html**: English version of the site
- **js/main.js**: Contains all custom JavaScript including preloader, scrolling effects, portfolio filtering, and form validation
- **css/style.css**: Main stylesheet with all custom styles
- **css/custom_fix.css**: Additional CSS fixes and customizations
- **manifest.json**: PWA manifest configuration
- **sitemap.xml**: SEO sitemap for search engines
- **robots.txt**: Search engine crawling instructions

## Important Notes

- The site uses multiple jQuery plugins loaded via CDN and local files
- Video content is desynchronized intentionally in main.js for visual effect
- SEO is heavily optimized with multiple schema.org structured data blocks
- The .gitignore file is UTF-16 encoded (should be converted to UTF-8 if editing)
- Site is configured for GitHub Pages deployment with custom domain