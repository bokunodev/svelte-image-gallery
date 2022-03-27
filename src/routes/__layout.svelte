<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import userData from '../stores/userData';
	import '../styles/global.css';

	const action = 'http://local.pc/api/cookielogin';

	onMount(async () => {
		if (!$userData.loggedin && $page.url.pathname !== '/login') {
			const resp = await fetch(action, { headers: { Accept: 'application/json' } });
			if (resp.status !== 200) {
				await goto('/login');
				return;
			}

			console.log(await resp.json());
			$userData.loggedin = true;
		}
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
