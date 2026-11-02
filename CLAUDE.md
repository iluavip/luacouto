# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Luana Couto, built with vanilla HTML, CSS, and JavaScript. The main pages use a custom design system (`css/site.css`, `js/site.js`); older pages still use Bootstrap 4 and jQuery plugins.

## Technology Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Main pages** (`index.html`, `index_en.html`, `privacy.html`): `css/site.css` + `js/site.js` — no framework, no jQuery. Fonts: Cormorant Garamond + Montserrat (Google Fonts). Icons are inline SVG.
- **Legacy pages** (other `.html` files): Bootstrap 4, jQuery 3.3.1 and jQuery plugins (Owl Carousel, Lightbox, ScrollIt, Vegas, Filterizr), Font Awesome 4.7.0, `css/style.css`, `js/main.js`
- **Hosting**: GitHub Pages (configured with CNAME for luanacouto.com.br)

## Project Structure

```
luacouto/
├── index.html         # Main Portuguese version
├── index_en.html      # English version
├── css/              # Stylesheets and frameworks
│   ├── site.css      # Design system of the main pages (tokens in :root)
│   ├── style.css     # Legacy styles (other pages)
│   └── custom_fix.css # Legacy fixes
├── js/               # JavaScript files
│   ├── site.js       # Main pages: animations, menu, tabs, gallery, lightbox, hero videos
│   └── main.js       # Legacy logic (other pages)
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
- **js/site.js**: Preloader, triple hero video (offsets + resume logic), scroll reveal (`data-reveal`), count-up (`data-count`), stats tabs, gallery filter + lightbox, card tilt (`data-tilt`), magnetic buttons (`data-magnetic`), GA4 click tracking (`data-track`)
- **css/site.css**: Design tokens and all styles for the main pages; respects `prefers-reduced-motion`
- **js/main.js / css/style.css / css/custom_fix.css**: Legacy, used only by the older pages
- **manifest.json**: PWA manifest configuration
- **sitemap.xml**: SEO sitemap for search engines
- **robots.txt**: Search engine crawling instructions

## Important Notes

- Legacy pages use multiple jQuery plugins loaded via CDN and local files; the main pages have no third-party JS besides GA4
- Hero video: the 3 columns are desynchronized on purpose (start at 0s/5s/9s). On the main pages the video is downloaded ONCE (fetch started inline in <head> as `window.__heroVideo`, then shared as a Blob URL by site.js) — Chrome would otherwise download it 3x. Over file:// it falls back to direct `src` + `#t=` fragments. Posters `img/hero-poster-mobile-*.webp` are the matching frames.
- `index.html` and `index_en.html` share the same markup; when changing one, mirror the change in the other
- SEO is heavily optimized with multiple schema.org structured data blocks
- The .gitignore file is UTF-16 encoded (should be converted to UTF-8 if editing)
- Site is configured for GitHub Pages deployment with custom domain