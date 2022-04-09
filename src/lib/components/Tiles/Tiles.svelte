<script>
	import { LightboxStore } from '$lib/components/Lightbox/LightboxStore';

	/**
	 * @typedef {object} ImageObj
	 * @property {number} id
	 * @property {string} mimetype
	 * @property {string} fileurl
	 * @property {string} filename
	 * @property {string} title
	 * @property {string} caption
	 * @property {string} uploaded_at
	 */

	/** @type {ImageObj[]} */
	export let images = [];
</script>

<div class="tiles">
	{#each images as img, idx (img.id)}
		<img
			src={img.fileurl}
			alt={img.title}
			on:click|preventDefault={() => {
				LightboxStore.set({ show: true, start: idx });
			}}
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
	}

	img:is(:hover, :focus) {
		box-shadow: inset 0 0 0 0.2rem rgba(100, 100, 100, 0.3);
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
