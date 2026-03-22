<script lang="ts">
	import { resolve } from '$app/paths';
	import logoHoch from '$lib/assets/Logo_SchuetzenBleienbach_rgb_hoch_Web.svg';
</script>

<svelte:head>
	<title>SG Bleienbach – Schützengesellschaft Bleienbach</title>
</svelte:head>

<!-- Hero (full-bleed) -->
<section class="relative right-1/2 left-1/2 -mx-[50vw] w-screen">
	<div class="relative h-112 overflow-hidden md:h-144">
		<enhanced:img
			src="$lib/assets/img/stand.webp"
			alt="Schiessstand der Schützengesellschaft Bleienbach"
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 bg-linear-to-t from-white/40 via-white/20 to-white/0"></div>
		<div
			class="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center text-white"
		>
			<img src={logoHoch} alt="Logo Schützengesellschaft Bleienbach" class="mb-4 h-32 md:h-55" />
			<h1 class="h1 font-bold drop-shadow-lg md:text-5xl lg:text-6xl">
				Schützengesellschaft Bleienbach
			</h1>
			<p class="mt-3 text-lg font-light tracking-wide drop-shadow md:text-xl">
				Tradition, Präzision, Kameradschaft
			</p>
		</div>
	</div>
</section>

<!-- Welcome -->
<section class="py-12 text-center">
	<h2 class="text-2xl font-bold text-secondary-800 md:text-3xl">Willkommen</h2>
	<p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-surface-600">
		Die Schützengesellschaft Bleienbach ist ein traditionsreicher Verein im Herzen des Oberaargaus.
		Ob erfahrene Schützin oder interessierter Neuling – bei uns sind alle willkommen. Entdecken Sie
		unser vielseitiges Angebot und werden Sie Teil unserer Gemeinschaft.
	</p>
</section>

<!-- Quick Links -->
<section class="py-8">
	<h2 class="mb-8 text-center text-2xl font-bold text-secondary-800 md:text-3xl">
		Auf einen Blick
	</h2>
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each [{ href: resolve('/infos#jahresprogramm'), title: 'Jahresprogramm', desc: 'Alle Termine und Anlässe der laufenden Saison.', icon: 'fa-calendar-days' }, { href: resolve('/infos#ranglisten'), title: 'Ranglisten', desc: 'Aktuelle Resultate und Ranglisten.', icon: 'fa-trophy' }, { href: resolve('/ueber-uns/geschichte'), title: 'Geschichte', desc: 'Erfahren Sie mehr über unsere Vereinsgeschichte.', icon: 'fa-book-open' }, { href: resolve('/ueber-uns/anfahrt'), title: 'Anfahrt', desc: 'So finden Sie unseren Schiessstand.', icon: 'fa-location-dot' }] as card (card.href)}
			<a
				href={card.href}
				class="preset-outlined-surface-50 group rounded-container-token flex flex-col items-center p-6 text-center transition-all hover:preset-filled-primary-500 hover:shadow-lg"
			>
				<i class="fa-solid {card.icon} text-4xl text-primary-600 group-hover:text-primary-100" aria-hidden="true"></i>
				<h3 class="mt-3 text-lg font-semibold">{card.title}</h3>
				<p class="mt-1 text-sm text-surface-500 group-hover:text-primary-100">{card.desc}</p>
			</a>
		{/each}
	</div>
</section>

<!-- News Teaser -->
<section class="py-12">
	<div class="rounded-container-token bg-surface-100 p-8 text-center">
		<h2 class="text-2xl font-bold text-secondary-800 md:text-3xl">Neuigkeiten</h2>
		<p class="mx-auto mt-4 max-w-xl text-surface-600">
			Bleiben Sie auf dem Laufenden über Vereinsaktivitäten, Wettkampfresultate und kommende
			Anlässe.
		</p>
		<a
			href={resolve('/news')}
			class="mt-6 btn inline-block rounded-full preset-filled-primary-500 px-6 py-2 font-medium"
		>
			Alle News →
		</a>
	</div>
</section>
