# Carlos Linares — Developer Portfolio

A modern, responsive developer portfolio for Carlos Linares, Full Stack Developer and Development Analyst based in the Dominican Republic. It presents professional experience, selected work and live public GitHub data in a focused dark interface.

## Live Portfolio

https://portafolio-vue-xi.vercel.app/

Repository: https://github.com/KarlangaXZ/Portafolio-VUE

## Stack

- Vue 3
- TypeScript
- Vite
- GitHub REST API
- CSS

## Features

- Responsive portfolio layout
- Curated featured projects
- GitHub repository explorer with search, language filters and sorting
- GitHub language analytics with limited concurrency and graceful fallback
- Dynamic GitHub repository, language, star and fork statistics
- Contact section with accessible frontend validation
- Keyboard and focus accessibility considerations
- Reduced motion support
- SEO, Open Graph and social preview metadata

## Portfolio Sections

- About
- Services
- Tech Stack
- Professional Experience
- Featured Projects
- GitHub Explorer
- GitHub Analytics
- Contact

## Production Readiness

- Strict TypeScript validation
- Verified Vite production build
- Graceful GitHub API and rate-limit fallback
- Responsive layouts for mobile, tablet and desktop
- Keyboard, focus and reduced-motion considerations
- SEO, Open Graph and Twitter metadata
- Local favicon and 1200 × 630 social preview asset

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run type-check
npm run build
```

## GitHub Integration

The portfolio uses the public GitHub REST API to load repositories and language data for `KarlangaXZ`. Requests are made without a token or embedded credentials. Repository and language responses are cached in `sessionStorage` for ten minutes, and detailed language requests use limited concurrency to respect the public API rate limit.

## Deployment

The portfolio is deployed on Vercel and connected to the GitHub repository for automatic deployments.

Remaining content improvement:

- Add verified screenshots for featured projects when they become available.
