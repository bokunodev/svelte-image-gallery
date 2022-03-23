<script>
	import { fade } from 'svelte/transition';
	import HiX from '../HeroIcon/solid/HiX.svelte';
</script>

<div class="backdrop" transition:fade>
	<slot />

	<span class="close">
		<i class="icon">
			<HiX />
		</i>
	</span>
</div>

<style>
	.icon {
		display: inline-block;
		width: 1em;
		height: 1em;
		color: inherit;
	}

	.backdrop {
		display: grid;
		box-sizing: border-box;
		position: absolute;
		padding: 0;
		margin: 0;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1024;
		width: 100vw;
		height: 100vh;
		justify-content: center;
		align-items: center;
	}

	.close {
		display: flex;
		position: absolute;
		top: 0;
		right: 0;
		width: 4rem;
		height: 4rem;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.close:is(:hover, :focus) {
		color: var(--light);
		filter: drop-shadow(0 0 1rem white);
		text-shadow: 0 0 1rem white;
	}
</style>
