<script>
	import Tiles from '$lib/components/Tiles/Tiles.svelte';
	import { imageStore } from '$lib/stores/imagesStore';
</script>

<div class="container">
	<Tiles images={$imageStore} />
</div>
