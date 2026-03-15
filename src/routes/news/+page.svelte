<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>News – SG Bleienbach</title>
</svelte:head>

<section class="mx-auto max-w-3xl py-8">
	<h1 class="mb-8 text-3xl font-bold text-secondary-800">Neuigkeiten</h1>

	{#if data.articles.length === 0}
		<p class="text-surface-500">Zurzeit gibt es keine Neuigkeiten.</p>
	{:else}
		<div class="space-y-6">
			{#each data.articles as article (article.slug)}
				<a
					href={resolve(`/news/${article.slug}`)}
					class="preset-outlined-surface-50 rounded-container-token block p-6 transition-all hover:shadow-lg"
				>
					<p class="text-sm font-medium text-surface-500">
						{new Date(article.date).toLocaleDateString('de-CH', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
					<h2 class="mt-1 text-xl font-semibold text-secondary-800">{article.title}</h2>
					<p class="mt-2 text-surface-600">{article.abstract}</p>
					<span class="mt-3 inline-block text-sm font-medium text-primary-600">
						Weiterlesen →
					</span>
				</a>
			{/each}
		</div>
	{/if}
</section>
