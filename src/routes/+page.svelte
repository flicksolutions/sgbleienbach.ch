<script lang="ts">
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import logoHoch from '$lib/assets/Logo_SchuetzenBleienbach_rgb_hoch_Web.svg';
	import { Gallery, GalleryImage } from '$lib';
	import { goldSponsors } from '$lib/data/sponsors';
	import { jahresprogrammEvents2026 } from '$lib/data/jahresprogramm';

	let { data } = $props();

	function todayString() {
		const now = new Date();
		const y = now.getFullYear();
		const m = String(now.getMonth() + 1).padStart(2, '0');
		const d = String(now.getDate()).padStart(2, '0');
		return `${y}-${m}-${d}`;
	}

	let today = $state(browser ? todayString() : '');

	const nextEvent = $derived(
		browser
			? (jahresprogrammEvents2026
					.filter((e) => !today || e.date >= today)
					.sort((a, b) => {
						const dc = a.date.localeCompare(b.date);
						return dc !== 0 ? dc : (a.start ?? '').localeCompare(b.start ?? '');
					})[0] ?? null)
			: null
	);

	function formatEventDate(date: string) {
		const [y, m, d] = date.split('-').map(Number);
		return new Intl.DateTimeFormat('de-CH', {
			weekday: 'long',
			day: '2-digit',
			month: 'long',
			year: 'numeric',
			timeZone: 'Europe/Zurich'
		}).format(new Date(Date.UTC(y, m - 1, d, 12)));
	}

	function formatTime(event: typeof nextEvent) {
		if (!event?.start) return null;
		const from = event.start.replace(':', '.');
		return event.end ? `${from}–${event.end.replace(':', '.')} Uhr` : `${from} Uhr`;
	}
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

<!-- Nächster Termin -->
{#if nextEvent}
	<section class="py-4">
		<a
			href={resolve('/infos#jahresprogramm')}
			class="preset-outlined-surface-50 rounded-container-token group flex flex-col gap-1 p-5 transition-all hover:preset-filled-primary-500 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
		>
			<div class="flex items-center gap-3">
				<i
					class="fa-solid fa-calendar-days text-2xl text-primary-600 group-hover:text-primary-100-900"
					aria-hidden="true"
				></i>
				<div>
					<p
						class="text-xs font-semibold tracking-widest text-surface-600-400 uppercase group-hover:text-primary-100-900"
					>
						Nächster Termin
					</p>
					<p
						class="group-hover: font-semibold text-surface-900-100 group-hover:text-secondary-800-200"
					>
						{nextEvent.category}
					</p>
					{#if nextEvent.note}
						<p class="text-sm text-surface-700-300 group-hover:text-primary-100-900">
							{nextEvent.note}
						</p>
					{/if}
				</div>
			</div>
			<div
				class="pl-9 text-sm text-surface-700-300 group-hover:text-primary-100-900 sm:pl-0 sm:text-right"
			>
				<p>{formatEventDate(nextEvent.date)}</p>
				{#if formatTime(nextEvent)}
					<p>{formatTime(nextEvent)}</p>
				{/if}
				<p>{nextEvent.location}</p>
			</div>
		</a>
	</section>
{/if}

<!-- Welcome -->
<section class="py-12 text-center">
	<h2 class="text-2xl font-bold text-secondary-800-200 md:text-3xl">Willkommen</h2>
	<p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
		Die Schützengesellschaft Bleienbach ist ein traditionsreicher Verein im Herzen des Oberaargaus.
		Ob erfahrene Schützin oder interessierter Neuling – bei uns sind alle willkommen. Entdecken Sie
		unser vielseitiges Angebot und werden Sie Teil unserer Gemeinschaft.
	</p>
</section>

<!-- Quick Links -->
<section class="py-8">
	<h2 class="mb-8 text-center text-2xl font-bold text-secondary-800-200 md:text-3xl">
		Auf einen Blick
	</h2>
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each [{ href: resolve('/infos#jahresprogramm'), title: 'Jahresprogramm', desc: 'Alle Termine und Anlässe der laufenden Saison.', icon: 'fa-calendar-days' }, { href: resolve('/infos#ranglisten'), title: 'Ranglisten', desc: 'Aktuelle Resultate und Ranglisten.', icon: 'fa-trophy' }, { href: resolve('/ueber-uns/geschichte'), title: 'Geschichte', desc: 'Erfahren Sie mehr über unsere Vereinsgeschichte.', icon: 'fa-book-open' }, { href: resolve('/ueber-uns/anfahrt'), title: 'Anfahrt', desc: 'So finden Sie unseren Schiessstand.', icon: 'fa-location-dot' }] as card (card.href)}
			<a
				href={card.href}
				class="preset-outlined-surface-50 group rounded-container-token flex flex-col items-center p-6 text-center transition-all hover:preset-filled-primary-500 hover:shadow-lg"
			>
				<i
					class="fa-solid {card.icon} text-4xl text-primary-600 group-hover:text-primary-100"
					aria-hidden="true"
				></i>
				<h3 class="mt-3 text-lg font-semibold text-secondary-800-200">{card.title}</h3>
				<p class="mt-1 text-sm group-hover:text-primary-100-900">{card.desc}</p>
			</a>
		{/each}
	</div>
</section>

<!-- Eindrücke -->
<section class="py-12">
	<h2 class="mb-8 text-center text-2xl font-bold text-secondary-800-200 md:text-3xl">Eindrücke</h2>
	<Gallery class="mx-auto max-w-3xl">
		<GalleryImage alt="Schiessstand Bleienbach">
			<enhanced:img src="$lib/assets/img/haus.webp" alt="Schiessstand Bleienbach" />
		</GalleryImage>
		<GalleryImage alt="Kameradschaft beim Schiessen">
			<enhanced:img
				src="$lib/assets/img/IMG20230602185756.jpg"
				alt="Kameradschaft beim Schiessen"
			/>
		</GalleryImage>
		<GalleryImage alt="Vereinsanlass der SG Bleienbach">
			<enhanced:img
				src="$lib/assets/img/IMG20230603105550.jpg"
				alt="Vereinsanlass der SG Bleienbach"
			/>
		</GalleryImage>
		<GalleryImage alt="Auf dem Schiessstand">
			<enhanced:img src="$lib/assets/img/IMG20230604115540.jpg" alt="Auf dem Schiessstand" />
		</GalleryImage>
		<GalleryImage alt="Gemeinsames Essen nach dem Schiessen">
			<enhanced:img
				src="$lib/assets/img/IMG20230604121814.jpg"
				alt="Gemeinsames Essen nach dem Schiessen"
			/>
		</GalleryImage>
		<GalleryImage alt="Rangverkündigung">
			<enhanced:img src="$lib/assets/img/IMG20230604124658.jpg" alt="Rangverkündigung" />
		</GalleryImage>
	</Gallery>
</section>

<!-- News Teaser -->
<section class=" py-12">
	<div class="mx-auto max-w-3xl">
		<h2 class="text-center text-2xl font-bold text-secondary-800-200 md:text-3xl">Neuigkeiten</h2>
		<p class="mx-auto mt-4 max-w-xl text-center">
			Bleiben Sie auf dem Laufenden über Vereinsaktivitäten, Wettkampfresultate und kommende
			Anlässe.
		</p>

		{#if data.latestNews.length > 0}
			<div class="mt-8 space-y-6">
				{#each data.latestNews as article (article.slug)}
					<a
						href={resolve(`/news/${article.slug}` as any)}
						class="preset-outlined-surface-50 rounded-container-token group block p-6 transition-all hover:preset-filled-primary-500 hover:shadow-lg"
					>
						<p class="text-sm font-medium">
							{new Date(article.date).toLocaleDateString('de-CH', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>
						<h3 class="mt-1 text-xl font-semibold text-secondary-800-200">{article.title}</h3>
						<p class="mt-2">{article.abstract}</p>
						<span
							class="mt-3 inline-block text-sm font-medium text-primary-600-400 group-hover:text-primary-contrast-500"
						>
							Weiterlesen →
						</span>
					</a>
				{/each}
			</div>
		{/if}

		<div class="mt-8 text-center">
			<a
				href={resolve('/news')}
				class="mt-6 btn inline-block rounded-full preset-filled-primary-500 px-6 py-2 font-medium"
			>
				Alle News →
			</a>
		</div>
	</div>
</section>

<!-- Sponsoren Banner -->
<section class="py-12">
	<div class="text-center">
		<h2 class="text-2xl font-bold text-secondary-800-200 md:text-3xl">Unsere Sponsoren</h2>
		<p class="mx-auto mt-4 max-w-xl">
			Wir danken unseren Gold-Sponsoren für ihre wertvolle Unterstützung.
		</p>
		<div
			class="mt-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] items-center gap-8 rounded-md bg-surface-50 p-2"
		>
			{#each goldSponsors as sponsor (sponsor.name)}
				<a
					href={sponsor.url ?? '#'}
					class="flex items-center justify-center transition-opacity hover:opacity-80"
					title={sponsor.name}
				>
					<img src={sponsor.logo} alt={sponsor.name} class="max-h-48 w-full object-contain" />
				</a>
			{/each}
		</div>
		<a
			href={resolve('/sponsoring')}
			class="mt-8 btn inline-block rounded-full preset-filled-primary-500 px-6 py-2 font-medium"
		>
			Alle Sponsoren →
		</a>
	</div>
</section>
