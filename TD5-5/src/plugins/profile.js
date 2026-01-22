import { ref } from 'vue';

export const pseudo = ref('');

export default {
    install: (app) => {
        app.provide('pseudo', pseudo);
    }
};