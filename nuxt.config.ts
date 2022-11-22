// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    build: {
        transpile: ['vue-instantsearch/vue3'],
    },
    css: [
        'instantsearch.css/themes/algolia.css',
    ],
});
