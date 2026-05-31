<script lang="ts">
	import { PUBLIC_MAPTILER_API_KEY } from '$env/static/public';
	import { onMount, onDestroy } from 'svelte';
	import maplibregl from 'maplibre-gl';

	const LAT = 47.17936000333466;
	const LNG = 7.753527098787768;
	const centerLAT = 47.183601784141196;
	const centerLNG = 7.75578131921762;
	const STYLE = `https://api.maptiler.com/maps/ch-swisstopo-lbm/style.json?key=${PUBLIC_MAPTILER_API_KEY}`;

	let container: HTMLDivElement;
	let map: import('maplibre-gl').Map | undefined;

	onMount(async () => {
		map = new maplibregl.Map({
			container,
			style: STYLE,
			center: [centerLNG, centerLAT],
			zoom: 14
		});

		new maplibregl.Marker({ color: '#4a7c2f' }).setLngLat([LNG, LAT]).addTo(map);
	});

	onDestroy(() => {
		map?.remove();
	});
</script>

<svelte:head>
	<link href="https://unpkg.com/maplibre-gl/dist/maplibre-gl.css" rel="stylesheet" />
</svelte:head>

<div
	bind:this={container}
	class="h-96 w-full rounded-lg shadow-md"
	role="img"
	aria-label="Karte: Standort Schiessstand Bleienbach, Gässli, 3368 Bleienbach"
></div>
