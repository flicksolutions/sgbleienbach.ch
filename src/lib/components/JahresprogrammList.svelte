<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import {
		jahresprogrammEvents2026,
		jahreskonkurrenzCategories2026,
		type JahresprogrammEvent
	} from '$lib/data/jahresprogramm';

	// Map event dates to deadline labels for Jahreskonkurrenz categories with a lastDate
	const deadlinesByDate = new Map<string, string[]>();
	for (const cat of jahreskonkurrenzCategories2026) {
		if (cat.lastDate) {
			const existing = deadlinesByDate.get(cat.lastDate) ?? [];
			existing.push(cat.label);
			deadlinesByDate.set(cat.lastDate, existing);
		}
	}

	const allSortedEvents = [...jahresprogrammEvents2026].sort((a, b) => {
		const dateCmp = a.date.localeCompare(b.date);
		if (dateCmp !== 0) return dateCmp;
		return (a.start ?? '').localeCompare(b.start ?? '');
	});

	function todayString(): string {
		const now = new Date();
		const y = now.getFullYear();
		const m = String(now.getMonth() + 1).padStart(2, '0');
		const d = String(now.getDate()).padStart(2, '0');
		return `${y}-${m}-${d}`;
	}

	// SSR: show all; client: filter to today and future
	let today = $state(browser ? todayString() : '');
	const sortedEvents = $derived(allSortedEvents.filter((e) => !today || e.date >= today));

	function formatDateLabel(date: string): string {
		const [year, month, day] = date.split('-').map(Number);
		return new Intl.DateTimeFormat('de-CH', {
			weekday: 'long',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			timeZone: 'Europe/Zurich'
		}).format(new Date(Date.UTC(year, month - 1, day, 12)));
	}

	function formatTimeLabel(event: JahresprogrammEvent): string {
		if (!event.start) {
			return 'Ganztägig';
		}

		const from = event.start.replace(':', '.');
		if (!event.end) {
			return `${from} Uhr`;
		}

		return `${from} - ${event.end.replace(':', '.')} Uhr`;
	}
</script>

<div
	class="rounded-container-token space-y-4 border border-surface-300 bg-surface-50 p-4 sm:p-6 dark:bg-surface-900"
>
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<p class="text-sm text-surface-700-300">
			Die nächsten Termine aus dem Jahresprogramm 2026 als Liste und Kalenderdatei.
		</p>
		<a
			href={`${base}/infos/jahresprogramm-2026.ics`}
			download="Jahresprogramm-2026.ics"
			class="rounded-base-token inline-flex items-center gap-2 border border-primary-700 bg-primary-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
		>
			<i class="fa-solid fa-calendar-days" aria-hidden="true"></i>
			In Kalender importieren (.ics)
		</a>
	</div>

	<ul class="list-none space-y-2 p-0">
		{#each sortedEvents as event (event.id)}
			{@const eventDeadlines = deadlinesByDate.get(event.date)}
			<li
				class="rounded-base-token border px-3 py-2 {eventDeadlines
					? 'border-warning-300 bg-warning-50 dark:border-warning-700 dark:bg-warning-950'
					: 'border-surface-200 bg-surface-100 dark:border-surface-700 dark:bg-surface-800'}"
			>
				<div class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
					<div>
						<p class="font-medium text-surface-900-100">{event.category}</p>
						{#if event.note}
							<p class="text-sm text-surface-700-300">{event.note}</p>
						{/if}
						{#if eventDeadlines}
							<p
								class="mt-1 flex items-center gap-1 text-sm font-medium text-warning-700 dark:text-warning-400"
							>
								<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
								Letzte Möglichkeit: {eventDeadlines.join(', ')}
							</p>
						{/if}
					</div>
					<div class="text-sm text-surface-700-300 sm:text-right">
						<p>{formatDateLabel(event.date)}</p>
						<p>{formatTimeLabel(event)}</p>
						<p>{event.location}</p>
					</div>
				</div>
			</li>
		{:else}
			<li class="text-sm text-surface-700-300">Keine weiteren Termine in 2026.</li>
		{/each}
	</ul>
</div>
