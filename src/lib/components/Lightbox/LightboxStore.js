import { writable } from 'svelte/store';

export const LightboxStore = writable({ show: false, start: 0 });
