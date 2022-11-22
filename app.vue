<script>
import {
  AisInstantSearchSsr,
  AisIndex,
  AisConfigure,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination,
  createServerRootMixin,
} from 'vue-instantsearch/vue3/es/index.js';
import algoliasearch from 'algoliasearch/lite';
import { renderToString } from 'vue/server-renderer';
import { useNuxtApp } from '#imports';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

export default {
  mixins:[
    createServerRootMixin({
      searchClient,
      indexName: 'instant_search',
      initialUiState: {
        instant_search: {
          query: 'iphone',
          page: 3,
        },
        refinement: {
          refinementList: {
            brand: ['Apple'],
          },
        },
        querySuggestions: {
          query: 'k',
          page: 2,
          configure: {
            hitsPerPage: 5,
          },
        },
      },
    })
  ],
  serverPrefetch() {
    const nuxtApp = useNuxtApp();

    return this.instantsearch
      .findResultsState({ component: this, renderToString })
      .then(algoliaState => {
        nuxtApp.payload.algoliaState = algoliaState;
      });
  },
  beforeMount() {
    const results = window.__NUXT__.algoliaState;
    this.instantsearch.hydrate(results);
  },
  components: {
    AisInstantSearchSsr,
    AisIndex,
    AisConfigure,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination,
  },
};
</script>

<template>
  <ais-instant-search-ssr>
    <ais-index
      index-name="instant_search_demo_query_suggestions"
      index-id="querySuggestions"
    >
      <ais-search-box />
      <ais-configure :hits-per-page.camel="5" />
      <ais-hits>
        <template v-slot:item="{ item }">
          <ais-highlight
            attribute="query"
            :hit="item"
          />
        </template>
      </ais-hits>
      <ais-pagination />
    </ais-index>
    <ais-search-box />
    <ais-stats />
    <ais-index
      index-id="refinement"
      index-name="instant_search"
    >
      <ais-refinement-list attribute="brand" />
    </ais-index>
    <ais-hits>
      <template v-slot:item="{ item }">
        <p>
          <ais-highlight
            attribute="name"
            :hit="item"
          />
        </p>
        <p>
          <ais-highlight
            attribute="brand"
            :hit="item"
          />
        </p>
      </template>
    </ais-hits>
    <ais-pagination />
  </ais-instant-search-ssr>
</template>

<style>
.ais-Hits-list {
  text-align: left;
}
.ais-Hits-list:empty {
  margin: 0;
}
.ais-InstantSearch {
  margin: 1em;
}
</style>
