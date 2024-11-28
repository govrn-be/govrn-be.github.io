import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()],
  //site: 'https://govrn.com',
  site: 'https://govrn-be.github.io',
  base: 'govrn-website-astro',
});
