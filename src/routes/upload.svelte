<script>
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

	let image;
	let title = '';
	let caption = '';

	const doSubmit = async () => {
		const body = new FormData();
		body.append('image[]', image);
		body.append('title[]', title);
		body.append('caption[]', caption);
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
				<div class="card-body">
					<div class="mb-2">
						<label for="image[]">Image</label>
						<input
							class="form-control form-control-sm"
							type="file"
							name="image[]"
							on:change={(e) => {
								// @ts-ignore
								image = e.target.files[0];
							}}
						/>
					</div>
					<div class="mb-2">
						<label for="title[]">Title</label>
						<input
							class="form-control form-control-sm"
							type="text"
							name="title[]"
							placeholder="Beach Scenery"
							bind:value={title}
						/>
					</div>
					<div class="mb-2">
						<label for="caption[]">caption</label>
						<textarea
							bind:value={caption}
							class="form-control form-control-sm"
							name="caption[]"
							placeholder="Beautiful day on the beach with friends"
						/>
					</div>
				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-sm btn-primary">Submit</button>
				</div>
			</form>
		</div>
	</div>
</div>
