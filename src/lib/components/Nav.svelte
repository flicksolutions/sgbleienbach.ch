<script lang="ts">
	import { page } from '$app/state';

	let uebUnsMobileOpen = $state(false);
	let schuetzenMobileOpen = $state(false);
	let mobileMenuOpen = $state(false);

	const uebUnsLinks = [
		{ href: '/ueber-uns/geschichte', label: 'Geschichte' },
		{ href: '/ueber-uns/vorstand', label: 'Vorstand' },
		{ href: '/ueber-uns/anfahrt', label: 'Anfahrt' }
	];

	const schuetzenLinks = [
		{ href: '/schuetzen#jahresprogramm', label: 'Jahresprogramm' },
		{ href: '/schuetzen#ranglisten', label: 'Ranglisten' },
		{ href: '/schuetzen#linksammlung', label: 'Linksammlung' }
	];

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<nav class="bg-primary-700 text-primary-50 shadow-md" data-theme="clover">
	<div class="mx-auto max-w-7xl px-4">
		<div class="flex h-14 items-center justify-between">
			<!-- Logo / Club name -->
			<a href="/" class="text-lg font-bold tracking-wide hover:opacity-80">
				SG Bleienbach
			</a>

			<!-- Desktop nav -->
			<ul class="hidden items-center gap-1 md:flex">
				<li>
					<a
						href="/"
						class="rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-600"
						class:bg-primary-900={isActive('/')}
					>
						Home
					</a>
				</li>
				<li>
					<a
						href="/news"
						class="rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-600"
						class:bg-primary-900={isActive('/news')}
					>
						News
					</a>
				</li>

				<!-- Über uns dropdown -->
				<li class="group relative">
					<button
						class="flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-600"
						class:bg-primary-900={isActive('/ueber-uns')}
					>
						Über uns
						<svg class="h-3 w-3 transition-transform group-hover:rotate-180" viewBox="0 0 10 6" fill="currentColor">
							<path d="M0 0l5 6 5-6z" />
						</svg>
					</button>
					<ul class="absolute top-full left-0 z-50 hidden min-w-max rounded bg-white py-1 shadow-lg group-hover:block">
						{#each uebUnsLinks as link}
							<li>
								<a
									href={link.href}
									class="block px-4 py-2 text-sm text-surface-800 hover:bg-primary-50"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</li>

				<!-- Aktuelle Infos dropdown -->
				<li class="group relative">
					<button
						class="flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-600"
						class:bg-primary-900={isActive('/schuetzen')}
					>
						Aktuelle Infos
						<svg class="h-3 w-3 transition-transform group-hover:rotate-180" viewBox="0 0 10 6" fill="currentColor">
							<path d="M0 0l5 6 5-6z" />
						</svg>
					</button>
					<ul class="absolute top-full left-0 z-50 hidden min-w-max rounded bg-white py-1 shadow-lg group-hover:block">
						{#each schuetzenLinks as link}
							<li>
								<a
									href={link.href}
									class="block px-4 py-2 text-sm text-surface-800 hover:bg-primary-50"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</li>
			</ul>

			<!-- Mobile hamburger -->
			<button
				class="rounded p-2 hover:bg-primary-600 md:hidden"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label="Menü öffnen"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>

		<!-- Mobile menu -->
		{#if mobileMenuOpen}
			<ul class="border-t border-primary-600 pb-3 pt-2 md:hidden">
				<li>
					<a href="/" class="block px-4 py-2 text-sm hover:bg-primary-600">Home</a>
				</li>
				<li>
					<a href="/news" class="block px-4 py-2 text-sm hover:bg-primary-600">News</a>
				</li>
				<li>
					<button
						class="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-primary-600"
						onclick={() => (uebUnsMobileOpen = !uebUnsMobileOpen)}
					>
						Über uns
						<svg class="h-3 w-3" viewBox="0 0 10 6" fill="currentColor">
							<path d="M0 0l5 6 5-6z" />
						</svg>
					</button>
					{#if uebUnsMobileOpen}
						<ul class="bg-primary-800">
							{#each uebUnsLinks as link}
								<li>
									<a href={link.href} class="block px-8 py-2 text-sm hover:bg-primary-600">
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
				<li>
					<button
						class="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-primary-600"
						onclick={() => (schuetzenMobileOpen = !schuetzenMobileOpen)}
					>
						Aktuelle Infos
						<svg class="h-3 w-3" viewBox="0 0 10 6" fill="currentColor">
							<path d="M0 0l5 6 5-6z" />
						</svg>
					</button>
					{#if schuetzenMobileOpen}
						<ul class="bg-primary-800">
							{#each schuetzenLinks as link}
								<li>
									<a href={link.href} class="block px-8 py-2 text-sm hover:bg-primary-600">
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			</ul>
		{/if}
	</div>
</nav>
