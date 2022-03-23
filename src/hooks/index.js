import { browser } from '$app/env';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    if (browser) {
        console.log("xxx", document.cookie);
    }

    const response = await resolve(event);
    return response;
}

/** @type { import('@sveltejs/kit').GetSession } */
export function getSession(event) {
    console.log("ok");
    return {};
}
