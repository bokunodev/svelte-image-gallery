<script>
	import HiX from '$lib/icons/HiX.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import Icon from './Icon.svelte';

	/** @type {bool} */
	export let show = false;

	/** @type {bool} */
	export let backdrop = true;

	const dispatchEvent = createEventDispatcher();
	const emitModalClose = () => dispatchEvent('modalClose', true);
</script>

{#if show}
	<div class="modal" class:backdrop transition:fly={{ y: -100 }} on:click|self={emitModalClose}>
		{#if backdrop}
			<span class="close" on:click={emitModalClose}>
				<Icon>
					<HiX />
				</Icon>
			</span>
		{/if}
		<div class="modal-content">
			<slot />
		</div>
	</div>
{/if}

<style>
	.backdrop {
		background-color: rgba(0, 0, 0, 0.7);
	}

	.modal {
		display: grid;
		box-sizing: border-box;
		position: fixed;
		justify-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1024;
	}

	.modal-content {
		display: grid;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		width: inherit !important;
		height: inherit !important;
		justify-content: center;
		align-items: center;
	}

	.close {
		display: flex;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 4rem;
		height: 4rem;
		padding: 0;
		margin: 0;
		top: 0;
		right: 0;
		color: rgba(255, 255, 255, 0.7);
		font-size: 2em;
	}

	.close:is(:hover, :focus) {
		color: white;
		filter: drop-shadow(0 0 0.3rem white);
		text-shadow: 0 0 0.3rem white;
	}
</style>
