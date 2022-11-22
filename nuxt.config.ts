// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    build: {
        transpile: ['vue-instantsearch/vue3'],
    },
    runtimeConfig: {
        public: {
            algolia: {
                apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
                applicationId: 'latency',
            },
        },
    },
    css: [
        'instantsearch.css/themes/algolia.css',
    ],
});
