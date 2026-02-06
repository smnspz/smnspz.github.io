# Blog Build — Claude Code Task List

Granular tasks to feed to Claude Code one at a time.
Review the output of each task before moving to the next.
Run `npm run dev` after each to check in the browser.

## Foundation

- [ ] **1. Content collection config** — "Initialize a content collection config at src/content.config.ts. Define a 'blog' collection using the file loader targeting src/content/blog/ with a Zod schema: title (string), date (date), description (string), tags (optional array of strings). Don't create any pages or components yet."

## Base Layout

- [ ] **2. HTML skeleton** — "Create src/layouts/Base.astro. It should accept a 'title' prop (string). Render a full HTML document with: lang='en', charset utf-8, viewport meta tag, a `<title>` using the prop, and an empty `<body>` with three semantic landmarks: `<header>`, `<main>`, `<footer>`. Add a skip-to-content link as the very first element inside `<body>` that links to #main-content, and put id='main-content' on `<main>`. Apply 'slot' inside `<main>`. No styling yet, no navigation, no content — just the semantic skeleton."
- [ ] **3. Dark mode** — "In Base.astro, add Tailwind's dark mode classes to the document. Use the 'media' strategy (prefers-color-scheme) — do NOT use a toggle or class strategy. On the `<body>`, apply a base background color and text color with dark variants (e.g. bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100). Choose neutral, accessible colors. Don't add any other styling."
- [ ] **4. Typography and spacing** — "In Base.astro, add minimal base styling to the body: a readable max-width container centered with auto margins, horizontal padding for mobile, and a system font stack via Tailwind (font-sans). Set a comfortable line-height. Nothing decorative — just readability. Keep it mobile-first."
- [ ] **5. Skip link styling** — "Style the skip-to-content link so it's visually hidden by default but becomes visible on focus. Use Tailwind's sr-only and focus:not-sr-only utilities. When visible, it should appear as a small bar at the top of the page with a background color and padding. Make sure it has accessible contrast in both light and dark modes."
- [ ] **6. Header navigation** — "Add navigation inside the `<header>` in Base.astro. Use a `<nav>` element with an aria-label='Main navigation'. Inside it, put two links: 'Home' pointing to '/' and 'About' pointing to '/about'. Style them minimally: small text, subtle color, a bit of spacing between them. Add a hover underline. Make sure the links have accessible contrast in both light and dark mode. No logo, no site title in the header — keep it extremely spare."
- [ ] **7. Footer** — "Add content to the `<footer>` in Base.astro. Just a single line of small, muted text with a copyright notice: '© 2025 [my name]'. Center it, add vertical padding to separate it from content. Make sure it's accessible in both color modes. Nothing else."

## Pages — Structure

- [ ] **8. Index page shell** — "Create src/pages/index.astro. Import and use the Base layout with title 'Blog'. Inside the main slot, add an `<h1>` that says 'Blog' and an empty `<section>` with aria-label='Blog posts' where the post list will go later. No styling beyond what's inherited. No post listing logic yet."
- [ ] **9. About page structure** — "Create src/pages/about.astro. Import and use the Base layout with title 'About'. Add an `<h1>` that says 'About', then two `<section>` elements: one with `<h2>` 'Work' and one with `<h2>` 'Music'. Leave the sections empty for now. Just the heading structure."

## About Page — Content

- [ ] **10. Work section content** — "In the 'Work' section of about.astro, write 2–3 short paragraphs in `<p>` tags. The story: In high school I wanted to understand how the world actually works and thought economics would be the path. University taught me it was more about being a good manager than understanding the world — though it did teach me something along the way. After graduation I worked a few jobs, then turned to technology as another way to understand how things work. Got a degree in that, and now I work in software engineering. Write it in first person, keep it honest and conversational, not corporate. No styling beyond inherited."
- [ ] **11. Music section content** — "In the 'Music' section of about.astro, write 2–3 short paragraphs in `<p>` tags. The story: I started playing drums in middle school. Through high school I picked up bass and guitar, and played in a few bands. Eventually I started recording myself and launched my own side project. After that I kept playing with bands while evolving my songwriting and recording abilities over time. Write it in first person, same honest and conversational tone. No styling beyond inherited."
- [ ] **12. About page spacing** — "Add Tailwind spacing classes to about.astro. Space the `<h1>` from the sections, space the `<h2>`s from the paragraphs, and add vertical space between paragraphs. Use Tailwind's prose or manual spacing — whatever looks cleaner with minimal markup. Make sure it reads well on mobile and desktop."

## Blog Posts

- [ ] **13. First example post** — "Create a markdown file at src/content/blog/hello-world.md. Give it frontmatter with title: 'Hello World', date: today's date, description: 'My first blog post', tags: ['meta']. Write 2–3 short paragraphs of placeholder content about starting a blog. Keep it casual."
- [ ] **14. Post listing logic** — "In index.astro, fetch all entries from the 'blog' collection using getCollection. Sort them by date descending (newest first). For each post, render an `<article>` inside the blog posts section. Each article should contain: the post title as an `<h2>` wrapped in an `<a>` linking to /blog/{slug}, the date in a `<time>` element with a datetime attribute, and the description in a `<p>`. No styling yet — just correct semantic HTML."
- [ ] **15. Post listing styling** — "Style the blog post list on index.astro. Add vertical space between articles. Make the title link a readable size with a subtle hover effect. Make the date small and muted (works in both color modes). Make the description normal size. Add a subtle bottom border between posts, except the last one. Keep it all minimal."

## Blog Post Page

- [ ] **16. Dynamic route** — "Create src/pages/blog/[...slug].astro. Use getStaticPaths with getCollection('blog') to generate paths. Each page should use the Base layout with the post's title. Render the post content using the Content component from the entry's render() method. Above the content, show the post title as `<h1>`, the date in a `<time>` element, and the tags if present. No styling yet beyond inherited."
- [ ] **17. Prose styling** — "In the blog post page, wrap the rendered markdown Content in a `<div>` with Tailwind's typography plugin prose classes (install @tailwindcss/typography first if not already present). Make sure prose adapts to dark mode using dark:prose-invert. Set a comfortable max-width on the prose container."
- [ ] **18. Back link** — "At the top of the blog post page, before the `<h1>`, add a link that says '← Back' pointing to '/'. Style it small and muted, with a hover effect. Make sure it's accessible in both color modes. It should feel unobtrusive."
- [ ] **19. Metadata styling** — "Style the post metadata (title, date, tags) on the blog post page. The title should be a large, bold `<h1>`. The date below it should be small and muted. If tags exist, show them below the date as a comma-separated inline list in small muted text. Add spacing between the metadata block and the prose content."

## Polish

- [ ] **20. Active nav state** — "In the `<nav>` in Base.astro, highlight the current page's link. Use Astro.url.pathname to determine which link is active. Apply a visual indicator — for example, a bolder font weight or an underline — to the active link. Don't change the inactive link styling. Make sure it works for both '/' and '/about', and also highlights 'Home' when viewing any /blog/* page."
- [ ] **21. Responsive check** — "Review all pages (index, about, blog post) and make sure the layout works well on small screens (320px wide) and large screens. The max-width container should be comfortable on desktop (something like max-w-2xl) and the padding should prevent text from touching screen edges on mobile. Fix any issues."
- [ ] **22. Accessibility audit** — "Audit the entire project for accessibility. Check: all images have alt text (if any exist), heading hierarchy is correct (one h1 per page, h2s under it), all interactive elements are keyboard-accessible, color contrast meets WCAG AA, focus indicators are visible, landmark roles are present, the skip link works. Fix any issues you find. List what you checked and what you fixed."
- [ ] **23. Meta tags and SEO** — "In Base.astro, add a 'description' prop (optional string). Add a `<meta name='description'>` tag using it. Add Open Graph tags: og:title, og:description, og:type (website). Pass appropriate descriptions from each page. On the blog post page, use the post's description. On the index page use something like 'A personal blog about technology, music, and how the world works.' On about, something similar."

## Deployment

- [ ] **24. GitHub Pages config** — "Configure astro.config.mjs for GitHub Pages. Set the site to 'https://USERNAME.github.io' and base to '/REPO-NAME' (use placeholder values I can replace). Set output to 'static'. Make sure all internal links in the project respect the base path — use import.meta.env.BASE_URL where needed."
- [ ] **25. GitHub Actions workflow** — "Create .github/workflows/deploy.yml. It should trigger on push to main. Use the official Astro GitHub Pages deploy action (withastro/action@v3 or latest). The workflow should: check out the repo, build the site, and deploy to GitHub Pages. Use the 'github-pages' environment and the correct permissions for GITHUB_TOKEN."

## Validation

- [ ] **26. Second example post** — "Create a second markdown blog post at src/content/blog/on-learning.md. Frontmatter: title 'On Learning', date yesterday, description 'Thoughts on learning by doing', tags: ['thoughts']. Write 2–3 paragraphs about how the best way to learn something is to just start doing it, even if you don't feel ready. Verify the index page correctly shows both posts sorted newest first."
- [ ] **27. Final review** — "Do a final review of the entire project. Check: the site builds without errors or warnings (run npm run build), all links work, dark mode works correctly on all pages, the HTML is valid and semantic, there's no unused CSS or dead code, all Tailwind classes are necessary. Fix any issues and list everything you checked."
