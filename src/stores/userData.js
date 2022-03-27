import { writable } from "svelte/store";

const userData = writable({ loggedin: false });

export default userData
