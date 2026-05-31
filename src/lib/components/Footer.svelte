<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<footer class="mt-12 bg-primary-800 text-primary-100">
	<div class="mx-auto max-w-7xl px-4 py-8">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			<!-- Contact -->
			<div>
				<h2 class="text-sm font-bold tracking-wide text-primary-50 uppercase">Kontakt</h2>
				<address class="mt-3 space-y-1 text-sm not-italic">
					<p>Schützengesellschaft Bleienbach</p>
					<p>Schiessstand Gässli 25a</p>
					<p>3368 Bleienbach</p>
				</address>
			</div>

			<!-- Quick links -->
			<nav aria-label="Footer-Navigation">
				<h2 class="text-sm font-bold tracking-wide text-primary-50 uppercase">Navigation</h2>
				<ul class="mt-3 space-y-1 text-sm">
					<li>
						<a href={resolve('/news')} class="hover:text-primary-50 hover:underline">News</a>
					</li>
					<li>
						<a href={resolve('/infos#jahresprogramm')} class="hover:text-primary-50 hover:underline"
							>Jahresprogramm</a
						>
					</li>
					<li>
						<a href={resolve('/ueber-uns/geschichte')} class="hover:text-primary-50 hover:underline"
							>Geschichte</a
						>
					</li>
					<li>
						<a href={resolve('/ueber-uns/anfahrt')} class="hover:text-primary-50 hover:underline"
							>Anfahrt</a
						>
					</li>
					<li>
						<a href={resolve('/sponsoring')} class="hover:text-primary-50 hover:underline"
							>Sponsoring</a
						>
					</li>
				</ul>
			</nav>

			<!-- About -->
			<div>
				<h2 class="text-sm font-bold tracking-wide text-primary-50 uppercase">Verein</h2>
				<p class="mt-3 text-sm leading-relaxed">
					Die Schützengesellschaft Bleienbach pflegt seit 1893 den Schiesssport im Oberaargau.
					Tradition, Präzision und Kameradschaft.
				</p>
			</div>
		</div>

		<div class="mt-8 border-t border-primary-700 pt-4 text-center text-xs text-primary-300">
			<p>
				&copy; {new Date().getFullYear()} Schützengesellschaft Bleienbach. Alle Rechte vorbehalten.
			</p>
		</div>
	</div>
</footer>
