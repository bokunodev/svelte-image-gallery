<script>
	import Lightbox from '$lib/Lightbox.svelte';
	import Tiles from '$lib/Tiles.svelte';

	let images = [
		{ src: '/images/1.png', alt: '...', id: 1 },
		{ src: '/images/2.png', alt: '...', id: 2 },
		{ src: '/images/3.png', alt: '...', id: 3 },
		{ src: '/images/4.png', alt: '...', id: 4 },
		{ src: '/images/5.png', alt: '...', id: 5 },
		{ src: '/images/6.png', alt: '...', id: 6 }
	];

	let show = false;
	let index = 0;

	const toggleLigtbox = () => (show = !show);
</script>

{#if show}
	<Lightbox {images} start={index} on:lightboxClose={toggleLigtbox} />
{/if}

<div class="container">
	<Tiles
		{images}
		on:tileClick={(e) => {
			toggleLigtbox();
			index = e.detail.index;
		}}
	/>
</div>

<style>
	.container {
		display: block;
		width: 1024px;
		max-width: 100%;
		height: 100%;
		margin: 0 auto;
		background-color: var(--light);
	}
</style>
