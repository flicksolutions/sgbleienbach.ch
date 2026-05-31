import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { visit } from 'unist-util-visit';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Adds target="_blank" and rel="noopener noreferrer" to external and asset links. */
function rehypeNewTabLinks() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'a') return;
			const href = node.properties?.href;
			if (typeof href !== 'string') return;
			const isExternal = /^https?:\/\//.test(href);
			const isAsset = href.startsWith('%7B'); // URL-encoded Svelte expression = imported asset
			if (!isExternal && !isAsset) return;
			node.properties.target = '_blank';
			node.properties.rel = 'noopener noreferrer';
			if (isAsset) {
				// Restore the Svelte expression so it resolves at runtime
				node.properties.href = decodeURIComponent(href);
			}
		});
	};
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			rehypePlugins: [rehypeNewTabLinks],
			layout: {
				geschichte: join(__dirname, './src/lib/layouts/Geschichte.svelte'),
				news: join(__dirname, './src/lib/layouts/News.svelte'),
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
	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'control-<',
			showToggleButton: 'always'
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
