import { writable } from "svelte/store";

/** @type {import("svelte/store").Writable<Array<{id:number,src:string,title:string,mimetype:string,caption:string,uploaded_at:string}>>} */
export const imageStore = writable([]);
