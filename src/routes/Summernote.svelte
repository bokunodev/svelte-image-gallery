<script>
	/**
	 * @param {HTMLElement} node
	 */
	export function initSummernote(node) {
		/** @type {function(any, any):any} jQuery */
		const editor = jQuery(node).summernote();

		return {
			destroy() {
				editor.summernote('destroy');
			},
		};
	}
</script>

<textarea name="summernote-demo" id="summernote-demo" cols="30" rows="10" use:initSummernote />
