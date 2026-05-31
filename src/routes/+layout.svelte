<script lang="ts">
	import './layout.css';
	import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
	import '@fortawesome/fontawesome-free/css/solid.min.css';
	import faSolidFont from '@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" href={faSolidFont} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<a
	href="#main-content"
	class="sr-only fixed top-2 left-2 z-100 rounded bg-primary-700 px-4 py-2 text-primary-50 focus:not-sr-only"
>
	Zum Inhalt springen
</a>

<div class="flex min-h-screen flex-col">
	<Nav />
	<main id="main-content" class="mx-auto w-full max-w-7xl flex-1 px-4">
		{#key page.url.pathname}
			{@render children()}
		{/key}
	</main>
	<Footer />
</div>
