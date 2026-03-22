<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import logoQuer from '$lib/assets/Logo_SchuetzenBleienbach_rgb_quer_Web.svg';

	let uebUnsOpen = $state(false);
	let schuetzenOpen = $state(false);
	let uebUnsMobileOpen = $state(false);
	let schuetzenMobileOpen = $state(false);
	let mobileMenuOpen = $state(false);

	const uebUnsLinks = [
		{ href: resolve('/ueber-uns/geschichte'), label: 'Geschichte' },
		{ href: resolve('/ueber-uns/vorstand'), label: 'Vorstand' },
		{ href: resolve('/ueber-uns/anfahrt'), label: 'Anfahrt' }
	];

	const schuetzenLinks = [
		{ href: resolve('/infos#jahresprogramm'), label: 'Jahresprogramm' },
		{ href: resolve('/infos#ranglisten'), label: 'Ranglisten' },
		{ href: resolve('/infos#linksammlung'), label: 'Linksammlung' }
	];

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	function closeAllDropdowns() {
		uebUnsOpen = false;
		schuetzenOpen = false;
	}

	function closeAll() {
		closeAllDropdowns();
		uebUnsMobileOpen = false;
		schuetzenMobileOpen = false;
		mobileMenuOpen = false;
	}

	function handleDropdownKeydown(event: KeyboardEvent, toggle: () => void) {
		if (event.key === 'Escape') {
			closeAllDropdowns();
			(event.currentTarget as HTMLElement).focus();
		}
	}

	function handleDropdownItemKeydown(
		event: KeyboardEvent,
		items: typeof uebUnsLinks,
		index: number,
		buttonQuery: string
	) {
		if (event.key === 'Escape') {
			closeAllDropdowns();
			const nav = (event.currentTarget as HTMLElement).closest('nav');
			const button = nav?.querySelector<HTMLElement>(buttonQuery);
			button?.focus();
			event.preventDefault();
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			const next = (event.currentTarget as HTMLElement)
				.closest('li')
				?.nextElementSibling?.querySelector('a');
			(next as HTMLElement)?.focus();
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			const prev = (event.currentTarget as HTMLElement)
				.closest('li')
				?.previousElementSibling?.querySelector('a');
			(prev as HTMLElement)?.focus();
		}
	}

	// Close everything on navigation
	afterNavigate(() => {
		closeAll();
	});

	// Close desktop dropdowns on outside click
	function handleWindowClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('[data-dropdown]')) {
			closeAllDropdowns();
		}
	}
</script>

<svelte:window onclick={handleWindowClick} />

<nav class="bg-primary-700 text-primary-50 shadow-md" data-theme="clover" aria-label="Hauptnavigation">
	<div class="mx-auto max-w-7xl px-4">
		<div class="flex h-14 items-center justify-between">
			<!-- Logo / Club name -->
			<a href={resolve('/')} class="flex items-center gap-2 hover:opacity-80">
				<img src={logoQuer} alt="SG Bleienbach – Startseite" class="h-10" />
			</a>

			<!-- Desktop nav -->
			<ul class="hidden items-center gap-1 md:flex">
				<li>
					<a
						href={resolve('/')}
						class="rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-600"
						class:bg-primary-900={isActive(resolve('/'))}
					>
						Home
					</a>
				</li>
				<li>
					<a
						href={resolve('/news')}
						class="rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-600"
						class:bg-primary-900={isActive(resolve('/news'))}
					>
						News
					</a>
				</li>

				<!-- Über uns dropdown -->
				<li class="relative" data-dropdown>
					<button
						class="flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-600"
						class:bg-primary-900={isActive(resolve('/ueber-uns'))}
						aria-expanded={uebUnsOpen}
						aria-haspopup="true"
						onclick={() => {
							schuetzenOpen = false;
							uebUnsOpen = !uebUnsOpen;
						}}
						onkeydown={(e) => handleDropdownKeydown(e, () => (uebUnsOpen = !uebUnsOpen))}
					>
						Über uns
						<svg
							class="h-3 w-3 transition-transform"
							class:rotate-180={uebUnsOpen}
							viewBox="0 0 10 6"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M0 0l5 6 5-6z" />
						</svg>
					</button>
					{#if uebUnsOpen}
						<ul
							class="absolute top-full left-0 z-50 min-w-max rounded bg-surface-50 py-1 shadow-lg"
							role="menu"
						>
							{#each uebUnsLinks as link, i (link.href)}
								<li role="none">
									<a
										href={link.href}
										class="block px-4 py-2 text-sm text-surface-800 hover:bg-primary-50 focus:bg-primary-50 focus:outline-none"
										role="menuitem"
										onkeydown={(e) =>
											handleDropdownItemKeydown(
												e,
												uebUnsLinks,
												i,
												'[aria-haspopup]:first-of-type'
											)}
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>

				<!-- Aktuelle Infos dropdown -->
				<li class="relative" data-dropdown>
					<button
						class="flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-600"
						class:bg-primary-900={isActive(resolve('/infos'))}
						aria-expanded={schuetzenOpen}
						aria-haspopup="true"
						onclick={() => {
							uebUnsOpen = false;
							schuetzenOpen = !schuetzenOpen;
						}}
						onkeydown={(e) => handleDropdownKeydown(e, () => (schuetzenOpen = !schuetzenOpen))}
					>
						Aktuelle Infos
						<svg
							class="h-3 w-3 transition-transform"
							class:rotate-180={schuetzenOpen}
							viewBox="0 0 10 6"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M0 0l5 6 5-6z" />
						</svg>
					</button>
					{#if schuetzenOpen}
						<ul
							class="absolute top-full left-0 z-50 min-w-max rounded bg-surface-50 py-1 shadow-lg"
							role="menu"
						>
							{#each schuetzenLinks as link, i (link.href)}
								<li role="none">
									<a
										href={link.href}
										class="block px-4 py-2 text-sm text-surface-800 hover:bg-primary-50 focus:bg-primary-50 focus:outline-none"
										role="menuitem"
										onkeydown={(e) =>
											handleDropdownItemKeydown(
												e,
												schuetzenLinks,
												i,
												'[aria-haspopup]:last-of-type'
											)}
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			</ul>

			<!-- Mobile hamburger -->
			<button
				class="rounded p-2 hover:bg-primary-600 md:hidden"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-menu"
				aria-label={mobileMenuOpen ? 'Menü schliessen' : 'Menü öffnen'}
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
			<ul id="mobile-menu" class="border-t border-primary-600 pb-3 pt-2 md:hidden">
				<li>
					<a href={resolve('/')} class="block px-4 py-3 text-sm hover:bg-primary-600">Home</a>
				</li>
				<li>
					<a href={resolve('/news')} class="block px-4 py-3 text-sm hover:bg-primary-600">News</a>
				</li>
				<li>
					<button
						class="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-primary-600"
						onclick={() => (uebUnsMobileOpen = !uebUnsMobileOpen)}
						aria-expanded={uebUnsMobileOpen}
					>
						Über uns
						<svg
							class="h-3 w-3 transition-transform"
							class:rotate-180={uebUnsMobileOpen}
							viewBox="0 0 10 6"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M0 0l5 6 5-6z" />
						</svg>
					</button>
					{#if uebUnsMobileOpen}
						<ul class="bg-primary-800">
							{#each uebUnsLinks as link (link.href)}
								<li>
									<a href={link.href} class="block px-8 py-3 text-sm hover:bg-primary-600">
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
				<li>
					<button
						class="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-primary-600"
						onclick={() => (schuetzenMobileOpen = !schuetzenMobileOpen)}
						aria-expanded={schuetzenMobileOpen}
					>
						Aktuelle Infos
						<svg
							class="h-3 w-3 transition-transform"
							class:rotate-180={schuetzenMobileOpen}
							viewBox="0 0 10 6"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M0 0l5 6 5-6z" />
						</svg>
					</button>
					{#if schuetzenMobileOpen}
						<ul class="bg-primary-800">
							{#each schuetzenLinks as link (link.href)}
								<li>
									<a href={link.href} class="block px-8 py-3 text-sm hover:bg-primary-600">
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
