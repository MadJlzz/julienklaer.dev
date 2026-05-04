import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.julienklaer.dev';

export default defineConfig({
  site: SITE,
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'night-owl',
      wrap: true,
    },
  },
  build: {
    format: 'directory',
  },
});
