import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			layout: {
				geschichte: join(__dirname, './src/lib/layouts/Geschichte.svelte'),
				_: join(__dirname, './src/lib/layouts/Default.svelte')
			}
		})
	],
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		},
		prerender: {
			concurrency: 4,
			handleHttpError: 'warn', //remove this for production
			handleMissingId: 'warn', //remove this for production
			handleUnseenRoutes: 'warn' //remove this for production
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
