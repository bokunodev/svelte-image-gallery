<script context="module">
	export const prerender = false;
</script>

<script>
	import HiChevronLeft from '$lib/icons/HiChevronLeft.svelte';
	import HiChevronRight from '$lib/icons/HiChevronRight.svelte';
	import { createEventDispatcher } from 'svelte';
	import { LightboxStore } from './LightboxStore';

	/** @type {Array<{src:string, alt:?string, id:number}>} */
	export let images = [];

	/** @type {number} */
	export let start = $LightboxStore.start;
	let offset = start + 1;

	$: counterValue = '';

	const dispatchEvent = createEventDispatcher();

	/** @param {HTMLElement} node */
	export function lightbox(node) {
		/** @type {HTMLElement} */
		const slider = node.querySelector('.slider');
		const firstItem = slider.firstChild.cloneNode(true);
		const lastItem = slider.lastChild.cloneNode(true);
		slider.append(firstItem);
		slider.prepend(lastItem);

		const container = node.querySelector('.slider-container');
		const width = container.clientWidth;
		const height = container.clientHeight;

		console.log(width, height);

		slider.style.transform = `translateX(-${offset * width}px)`;
		slider.style.height = `${height}px`;

		const items = node.querySelectorAll('.slider-item');
		const nitems = items.length;
		items.forEach((item) => {
			// @ts-ignore
			item.style.width = `${width}px`;
			// @ts-ignore
			item.style.height = `${height}px`;
		});

		const sliderTransition = 'transform .4s ease';
		counterValue = `${offset}/${nitems - 2}`;

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
			counterValue = `${offset}/${nitems - 2}`;
			slider.style.transform = `translateX(-${offset * width}px)`;
		};
	}
</script>

<div class="lightbox" use:lightbox>
	<div class="slider-container">
		<div class="slider">
			{#each images as img, _ (img.id)}
				<div class="slider-item">
					<img src={img.src} alt={img.alt} loading="lazy" />
				</div>
			{/each}
		</div>
	</div>
	<div
		class="slider-next muted-color clickable"
		on:click|preventDefault={() => dispatchEvent('lightboxNext', true)}
	>
		<i class="drop-shadow icon"><HiChevronRight /></i>
	</div>
	<div
		class="slider-prev muted-color clickable"
		on:click|preventDefault={() => dispatchEvent('lightboxPrev', true)}
	>
		<i class="drop-shadow icon"><HiChevronLeft /></i>
	</div>
	<div class="slider-counter">{counterValue}</div>
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

	.clickable {
		cursor: pointer;
	}

	.clickable:is(:hover, :focus) {
		color: orange !important;
		text-shadow: 0 0 1em orange;
	}

	.clickable .icon:is(:focus, :hover) {
		filter: drop-shadow(0 0 1rem orange);
	}

	.muted-color {
		color: rgba(255, 255, 255, 0.5) !important;
	}

	.lightbox {
		display: grid;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		color: white;
		width: 100%;
		height: 100%;
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

	.slider-container {
		order: 1;
		display: grid;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		width: 100% !important;
		height: 100% !important;
		overflow: hidden;
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
		filter: drop-shadow(0 0 0.5rem white);
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
		display: inline-block;
		box-sizing: border-box;
		padding: 2rem;
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
</style>
