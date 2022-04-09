import { toast } from "@zerodevx/svelte-toast";

/** @param {string} err */
export const notifyError = (err) => {
    toast.push(`Upload Failed! "${err}"`, {
        duration: 20000,
        theme: {
            '--toastColor': '#FFDDDD',
            '--toastBackground': '#F56565',
            '--toastBarBackground': '#C53030'
        }
    });
};


/** @param {string} msg */
export const notifySuccess = (msg) => {
    toast.push(msg);
};
