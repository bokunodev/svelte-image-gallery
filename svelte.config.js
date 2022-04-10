import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false
		}),
		trailingSlash: 'never',
		prerender: {
			default: false,
			enabled: false
		}
	}
};

export default config;
