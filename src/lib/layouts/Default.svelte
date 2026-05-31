<script lang="ts">
	let { children } = $props();
</script>

<article class="mx-auto prose prose-lg max-w-3xl dark:prose-invert">
	{@render children()}
</article>
