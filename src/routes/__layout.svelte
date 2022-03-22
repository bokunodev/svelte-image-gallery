<script>
	import Navbar from '$lib/Navbar.svelte';
	import '../styles/global.css';
</script>

<Navbar />

<div class="container">
	<slot />
</div>

<style>
	.container {
		display: block;
		width: 1024px;
		max-width: 100%;
		height: 100%;
		margin: 0 auto;
	}
</style>
