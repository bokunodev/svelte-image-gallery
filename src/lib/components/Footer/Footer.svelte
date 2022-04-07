<script>
	import Icon from '../Icon/Icon.svelte';
</script>

<div class="footer">
	Made with&nbsp;
	<span style="color:deeppink;">
		<Icon>
			<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
				/>
			</svg>
		</Icon>
	</span>
	<span class="divider" />
	&copy; 2022
</div>

<style>
	* {
		box-sizing: border-box;
	}

	.footer {
		display: flex;
		line-height: 1;
		box-sizing: border-box;
		background-color: #ddd;
		padding: 1rem 2rem;
	}

	.divider {
		display: inline-block;
		margin-left: auto;
	}
</style>
