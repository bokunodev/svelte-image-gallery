<script>
	import Lightbox from '$lib/Lightbox.svelte';

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
	<Lightbox {images} showCounter={true} on:lightboxClose={toggleLigtbox} />
{/if}

<button on:click={toggleLigtbox}>show</button>
