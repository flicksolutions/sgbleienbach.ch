<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		date,
		abstract,
		children
	}: { title: string; date: string; abstract: string; children: Snippet } = $props();

	const formatted = $derived(
		new Date(date).toLocaleDateString('de-CH', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
</script>

<svelte:head>
	<title>{title} – SG Bleienbach</title>
</svelte:head>

<article class="prose prose-lg mx-auto max-w-3xl dark:prose-invert">
	<header class="mb-8">
		<p class="text-sm font-medium text-surface-500">{formatted}</p>
		<h1 class="mt-1">{title}</h1>
		<p class="lead text-surface-600">{abstract}</p>
	</header>
	{@render children()}
</article>
