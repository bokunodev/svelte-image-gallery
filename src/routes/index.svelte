<script>
	import Lightbox from '$lib/Lightbox.svelte';
	import Tiles from '$lib/Tiles.svelte';

	let images = [
		{ src: '/images/twitter_rei__k_1476153881331904512_1_thumb.jpg', alt: '...', id: 1 },
		{ src: '/images/twitter_rei__k_1476153881331904512_2_thumb.jpg', alt: '...', id: 2 },
		{ src: '/images/twitter_rei__k_1476153881331904512_3_thumb.jpg', alt: '...', id: 3 },
		{ src: '/images/twitter_rei__k_1476153881331904512_4_thumb.jpg', alt: '...', id: 4 }
	];

	let show = false;

	const toggleLigtbox = () => {
		show = !show;
	};
</script>

{#if show}
	<Lightbox {images} on:lightboxClose={toggleLigtbox} />
{/if}

<div class="container">
	<Tiles {images} />
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
