<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import HiChevronLeft from './HeroIcon/outline/HiChevronLeft.svelte';
	import HiChevronRight from './HeroIcon/outline/HiChevronRight.svelte';
	import HiX from './HeroIcon/outline/HiX.svelte';

	/** @type {Array<{src:string, alt:?string, id:number}>} */
	export let images = [];

	/** @type {number} */
	export let start = 0;

	const dispatch = createEventDispatcher();

	/** @param {HTMLElement} node */
	export function lightbox(node) {
		let offset = start + 1;

		const container = node.querySelector('.slider-container');

		const width = container.clientWidth;
		const height = container.clientHeight;

		/** @type {HTMLElement} */
		const slider = node.querySelector('.slider');
		const firstItem = slider.firstChild.cloneNode(true);
		const lastItem = slider.lastChild.cloneNode(true);
		slider.append(firstItem);
		slider.prepend(lastItem);

		slider.style.transform = `translateX(-${offset * width}px)`;
		slider.style.height = `${height}px`;
		slider.style.maxHeight = `${height}px`;
		const sliderTransition = 'transform .4s ease';

		const items = node.querySelectorAll('img');
		items.forEach((e) => {
			e.style.width = `${width}px`;
			e.style.height = `${height}px`;
		});
		const nitems = items.length;

		const counter = node.querySelector('.slider-counter');
		counter.textContent = `${offset}/${nitems - 2}`;

		/** @type {HTMLElement} */
		const nextBtn = node.querySelector('.slider-next');
		/** @type {HTMLElement} */
		const prevBtn = node.querySelector('.slider-prev');

		nextBtn.onclick = () => {
			if (offset > nitems - 2) return;
			slider.style.transition = sliderTransition;
			offset++;
			slider.style.transform = `translateX(-${offset * width}px)`;
		};

		prevBtn.onclick = () => {
			if (offset < 1) return;
			slider.style.transition = sliderTransition;
			offset--;
			slider.style.transform = `translateX(-${offset * width}px)`;
		};

		slider.ontransitionend = () => {
			if (offset < 1) {
				slider.style.transition = '';
				offset = nitems - 2;
			} else if (offset > nitems - 2) {
				slider.style.transition = '';
				offset = 1;
			}
			slider.style.transform = `translateX(-${offset * width}px)`;
			counter.textContent = `${offset}/${nitems - 2}`;
		};
	}
</script>

<div class="lightbox" use:lightbox transition:fade>
	<div class="slider-container">
		<div class="slider">
			{#each images as img (img.id)}
				<div class="slider-item">
					<img src={img.src} alt={img.alt} loading="lazy" />
				</div>
			{/each}
		</div>
	</div>
	<div
		class="slider-next muted-color clickable"
		on:click|preventDefault={() => dispatch('lightboxNext', true)}
	>
		<i class="drop-shadow icon"><HiChevronRight /></i>
	</div>
	<div
		class="slider-prev muted-color clickable"
		on:click|preventDefault={() => dispatch('lightboxPrev', true)}
	>
		<i class="drop-shadow icon"><HiChevronLeft /></i>
	</div>
	<div
		class="lightbox-close muted-color clickable"
		on:click|preventDefault={() => dispatch('lightboxClose', true)}
	>
		<i class="drop-shadow icon"><HiX /></i>
	</div>
	<div class="slider-counter" />
</div>

<style>
	.icon {
		display: inline-block;
		box-sizing: border-box;
		width: 2rem;
		height: 2rem;
		padding: 0;
		margin: 0;
	}

	.icon:is(:focus, :hover) {
		filter: drop-shadow(0 0 1rem aqua);
	}

	.clickable {
		cursor: pointer;
	}

	.clickable:is(:hover, :focus) {
		color: aquamarine !important;
		text-shadow: 0 0 1em aqua;
	}

	.muted-color {
		color: rgba(255, 255, 255, 0.5) !important;
	}

	.lightbox {
		display: grid;
		box-sizing: border-box;
		position: absolute;
		padding: 0;
		margin: 0;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		color: var(--ligt);
		z-index: 1024;
		width: 100vw;
		height: 100vh;
		grid-template-columns: min-content 1fr min-content;
		grid-template-rows: 1fr;
	}

	.slider-next {
		order: 2;
		display: flex;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		width: 4rem;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.slider-next:is(:hover, :focus) {
		background: linear-gradient(to right, rgba(200, 200, 200, 0), rgba(200, 200, 200, 0.7));
	}

	.slider-prev {
		order: 0;
		display: flex;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		width: 4rem;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.slider-prev:is(:hover, :focus) {
		background: linear-gradient(to left, rgba(200, 200, 200, 0), rgba(200, 200, 200, 0.7));
	}

	.lightbox-close {
		display: flex;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		width: 4rem;
		height: 4rem;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		right: 0;
		font-family: monospace;
		font-size: 1.5rem;
		font-weight: bold;
	}

	.slider-container {
		order: 1;
		display: grid;
		width: 100%;
		height: 100%;
	}

	.slider-counter {
		display: flex;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		width: 4rem;
		height: 4rem;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		color: white;
	}

	.slider-counter:is(:hover, :focus) {
		text-shadow: 0 0 1rem white;
	}

	.slider-container {
		display: grid;
		overflow: hidden;
	}

	.slider {
		display: flex;
		box-sizing: border-box;
		width: auto;
		height: 100%;
		justify-content: center;
		align-content: center;
	}

	img {
		display: block;
		box-sizing: border-box;
		padding: 2rem;
		object-fit: contain;
	}
</style>
