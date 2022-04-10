<script>
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import '$lib/css/global.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<div>
	<SvelteToast />
</div>
<div class="grid">
	<header>
		<slot name="header">
			<Navbar />
		</slot>
	</header>
	<main>
		<slot />
	</main>
	<footer>
		<slot name="footer">
			<Footer />
		</slot>
	</footer>
</div>

<style>
	.grid {
		display: grid;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr min-content;
	}
</style>
