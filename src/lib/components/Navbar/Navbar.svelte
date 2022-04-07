<script>
	import Icon from '../Icon/Icon.svelte';

	let expand = false;
</script>

<nav class="navbar" class:expand>
	<a href="/" class="navbrand">
		<img src="/favicon.png" alt="..." />&nbsp;&nbsp;Gallery
	</a>
	<a href="#!" class="navtoggler" on:click={() => (expand = !expand)}>
		<Icon>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</Icon>
	</a>
	<span class="divider" />
	<a href="/images" class="navitem">
		<Icon>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
		</Icon>&nbsp;&nbsp;Images
	</a>
	<a href="/upload" class="navitem">
		<Icon>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				/>
			</svg>
		</Icon>&nbsp;&nbsp;Upload
	</a>
</nav>

<style>
	* {
		box-sizing: border-box;
	}

	.navbar {
		display: flex;
		padding: 0;
		margin: 0;
		width: 100%;
		max-width: 100%;
		flex-wrap: wrap;
		border-bottom: 1pt solid lightgray;
		background-color: #eee;
	}

	.navbar * {
		line-height: 1;
		text-decoration: none;
		color: darkslategray;
	}

	.navbrand,
	.navitem {
		height: 4rem;
		padding: 0.7rem 1rem;
	}

	.navbrand {
		display: inline-flex;
		margin: 0;
		width: auto;
		align-items: center;
		font-size: 1em;
		font-weight: bold;
	}

	.navbrand > img {
		display: inline-block;
		padding: 0;
		margin: 0;
		width: auto;
		height: 100%;
		object-fit: contain;
	}

	.navitem {
		display: inline-flex;
		margin: 0;
		align-items: center;
	}

	.navtoggler:is(:hover, :focus),
	.navtoggler:is(:hover, :focus) *,
	.navitem:is(:hover, :focus),
	.navitem:is(:hover, :focus) * {
		background-color: #ddd;
		color: salmon;
	}

	.divider {
		display: inline-block;
		padding: 0;
		margin-left: auto;
	}

	.navtoggler {
		display: none;
	}

	@media screen and (max-width: 768px) {
		.divider {
			display: none;
		}

		.navbar {
			flex-direction: column;
			height: 4rem;
			overflow: hidden;
			transition: height 1s ease;
		}

		.navbar.expand {
			height: auto;
		}

		.navtoggler {
			display: flex;
			padding: 0;
			margin: 0;
			height: 4rem;
			width: 4rem;
			font-size: 2rem;
			position: absolute;
			right: 0;
			justify-content: center;
			align-items: center;
		}

		.navbrand,
		.navitem {
			width: 100%;
		}

		.navbrand {
			border-bottom: 1pt solid lightgray;
		}
	}
</style>
