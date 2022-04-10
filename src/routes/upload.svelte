<script>
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { notifyError, notifySuccess } from '$lib/notify';

	/**
	 * NOTE: Only HTMLInputElement are allowed to have `.form-control` class
	 */

	/** @type {HTMLElement} */
	let formBody;
	/** @type {HTMLElement} */
	let formInputs;
	let formCount = 0;

	const doSubmit = async () => {
		const body = new FormData();

		formBody.querySelectorAll('.form-control').forEach((/** @type {HTMLInputElement} */ each) => {
			if (each.type === 'file') {
				body.append(each.name, each.files[0]);
				return;
			}
			body.append(each.name, each.value || '');
		});

		const res = await fetch('http://gallery.localhost/gallery/upload', {
			mode: 'cors',
			method: 'POST',
			headers: { Accept: 'application/json' },
			body: body
		});

		if (!res.ok || res.status > 299) {
			console.error(res.status, res.statusText);
			notifyError(`${res.status} ${res.statusText}`);
			return;
		}

		notifySuccess('Upload Success!');
	};

	const addNewInputs = () => {
		const newInputs = formInputs.cloneNode(true);
		// reset input all value after clone
		// @ts-ignore
		newInputs.querySelectorAll('.form-control').forEach(
			(
				/** @type {HTMLInputElement} */
				each
			) => (each.value = '')
		);
		formBody.appendChild(newInputs);
		formCount++;
	};

	const removeLastInputs = () => {
		// dont remove element if its the only one
		// reset their value instead
		if (formCount < 1) {
			formInputs
				.querySelectorAll('.form-control')
				.forEach((/** @type {HTMLInputElement} */ each) => (each.value = ''));
			return;
		}
		formBody.lastElementChild.remove();
		formCount--;
	};
</script>

<div class="container">
	<div class="row my-3">
		<div class="col col-12 col-md-8 col-xl-6 mx-auto">
			<!--
			NOTE: to catch on:submit event, must call stopPropagation,
			to prevent chrome from submiting the form for twice.
			-->
			<form class="card" on:submit|preventDefault|stopPropagation={doSubmit}>
				<div class="card-header">Upload Image</div>
				<div class="card-body" bind:this={formBody}>
					<div bind:this={formInputs}>
						<div class="mb-2">
							<label for="image[]">Image</label>
							<input
								class="form-control form-control-sm"
								type="file"
								name="image[]"
								required
								accept=".webp,.png,.jpg,.apng,.gif,.avif"
							/>
						</div>
						<div class="mb-2">
							<label for="title[]">Title</label>
							<input
								class="form-control form-control-sm"
								type="text"
								name="title[]"
								placeholder="Beach Scenery"
								maxlength="100"
							/>
						</div>
						<div class="mb-2">
							<label for="caption[]">caption</label>
							<textarea
								class="form-control form-control-sm"
								name="caption[]"
								maxlength="200"
								rows="1"
								placeholder="Beautiful day on the beach with friends"
							/>
						</div>
						<hr />
					</div>
				</div>
				<div class="card-footer">
					<button class="btn btn-sm btn-primary" type="submit">Submit</button>
					<span class="btn btn-sm btn-outline-primary" on:click={addNewInputs}>
						<Icon>+</Icon>
					</span>
					<span class="btn btn-sm btn-outline-success" on:click={removeLastInputs}>
						<Icon>-</Icon>
					</span>
				</div>
			</form>
		</div>
	</div>
</div>
