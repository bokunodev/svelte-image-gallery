<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	/** @type {Array<{src:string, alt:?string, id:int}>} images */
	export let images = [];

	/** @type {int} start */
	export let start = 0;

	const dispatch = createEventDispatcher();

	/**
	 * @param {Element} node
	 */
	export function lightboxSlider(node) {
		let offset = start + 1;

		const item = node.querySelector('.item');

		const firstImg = item.firstChild.cloneNode(true);
		const lastImg = item.lastChild.cloneNode(true);
		item.append(firstImg);
		item.prepend(lastImg);

		const nimgs = item.querySelectorAll('img').length;

		const nextBtn = node.querySelector('.next');
		const prevBtn = node.querySelector('.prev');

		const slideTransition = 'transform .2s ease';

		nextBtn.onclick = (e) => {
			if (offset > nimgs - 2) {
				return;
			}
			offset++;
			item.style.transition = slideTransition;
			item.style.transform = `translateX(calc(-${offset}*100%))`;
		};

		prevBtn.onclick = (e) => {
			if (offset < 1) {
				return;
			}
			offset--;
			item.style.transition = slideTransition;
			item.style.transform = `translateX(calc(-${offset}*100%))`;
		};

		item.ontransitionend = (e) => {
			if (offset >= nimgs - 1) {
				offset = 1;
				item.style.transition = '';
				item.style.transform = `translateX(calc(-${offset}*100%))`;
			} else if (offset <= 0) {
				offset = nimgs - 2;
				item.style.transition = '';
				item.style.transform = `translateX(calc(-${offset}*100%))`;
			}
		};
	}
</script>

<div class="lightbox" transition:fade use:lightboxSlider>
	{#if images.length > 0}
		<button class="prev" title="Prev">&lsaquo;</button>
		<div class="slide">
			<div class="item">
				{#each images as img (img.id)}
					<img src={img.src} alt={img.alt} loading="lazy" />
				{/each}
			</div>
		</div>
		<button class="next" title="Next">&rsaquo;</button>
	{/if}
	<span class="close" title="Close" on:click={() => dispatch('lightboxClose', true)}>&times;</span>
</div>

<style>
	.lightbox {
		display: grid;
		position: fixed;
		z-index: 1024;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		grid-template-columns: min-content 1fr min-content;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.lightbox > .close {
		display: inline-block;
		box-sizing: inherit;
		position: absolute;
		z-index: 1026;
		width: 4rem;
		height: 4rem;
		padding: 1.5rem;
		color: var(--light);
		font-size: 2rem;
		font-weight: bold;
		line-height: 1rem;
		top: 0;
		right: 0;
		justify-content: center;
		align-items: center;
	}

	.lightbox > .close:is(:hover, :focus) {
		text-shadow: 0 0 1rem var(--light);
	}

	.lightbox > .slide {
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.lightbox > .slide > .item {
		display: flex;
		box-sizing: inherit;
		width: auto;
		height: 100%;
		align-items: center;
		justify-items: center;
		margin: 0;
		padding: 0;
	}

	.lightbox > .slide > .item > img {
		max-width: 90% !important;
		max-height: 90% !important;
		margin: 5%;
		object-fit: contain;
	}

	.lightbox > :is(.prev, .next) {
		display: inline-block;
		box-sizing: inherit;
		z-index: 1025;
		margin: 0;
		padding: 0;
		width: 4rem;
		height: 100%;
		border: none;
		font-size: 2rem;
		font-weight: bold;
		font-family: monospace;
		text-align: center;
		background-color: transparent;
		color: rgba(255, 255, 255, 0.5);
	}

	.lightbox > .prev:is(:focus, :hover) {
		background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
		color: var(--primary);
		text-shadow: 0 0 1rem var(--primary);
	}

	.lightbox > .next:is(:focus, :hover) {
		background: linear-gradient(to left, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
		color: var(--primary);
		text-shadow: 0 0 1rem var(--primary);
	}
</style>
