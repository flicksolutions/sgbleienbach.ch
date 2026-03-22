<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	let { children, class: className = '' }: { children: Snippet; class?: string } = $props();

	interface GalleryItem {
		src: string;
		alt: string;
		element: HTMLElement;
	}

	let items = $state<GalleryItem[]>([]);
	let carouselIndex = $state(0);
	let lightboxIndex = $state(-1);
	let isLightboxOpen = $derived(lightboxIndex >= 0);

	let touchStartX = 0;
	let touchDeltaX = 0;
	const SWIPE_THRESHOLD = 50;

	function register(item: GalleryItem) {
		items.push(item);
		return () => {
			const idx = items.indexOf(item);
			if (idx >= 0) items.splice(idx, 1);
		};
	}

	function openLightbox() {
		lightboxIndex = carouselIndex;
	}

	function closeLightbox() {
		lightboxIndex = -1;
	}

	function carouselNext() {
		if (items.length > 0) carouselIndex = (carouselIndex + 1) % items.length;
	}

	function carouselPrev() {
		if (items.length > 0) carouselIndex = (carouselIndex - 1 + items.length) % items.length;
	}

	function lightboxNext() {
		if (items.length > 0) lightboxIndex = (lightboxIndex + 1) % items.length;
	}

	function lightboxPrev() {
		if (items.length > 0) lightboxIndex = (lightboxIndex - 1 + items.length) % items.length;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!isLightboxOpen) return;
		switch (event.key) {
			case 'Escape':
				closeLightbox();
				event.preventDefault();
				break;
			case 'ArrowRight':
				lightboxNext();
				event.preventDefault();
				break;
			case 'ArrowLeft':
				lightboxPrev();
				event.preventDefault();
				break;
		}
	}

	function handleTouchStart(event: TouchEvent) {
		touchStartX = event.touches[0].clientX;
		touchDeltaX = 0;
	}

	function handleTouchMove(event: TouchEvent) {
		touchDeltaX = event.touches[0].clientX - touchStartX;
	}

	function handleTouchEnd(target: 'carousel' | 'lightbox') {
		if (touchDeltaX > SWIPE_THRESHOLD) {
			target === 'carousel' ? carouselPrev() : lightboxPrev();
		} else if (touchDeltaX < -SWIPE_THRESHOLD) {
			target === 'carousel' ? carouselNext() : lightboxNext();
		}
		touchDeltaX = 0;
	}

	function handleBackdropClick(event: MouseEvent) {
		if ((event.target as HTMLElement).dataset.backdrop !== undefined) {
			closeLightbox();
		}
	}

	setContext('gallery', { register });

	const reducedMotion =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const transitionDuration = reducedMotion ? 0 : 200;
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Hidden: GalleryImage children register themselves but are not rendered visually -->
<div class="hidden" aria-hidden="true">
	{@render children()}
</div>

<!-- Carousel -->
{#if items.length > 0}
	<div
		class="relative overflow-hidden rounded-lg {className}"
		role="region"
		aria-roledescription="carousel"
		aria-label="Bildergalerie"
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={() => handleTouchEnd('carousel')}
	>
		<!-- Current image (click to open lightbox) -->
		{#key carouselIndex}
			<button
				class="block w-full cursor-zoom-in"
				onclick={openLightbox}
				aria-label="Bild vergrössern: {items[carouselIndex].alt}"
			>
				<img
					src={items[carouselIndex].src}
					alt={items[carouselIndex].alt}
					class="aspect-[3/2] w-full rounded-lg object-cover"
					in:fade={{ duration: transitionDuration }}
				/>
			</button>
		{/key}

		<!-- Prev / Next arrows -->
		{#if items.length > 1}
			<button
				class="absolute top-1/2 left-3 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
				onclick={carouselPrev}
				aria-label="Vorheriges Bild"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<button
				class="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
				onclick={carouselNext}
				aria-label="Nächstes Bild"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>

			<!-- Dots -->
			<div class="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
				{#each items as _, i (i)}
					<button
						class="h-2 w-2 rounded-full transition-all {i === carouselIndex
							? 'scale-125 bg-white'
							: 'bg-white/50 hover:bg-white/75'}"
						onclick={() => (carouselIndex = i)}
						aria-label="Bild {i + 1} von {items.length}"
						aria-current={i === carouselIndex ? 'true' : undefined}
					></button>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<!-- Lightbox overlay -->
{#if isLightboxOpen}
	<div
		class="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
		data-backdrop
		transition:fade={{ duration: transitionDuration }}
		onclick={handleBackdropClick}
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={() => handleTouchEnd('lightbox')}
		role="dialog"
		aria-modal="true"
		aria-label="Bildergalerie"
		tabindex="-1"
	>
		<button
			class="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
			onclick={closeLightbox}
			aria-label="Galerie schliessen"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

		{#if items.length > 1}
			<button
				class="absolute left-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
				onclick={lightboxPrev}
				aria-label="Vorheriges Bild"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<button
				class="absolute right-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
				onclick={lightboxNext}
				aria-label="Nächstes Bild"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		{/if}

		{#key lightboxIndex}
			<div
				class="flex max-h-[90vh] max-w-[90vw] items-center justify-center"
				in:scale={{ start: 0.95, duration: transitionDuration }}
			>
				<img
					src={items[lightboxIndex].src}
					alt={items[lightboxIndex].alt}
					class="max-h-[90vh] max-w-[90vw] rounded object-contain"
				/>
			</div>
		{/key}

		{#if items.length > 1}
			<div class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
				{lightboxIndex + 1} / {items.length}
			</div>
		{/if}
	</div>
{/if}
