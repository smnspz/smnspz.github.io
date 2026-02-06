// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages deployment
  site: 'https://srosani.github.io',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});
