<script>
	import { goto } from '$app/navigation';
	import HiLockClosed from '$lib/components/HeroIcon/outline/HiLockClosed.svelte';
	import userData from '../../stores/userData';

	$: email = '';
	$: password = '';

	const submitForm = async () => {
		const form = new FormData();
		form.append('email', email);
		form.append('password', password);

		const action = 'http://svelte-app.localhost/api/login';
		const resp = await fetch(action, {
			headers: { Accept: 'application/json' },
			method: 'POST',
			body: form,
		});

		if (resp.status !== 200) {
			alert(`Failed to submit form reason "${resp.status} ${resp.statusText}"`);
			console.error(`Failed to submit form reason "${resp.status} ${resp.statusText}"`);
			return;
		}

		console.log(await resp.json());
		$userData.loggedin = true;
		await goto('/');
	};
</script>

<div class="grid">
	<form class="card" on:submit|preventDefault={submitForm}>
		<header>
			<i class="icon"><HiLockClosed /></i> Login
		</header>
		<main>
			<label for="email">Email</label>
			<input
				type="email"
				name="email"
				placeholder="email@example.com"
				bind:value={email}
				autocomplete="email"
			/>
			<label for="password">Password</label>
			<input
				type="password"
				name="password"
				placeholder="********"
				bind:value={password}
				autocomplete="current-password"
			/>
		</main>
		<footer>
			<button type="submit">Submit</button>
		</footer>
	</form>
</div>

<style>
	button {
		display: inline-block;
		box-sizing: border-box;
		padding: 0.2rem 0.5rem;
		border: 1pt solid lightgray;
		border-radius: 0.2rem;
		font-family: inherit;
	}

	button:is(:hover, :focus) {
		box-shadow: inset 0 0 0.2rem var(--info);
	}

	button:active {
		background-color: var(--muted);
	}

	.icon {
		display: inline-block;
		box-sizing: border-box;
		width: 1em;
		height: 1em;
		padding: 0;
		margin: 0;
	}

	.grid {
		display: grid;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		grid-template-columns: minmax(1fr, 600px);
		justify-content: center;
		align-items: center;
	}

	.card {
		display: inline-block;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		border-radius: 0.5rem;
		border: 1pt solid lightgray;
		background-color: white;
	}

	header,
	main,
	footer {
		display: block;
		box-sizing: border-box;
		margin: 0;
		padding: 0.5rem 1rem;
	}

	header {
		margin-bottom: 0.5rem;
		border-bottom: 1pt solid lightgray;
		font-size: 1.5rem;
	}

	footer {
		margin-top: 0.5rem;
		border-top: 1pt solid lightgray;
	}

	input {
		display: block;
		box-sizing: border-box;
		width: 100%;
		padding: 0.5rem 1rem;
		border-radius: 0.2rem;
		border: 1pt solid lightgray;
		font-size: 1em;
	}

	input:focus {
		outline: none;
		box-shadow: inset 0 0 0.2rem var(--info);
	}

	input[type='password'] {
		font-family: 'Roboto Mono', monospace;
		font-size: 1em;
		line-height: 1rem;
	}
</style>
