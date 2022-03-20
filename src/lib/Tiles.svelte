<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	/** @type {Array<{src:string, alt:?string, id:number}>} */
	export let images = [];
</script>

<div class="tiles">
	{#each images as img, idx (img.id)}
		<img
			src={img.src}
			alt={img.alt}
			on:click|preventDefault={() => dispatch('tileClick', { index: idx })}
			loading="lazy"
		/>
	{/each}
</div>

<style>
	img {
		display: inline-block;
		width: 12rem;
		height: 12rem;
		object-fit: cover;
		padding: 0.5rem;
		border: 1pt solid lightgray;
	}

	img:is(:hover, :focus) {
		border-color: gray;
		box-shadow: 0.1rem 0.1rem 1rem lightgray;
	}

	.tiles * {
		box-sizing: inherit;
	}

	.tiles {
		display: grid;
		box-sizing: border-box;
		grid-template-columns: repeat(auto-fit, 12em);
		grid-template-rows: 12rem;
		justify-content: center;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 1rem;
		gap: 1rem;
	}
</style>
