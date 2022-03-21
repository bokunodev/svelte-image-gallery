<script>
	import '../style/global.css';
</script>

<svelte:head>
	<link rel="stylesheet" href="/vendor/summernote-0.8.20/dist/summernote-lite.min.css" />
	<script defer src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script defer src="/vendor/summernote-0.8.20/dist/summernote-lite.min.js"></script>
</svelte:head>

<nav>
	<ul>
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/Gallery">Gallery</a>
		</li>
		<li>
			<a href="/Summernote">Summernote</a>
		</li>
	</ul>
</nav>

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
		background-color: var(--light);
	}

	nav {
		display: block;
		box-sizing: border-box;
		padding: 0;
		margin: 0 0 1rem 0;
	}

	nav > ul {
		display: flex;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		list-style: none;
		flex-wrap: wrap;
		border-bottom: 1pt solid lightgray;
	}

	nav > ul > li {
		display: inline-block;
		box-sizing: border-box;
		padding: 0.5rem 1rem;
		margin: 0;
		flex: 1 1 auto;
	}

	nav > ul > li:is(:hover, :focus) {
		outline: 1pt solid var(--dark);
	}

	nav > ul > li > a {
		text-decoration: none;
		color: var(--dark);
	}
</style>
