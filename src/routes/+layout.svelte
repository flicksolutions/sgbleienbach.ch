<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col">
	<Nav />
	<main class="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
		{@render children()}
	</main>
</div>
