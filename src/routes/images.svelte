<script context="module">
	export async function load({ fetch }) {
		const dataJson = await fetchImages();
		return { status: 200, props: { images: dataJson.data.items } };
	}
</script>

<script>
	import { formatDatetime } from '$lib/datetimeFormater';
	import { fetchImages } from '$lib/fetchImages';
	import { notifyError } from '$lib/notify';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	/**
	 * @typedef {object} ImageObj
	 * @property {number} id
	 * @property {string} mimetype
	 * @property {string} fileurl
	 * @property {string} filename
	 * @property {string} title
	 * @property {string} caption
	 * @property {string} uploaded_at
	 */

	/** @type {ImageObj[]} */
	export let images = [];

	/** @param {number} id */
	const deleteImage = async (id) => {
		const res = await fetch(`http://gallery.localhost/gallery/delete/${id}`);
		if (!res.ok || res.status > 299) {
			console.error(`Error: ${res.status} ${res.statusText}`);
			notifyError('Error: failed to fetch images from server');
			return { status: res.status };
		}

		const dataJson = await fetchImages();
		images = dataJson.data.items;
	};
</script>

<div class="container">
	<div class="container">
		<div class="row my-3">
			{#each images as img, _ (img.id)}
				<div
					class="col col-12 col-md-3 mb-3"
					transition:fade={{ duration: 200 }}
					animate:flip={{ duration: 400 }}
				>
					<div class="card">
						<span
							on:click={() => deleteImage(img.id)}
							class="thumbnail-badge position-absolute bg-danger d-flex justify-content-center align-middle rounded"
							title="Delete"
						>
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</span>

						<img src={img.fileurl} class="card-img-top" alt={img.title || '...'} />
						<div class="card-body">
							<blockquote class="blockquote mb-0">
								<p>{img.title || '...'}</p>
								<footer class="blockquote-footer">{img.caption || '...'}</footer>
							</blockquote>
						</div>
						<div class="card-footer">
							<small class="text-muted">{formatDatetime(img.uploaded_at)}</small>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	img {
		height: 16rem;
		object-fit: cover;
		cursor: pointer;
	}

	.thumbnail-badge {
		visibility: hidden;
		opacity: 0;
		cursor: pointer;
		width: 2rem;
		height: 2rem;
		top: 0.2rem;
		left: 0.3rem;
		transition: opacity 0.2s ease;
	}

	.card:is(:focus, :hover, :active) .thumbnail-badge {
		visibility: visible;
		opacity: 1;
	}

	@media screen and (max-width: 768px) {
		.thumbnail-badge {
			visibility: visible;
			opacity: 1;
		}
	}
</style>
