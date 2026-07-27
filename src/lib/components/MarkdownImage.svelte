<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		title?: string;
	}

	let { src, alt, title }: Props = $props();
</script>

<enhanced:img
	{src}
	{alt}
	{title}
	class="mx-auto my-8 max-h-96 max-w-full sm:max-w-sm w-auto rounded-lg object-cover"
/>
