<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getContext, onMount, onDestroy } from 'svelte';

	let {
		alt,
		children,
		class: className = ''
	}: { alt: string; children: Snippet; class?: string } = $props();

	const gallery = getContext<{
		register: (item: { src: string; alt: string; element: HTMLElement }) => () => void;
	}>('gallery');

	let wrapperEl: HTMLElement;
	let unregister: (() => void) | undefined;

	function getResolvedSrc(): string {
		const img = wrapperEl?.querySelector('img');
		return img?.currentSrc || img?.src || '';
	}

	onMount(() => {
		const item = { src: getResolvedSrc(), alt, element: wrapperEl };
		unregister = gallery.register(item);
	});

	onDestroy(() => {
		unregister?.();
	});
</script>

<!-- Hidden wrapper — only used for enhanced:img src resolution -->
<div bind:this={wrapperEl} class={className}>
	{@render children()}
</div>
