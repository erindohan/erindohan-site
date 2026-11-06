// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://erindohan.com',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    sitemap({
      // Keep private, gated, and confirmation pages out of the sitemap.
      filter: (page) =>
        !page.includes('/admin/') &&
        !page.includes('/read/') &&
        !page.includes('/thank-you') &&
        !page.includes('/rsvp-confirmed'),
    }),
  ],
});
