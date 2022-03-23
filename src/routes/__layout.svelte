<script context="module">
	export async function load({ url, params, props, fetch, session, stuff }) {
		return {
			//status: 307,
			//redirect: '/login',
		};
	}
</script>

<script>
	import { browser } from '$app/env';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import '../styles/global.css';

	onMount(async () => {
		if (browser) {
			console.log(document.cookie);
		}
		//goto('/login');
	});

	/** @param {HTMLElement} elm */
	export async function isLoggedIn(elm) {
		if (browser) {
			console.log('use');
		}
		//goto('/login');
	}
</script>

<Navbar />

<div class="container" use:isLoggedIn>
	<slot />
</div>

<style>
	.container {
		display: block;
		width: 1024px;
		max-width: 90%;
		height: 100%;
		margin: 0 auto;
	}
</style>
