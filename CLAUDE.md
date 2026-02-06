# Personal Blog

## Overview
A minimal personal blog and professional/musical portfolio. Built with Astro (static site generation), Tailwind CSS, deployed on GitHub Pages.

## Architecture
- Static site generator: Astro with content collections
- Styling: Tailwind CSS with automatic light/dark mode (prefers-color-scheme)
- Posts: Markdown files in src/content/blog/
- No backend, no JavaScript frameworks — pure Astro components
- Deploy target: GitHub Pages

## Pages
- `/` — Main page listing all blog posts (sorted by date, newest first)
- `/about` — About page with two sections: professional journey and music journey
- `/blog/[slug]` — Individual blog post pages (dynamic routes from markdown)

## Design Principles
- Minimalism above all: sparse layout, lots of whitespace, limited color palette
- Accessibility first: semantic HTML, proper heading hierarchy, ARIA labels, skip links, sufficient contrast ratios (WCAG AA minimum)
- Automatic dark/light mode via prefers-color-scheme (no toggle needed)
- No JavaScript unless absolutely necessary
- Mobile-first responsive design

## Content
Blog posts are markdown files with frontmatter (title, date, description, tags).

## Code Conventions
- Use Astro components (.astro files), avoid framework components
- Tailwind only for styling, no custom CSS unless necessary
- Keep component count minimal
- Use pnpm as the package manager
- Comment all code extensively with short, concise comments

## Workflow
- Before implementing any task, explain what you're going to do and which files you'll change. Only start changing files after getting approval.

## Testing
- E2E tests use Playwright, located in tests/
