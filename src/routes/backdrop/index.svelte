<script>
	import Backdrop from '$lib/Backdrop.svelte';

	let show = false;
</script>

{#if show}
	<Backdrop>
		<h1>Hello World!</h1>
	</Backdrop>
{/if}
