<script lang="ts">
	import { browser } from '$app/environment';
	import Map from '$lib/components/Map.svelte';

	const GMAPS = 'https://www.google.com/maps?q=47.17936000333466,7.753527098787768';
</script>

<h1>Anfahrt</h1>
<p>So finden Sie uns.</p>

{#if browser}
	<div class="my-6">
		<Map />
	</div>
{/if}

<a
	href={GMAPS}
	target="_blank"
	rel="noopener noreferrer"
	class="btn preset-filled-primary-500 mt-2 inline-block"
>
	Mit Google Maps navigieren →
</a>