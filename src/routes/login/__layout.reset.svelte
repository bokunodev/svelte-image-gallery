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
