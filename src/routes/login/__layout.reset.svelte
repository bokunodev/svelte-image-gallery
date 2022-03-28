<script context="module">
	import userData from '../../stores/userData';
	export async function load({ fetch }) {
		const resp = await fetch('http://svelte-app.localhost/api/cookielogin', {
			headers: { Accept: 'application/json' },
		});

		if (resp.ok || resp.status === 200) {
			userData.set({ loggedin: true });
			return {
				status: 307,
				redirect: '/',
			};
		}

		return { status: 200 };
	}
</script>

<div class="container">
	<slot />
</div>

<style>
	.container {
		display: block;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		width: 100vw;
		height: 100vh;
		background: url(/background.jpg) no-repeat fixed center;
		background-size: cover;
	}
</style>
