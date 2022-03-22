<script>
	import { page } from '$app/stores';
</script>

<nav>
	<ul>
		<li class:active={$page.url.pathname === '/'}>
			<a href="/">Home</a>
		</li>
		<li class:active={$page.url.pathname.endsWith('gallery/')}>
			<a href="/gallery"> Gallery </a>
		</li>
		<li class:active={$page.url.pathname.endsWith('summernote/')}>
			<a href="/summernote">Summernote</a>
		</li>
		<li class:active={$page.url.pathname.endsWith('backdrop/')}>
			<a href="/backdrop">Backdrop</a>
		</li>
	</ul>
</nav>

<style>
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
		border-bottom: 1pt solid var(--muted);
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

	nav > ul > li.active > a {
		color: var(--active);
	}

	nav > ul > li > a {
		text-decoration: none;
		color: var(--dark);
	}
</style>
