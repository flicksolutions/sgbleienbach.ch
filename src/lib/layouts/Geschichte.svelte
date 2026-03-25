<script lang="ts">
	let { children } = $props();
</script>

<article class="mx-auto max-w-3xl">
	<div class="timeline relative border-l-2 border-primary-400 pl-8">
		{@render children()}
	</div>
</article>

<style>
	@reference "tailwindcss";
	@reference "@skeletonlabs/skeleton";

	.timeline :global(ol) {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.timeline :global(li) {
		position: relative;
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-surface-200);
	}

	.timeline :global(li:last-child) {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.timeline :global(li::before) {
		content: '';
		position: absolute;
		left: -2.35rem;
		top: 0.35rem;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		background: var(--color-primary-500);
		border: 2px solid var(--color-primary-200);
	}

	.timeline :global(h1) {
		font-size: 1.875rem;
		font-weight: bold;
		margin-bottom: 2rem;
		@apply text-secondary-800-200;
	}
</style>
