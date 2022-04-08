<script>
	import Icon from '$lib/components/Icon/Icon.svelte';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';

	/** @param {string} err */
	const notifyError = (err) => {
		toast.push(`Upload Failed! "${err}"`, {
			duration: 20000,
			theme: {
				'--toastColor': '#FFDDDD',
				'--toastBackground': '#F56565',
				'--toastBarBackground': '#C53030'
			}
		});
	};

	const notifySuccess = () => {
		toast.push(`Upload Success!`);
	};

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

		formBody.querySelectorAll('.form-control').forEach(
			(
				/** @type {HTMLInputElement} */
				each
			) => {
				if (each.type === 'file') {
					body.append(each.name, each.files[0]);
					return;
				}
				body.append(each.name, each.value || '');
			}
		);

		await fetch('http://laravel-gallery.localhost/gallery/upload', {
			mode: 'cors',
			method: 'POST',
			headers: { Accept: 'application/json' },
			body: body
		})
			.then((res) => {
				if (!res.ok) {
					console.error(res.status, res.statusText);
					notifyError(res.statusText);
					return;
				}
				notifySuccess();
			})
			.catch((err) => {
				console.error(err);
				notifyError(err);
			});
	};
</script>

<SvelteToast />

<div class="container">
	<div class="row my-3">
		<div class="col col-12 col-md-8 col-xl-6 mx-auto">
			<form class="card" on:submit|preventDefault={doSubmit}>
				<div class="card-header">Upload Image</div>
				<div class="card-body" bind:this={formBody}>
					<div bind:this={formInputs}>
						<div class="mb-2">
							<label for="image[]">Image</label>
							<input class="form-control form-control-sm" type="file" name="image[]" required />
						</div>
						<div class="mb-2">
							<label for="title[]">Title</label>
							<input
								class="form-control form-control-sm"
								type="text"
								name="title[]"
								placeholder="Beach Scenery"
							/>
						</div>
						<div class="mb-2">
							<label for="caption[]">caption</label>
							<textarea
								class="form-control form-control-sm"
								name="caption[]"
								rows="1"
								placeholder="Beautiful day on the beach with friends"
							/>
						</div>
						<hr />
					</div>
				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-sm btn-primary">Submit</button>
					<button
						type="button"
						class="btn btn-sm btn-outline-primary"
						on:click={() => {
							const newInputs = formInputs.cloneNode(true);
							// reset input all value after clone
							// @ts-ignore
							newInputs.querySelectorAll('.form-control').forEach((e) => (e.value = ''));
							formBody.appendChild(newInputs);
							formCount++;
						}}
					>
						<Icon>+</Icon>
					</button>
					<button
						type="button"
						class="btn btn-sm btn-outline-success"
						on:click={() => {
							// dont remove element if its the only one
							// reset their value instead
							if (formCount < 1) {
								formInputs.querySelectorAll('.form-control').forEach(
									(
										/** @type {HTMLInputElement} */
										each
									) => (each.value = '')
								);
								return;
							}
							formBody.lastElementChild.remove();
							formCount--;
						}}
					>
						<Icon>-</Icon>
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
