<script>
	/** @param {HTMLElement} node */
	export function initSummernote(node) {
		// @ts-ignore
		const editor = jQuery(node).summernote();

		return {
			destroy() {
				// @ts-ignore
				editor.summernote('destroy');
			},
		};
	}
</script>

<textarea name="summernote-demo" id="summernote-demo" cols="30" rows="10" use:initSummernote />
