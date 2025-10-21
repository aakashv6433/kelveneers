// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://aakashv6433.github.io/kelveneers/',
	base: '/kelveneers/',
	vite: {
		plugins: [tailwindcss()],
	},
});
