import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable<{hasUpdate:boolean}>} */
export const imageStore = writable({ hasUpdate: true });
