<script lang="ts">
	import { goldSponsors, silverSponsors, bronzeSponsors } from '$lib/data/sponsors';
</script>

<svelte:head>
	<title>Sponsoring – SG Bleienbach</title>
	<meta
		name="description"
		content="Unsere Sponsoren – die Schützengesellschaft Bleienbach dankt ihren Gold-, Silber- und Bronze-Sponsoren für die grosszügige Unterstützung."
	/>
</svelte:head>

<section class="mx-auto max-w-4xl py-8">
	<h1 class="mb-4 text-3xl font-bold text-secondary-800">Unsere Sponsoren</h1>
	<p class="max-w-2xl text-lg leading-relaxed">
		Wir danken unseren Sponsoren herzlich für ihre grosszügige Unterstützung. Ohne sie wäre unser
		Vereinsleben in dieser Form nicht möglich.
	</p>

	<!-- Gold sponsors -->
	<div class="mt-12">
		<h2 class="mb-6 text-2xl font-bold text-secondary-800">
			<i class="fa-solid fa-medal text-yellow-500" aria-hidden="true"></i> Gold-Sponsoren
		</h2>
		<div class="grid grid-cols-2 gap-6 rounded-md bg-surface-50 py-4 md:grid-cols-4">
			{#each goldSponsors as sponsor (sponsor.name)}
				<a
					href={sponsor.url ?? '#'}
					class="preset-outlined-surface-50 rounded-container-token flex flex-col items-center justify-center p-6 transition-all hover:shadow-lg"
					target={sponsor.url && sponsor.url !== '#' ? '_blank' : undefined}
					rel={sponsor.url && sponsor.url !== '#' ? 'noopener noreferrer' : undefined}
				>
					{#if sponsor.logo}
						<img src={sponsor.logo} alt={sponsor.name} class="h-20 max-w-full object-contain" />
					{/if}
					<p class="mt-3 text-center text-sm font-medium text-secondary-800">{sponsor.name}</p>
				</a>
			{/each}
		</div>
	</div>

	<!-- Silver sponsors -->
	<div class="mt-12">
		<h2 class="mb-6 text-2xl font-bold text-secondary-800">
			<i class="fa-solid fa-medal text-surface-400" aria-hidden="true"></i> Silber-Sponsoren
		</h2>
		<div class="grid grid-cols-2 gap-6 rounded-md bg-surface-50 py-4 sm:grid-cols-3 md:grid-cols-4">
			{#each silverSponsors as sponsor (sponsor.name)}
				<a
					href={sponsor.url ?? '#'}
					class="preset-outlined-surface-50 rounded-container-token flex flex-col items-center justify-center p-5 transition-all hover:shadow-lg"
					target={sponsor.url && sponsor.url !== '#' ? '_blank' : undefined}
					rel={sponsor.url && sponsor.url !== '#' ? 'noopener noreferrer' : undefined}
				>
					{#if sponsor.logo}
						<img src={sponsor.logo} alt={sponsor.name} class="h-14 max-w-full object-contain" />
					{/if}
					<p class="mt-2 text-center text-sm font-medium text-secondary-800">{sponsor.name}</p>
				</a>
			{/each}
		</div>
	</div>

	<!-- Bronze / text-only sponsors -->
	<div class="mt-12">
		<h2 class="mb-6 text-2xl font-bold text-secondary-800">
			<i class="fa-solid fa-medal text-orange-700" aria-hidden="true"></i> Bronze Sponsoren
		</h2>
		<div class="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
			{#each bronzeSponsors as sponsor (sponsor.name)}
				{#if sponsor.url && sponsor.url !== '#'}
					<a
						href={sponsor.url}
						class="rounded px-2 py-1 text-sm transition-colors hover:bg-surface-50 hover:text-primary-600"
						target="_blank"
						rel="noopener noreferrer"
					>
						{sponsor.name}
					</a>
				{:else}
					<span class="px-2 py-1 text-sm">{sponsor.name}</span>
				{/if}
			{/each}
		</div>
	</div>
	<p>Vielen Dank an alle weiteren Gönnerinnen und Gönner!</p>
</section>
