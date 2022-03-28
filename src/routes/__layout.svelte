<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import userData from '../stores/userData';
	import '../styles/global.css';

	onMount(async () => {
		if ($userData.loggedin || $page.url.pathname === '/login') {
			return;
		}
		await goto('/login');
	});
</script>

{#if $userData.loggedin}
	<Navbar />

	<div class="container">
		<slot />
	</div>
{/if}

<style>
	.container {
		display: block;
		width: 1024px;
		max-width: 90%;
		height: 100%;
		margin: 0 auto;
	}
</style>
