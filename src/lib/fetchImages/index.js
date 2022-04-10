import { notifyError } from "$lib/notify";

export const fetchImages = async () => {
    const res = await fetch('http://gallery.localhost/gallery/list');
    if (!res.ok || res.status > 299) {
        console.error(`Error: ${res.status} ${res.statusText}`);
        notifyError('Error: failed to fetch images from server');
        return { status: res.status };
    }

    const dataJson = await res.json();
    return dataJson
}
