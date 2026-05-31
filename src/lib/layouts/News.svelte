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
	<meta name="description" content={abstract} />
</svelte:head>

<article class="mx-auto prose prose-lg max-w-3xl dark:prose-invert">
	<header class="mb-8">
		<p class="text-sm font-medium text-secondary-800-200">{formatted}</p>
		<h1 class="mt-1">{title}</h1>
		<p class="lead text-secondary-800-200">{abstract}</p>
	</header>
	{@render children()}
</article>
