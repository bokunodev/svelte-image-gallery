<script>
	/** @type {Array<{src:string, alt:?string, id:int}>} images */
	export let images = [];
</script>

<div class="tiles">
	{#each images as img (img.id)}
		<img src={img.src} alt={img.alt} />
	{/each}
</div>

<style>
	img {
		display: inline-block;
		width: 10em;
		height: 10em;
		object-fit: cover;
	}

	img:is(:hover, :focus) {
		outline: solid 0.5em rgba(0, 255, 255, 0.5);
	}

	.tiles * {
		box-sizing: inherit;
	}

	.tiles {
		display: grid;
		box-sizing: border-box;
		grid-template-columns: repeat(auto-fit, 10em);
		grid-template-rows: 10em;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 1rem;
		gap: 1rem;
	}
</style>
