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
- `/about` — About page with a visual timeline of life events (see About Page section below)
- `/blog/[slug]` — Individual blog post pages (dynamic routes from markdown)

## About Page

The about page is a single vertical timeline that interleaves professional and musical milestones in chronological order.

### Timeline layout
- Each entry is a horizontal row: photo on the left, story on the right
- Below the photo, show the month and year (e.g. "Sep 2012")
- A vertical dashed line connects all entries top to bottom, running between the photo column and the story column
- The line is continuous and segmented (dashed/dotted), connecting each entry to the next
- The line starts at the first entry and ends at the last entry
- On mobile, the timeline stacks vertically: photo and date on top, story below, dashed line runs along the left edge

### Timeline entries
Each entry contains:
- A square or rounded photo (small, thumbnail-sized, consistent dimensions across all entries)
- A date label below the photo (month + year)
- A short story paragraph on the right (2–4 sentences max)
- Photos are static assets stored in src/assets/timeline/ (use placeholder images during development)

### Timeline footer
After the last entry, below the dashed line, a short closing sentence with a mailto: link. Something like: "That's the story so far. Want to talk? [Get in touch](mailto:EMAIL)." — style it centered, slightly muted, same minimal tone as the rest of the site.

### Accessibility
- Each photo must have descriptive alt text
- The timeline should use an `<ol>` (ordered list) with `role="list"` for the semantic structure, with CSS removing default list styling
- Date labels use `<time>` elements with datetime attributes
- The dashed connecting line is purely decorative (CSS pseudo-elements or border, not an image)
- The mailto link must be clearly identifiable as a link

### Styling
- Keep it minimal: no cards, no shadows, no background colors on entries
- The dashed line should be thin and subtle (1px, muted gray, adapts to dark mode)
- Photos should have a subtle border or slight rounding, nothing heavy
- Generous vertical spacing between entries
- Everything must look clean in both light and dark mode

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
- Comment all code with short, concise comments (a word or two for HTML comments, brief for code comments)

## Workflow
- Before implementing any task, explain what you're going to do and which files you'll change. Only start changing files after getting approval.
- Update TODO.md each time a task is completed.
- After completing a task, automatically review and present the next task for approval.

## Testing
- E2E tests use Playwright, located in tests/