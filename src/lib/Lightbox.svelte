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
	export function lightbox(node) {
		let offset = start + 1;

		const container = node.querySelector('.slider-container');

		const width = container.clientWidth;

		const slider = node.querySelector('.slider');
		const firstItem = slider.firstChild.cloneNode(true);
		const lastItem = slider.lastChild.cloneNode(true);
		slider.append(firstItem);
		slider.prepend(lastItem);

		slider.style.transform = `translateX(-${offset * width}px)`;
		const sliderTransition = 'transform .4s ease';
		slider.style.transition = sliderTransition;

		const items = node.querySelectorAll('.slider-item');
		const nitems = items.length;

		const counter = node.querySelector('.slider-counter');
		counter.textContent = `${offset}/${nitems - 2}`;

		const nextBtn = node.querySelector('.slider-next');
		const prevBtn = node.querySelector('.slider-prev');

		nextBtn.onclick = (e) => {
			if (offset > nitems - 2) return;
			slider.style.transition = sliderTransition;
			offset++;
			slider.style.transform = `translateX(-${offset * width}px)`;
		};

		prevBtn.onclick = (e) => {
			if (offset < 1) return;
			slider.style.transition = sliderTransition;
			offset--;
			slider.style.transform = `translateX(-${offset * width}px)`;
		};

		slider.ontransitionend = (e) => {
			if (offset < 1) {
				slider.style.transition = '';
				offset = nitems - 2;
			} else if (offset > nitems - 2) {
				slider.style.transition = '';
				offset = 1;
			}
			slider.style.transform = `translateX(-${offset * width}px)`;
			counter.tefxtContent = `${offset}/${nitems - 2}`;
		};
	}
</script>

<div class="lightbox" use:lightbox transition:fade>
	<div class="slider-container">
		<div class="slider">
			{#each images as img (img.id)}
				<div class="slider-item">
					<img src={img.src} alt={img.ald} />
				</div>
			{/each}
		</div>
	</div>
	<div class="slider-next muted-color clickable">&rsaquo;</div>
	<div class="slider-prev muted-color clickable">&lsaquo;</div>
	<div
		class="lightbox-close muted-color clickable"
		on:click={() => dispatch('lightboxClose', true)}
	>
		&times;
	</div>
	<div class="slider-counter" />
</div>

<style>
	img {
		display: inline-block;
		padding: 0;
		margin: 5%;
		object-fit: contain;
		max-width: 90%;
		width: auto;
		max-height: 90%;
		height: auto;
	}

	.clickable {
		cursor: pointer;
	}

	.clickable:is(:hover, :focus) {
		color: aquamarine !important;
		text-shadow: 0 0 1rem aquamarine;
	}

	.muted-color {
		color: rgba(255, 255, 255, 0.5) !important;
	}

	.lightbox * {
		box-sizing: inherit;
		color: inherit;
	}

	.lightbox {
		display: grid;
		box-sizing: border-box;
		z-index: 1025;
		position: absolute;
		top: 0;
		left: 0;
		padding: 0;
		margin: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.7);
		color: var(--light);
		grid-template-columns: min-content 1fr min-content;
		font-family: sans-serif;
	}

	.lightbox > .slider-container {
		order: 1;
		display: inline-grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.lightbox > .slider-container > .slider {
		display: flex;
		width: auto;
		height: 100% !important;
	}

	.lightbox > .slider-container > .slider > .slider-item {
		display: flex;
		height: 100% !important;
		justify-content: center;
		align-items: center;
		flex: 0 0 100% !important;
	}

	.lightbox > :is(.slider-prev, .slider-next, .lightbox-close, .slider-counter) {
		display: flex;
		width: 4rem;
		margin: 0;
		padding: 0;
		justify-content: center;
		align-items: center;
	}

	.lightbox > .slider-prev {
		order: 0;
		height: 100%;
		font-size: 2rem;
		font-weight: bold;
		font-family: monospace;
	}

	.lightbox > .slider-next {
		order: 2;
		height: 100%;
		font-size: 2rem;
		font-weight: bold;
		font-family: monospace;
	}

	.lightbox > .slider-next:is(:hover, :focus) {
		background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5));
	}

	.lightbox > .slider-prev:is(:hover, :focus) {
		background: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5));
	}

	.lightbox > .lightbox-close {
		position: absolute;
		height: 4rem;
		right: 0;
		font-size: 2rem;
		font-weight: bold;
		font-family: monospace;
		line-height: 1rem;
	}

	.lightbox > .slider-counter {
		position: absolute;
		height: 4rem;
		left: 0;
		font-weight: bold;
		font-family: monospace;
		line-height: 1rem;
	}

	.lightbox > .slider-counter:is(:hover, :focus) {
		text-shadow: 0 0 1rem white;
	}
</style>
