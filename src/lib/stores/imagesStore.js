import { toast } from "@zerodevx/svelte-toast";
import { writable } from "svelte/store";

/**
 * @typedef {object} Images
 * @property {boolean} update
 * @property {Array<{id:number,src:string,title:string,mimetype:string,caption:string,uploaded_at:string}>} data
 */

/** @type {import("svelte/store").Writable<Images>} */
export const imageStore = writable({ update: false, data: [] });

export const doReFetchImages = async () => {
    const res = await fetch('http://gallery.localhost/gallery/list')
    if (!res.ok || res.status < 299) {
        console.error(`Error: ${res.status} ${res.statusText}`);
        toast.push("Error: failed to fetch images from server");
        return;
    }

    let data;
    try {
        data = res.json();
    } catch (err) {
        console.error(`Error: ${res.status} ${res.statusText}`);
        toast.push("Error: failed to fetch images from server");
        return;
    }
    console.log(data);
}
