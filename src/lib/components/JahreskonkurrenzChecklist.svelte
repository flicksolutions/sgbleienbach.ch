<script lang="ts">
	import { browser } from '$app/environment';
	import { jahreskonkurrenzCategories2026 } from '$lib/data/jahresprogramm';

	const storageKey = 'sgb:jahreskonkurrenz:2026';

	let completedById = $state<Record<string, boolean>>({});
	const validIds = new Set(jahreskonkurrenzCategories2026.map((entry) => entry.id));

	function serialize(values: Record<string, boolean>): string {
		return jahreskonkurrenzCategories2026
			.filter((entry) => values[entry.id])
			.map((entry) => entry.id)
			.join(',');
	}

	if (browser) {
		const saved = localStorage.getItem(storageKey);
		if (saved) {
			const parsed: Record<string, boolean> = {};
			for (const id of saved
				.split(',')
				.map((value) => value.trim())
				.filter(Boolean)) {
				if (validIds.has(id)) {
					parsed[id] = true;
				}
			}
			completedById = parsed;
		}
	}

	let completedCount = $derived(
		jahreskonkurrenzCategories2026.filter((entry) => completedById[entry.id]).length
	);

	function toggleEntry(id: string, checked: boolean) {
		const nextState = {
			...completedById,
			[id]: checked
		};
		completedById = nextState;
		if (browser) {
			localStorage.setItem(storageKey, serialize(nextState));
		}
	}
</script>

<div
	class="rounded-container-token space-y-4 border border-surface-300 bg-surface-50 p-4 sm:p-6 dark:bg-surface-900"
>
	<p class="text-sm text-surface-700-300">
		Erfüllt: <span class="font-semibold text-surface-900-100"
			>{completedCount} / {jahreskonkurrenzCategories2026.length}</span
		>
	</p>

	<ul class="list-none space-y-2 p-0">
		{#each jahreskonkurrenzCategories2026 as entry (entry.id)}
			<li
				class="rounded-base-token border border-surface-200 bg-surface-100 px-3 py-2 dark:border-surface-700 dark:bg-surface-800"
			>
				<label class="flex items-start gap-3">
					<input
						type="checkbox"
						class="mt-1 h-4 w-4 rounded border-surface-400 text-primary-700 focus:ring-primary-700"
						checked={Boolean(completedById[entry.id])}
						onchange={(event) =>
							toggleEntry(entry.id, (event.currentTarget as HTMLInputElement).checked)}
					/>
					<span class="flex-1">
						<span class="font-medium text-surface-900-100">{entry.label}</span>
						{#if entry.hint}
							<span class="mt-1 block text-sm text-surface-700-300">{entry.hint}</span>
						{/if}
					</span>
				</label>
			</li>
		{/each}
	</ul>

	<p class="text-xs text-surface-600-400">
		Der Fortschritt wird nur lokal auf diesem Gerät gespeichert.
	</p>
</div>
