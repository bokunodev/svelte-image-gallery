<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('http://gallery.localhost/gallery/list');
		if (!res.ok || res.status > 299) {
			console.error(`Error: ${res.status} ${res.statusText}`);
			notifyError('Error: failed to fetch images from server');
			return { status: res.status };
		}

		const dataJson = await res.json();
		imageStore.set({ hasUpdate: true });

		return { status: 200, props: { images: dataJson.data.items } };
	}
</script>

<script>
	import Tiles from '$lib/components/Tiles/Tiles.svelte';
	import { notifyError } from '$lib/notify';
	import { imageStore } from '$lib/stores/imagesStore';

	export let images = [];
</script>

<div class="container">
	<Tiles {images} />
</div>
