<template>
  <h1>Houses</h1>
  <br><br>
  <div class="vertical-section">
    <SearchBar @newSearch="handleSearch" @updateResultsCount="updateCounter"/>
    <SortOptions @sortByOption="sortByOption"/>
  </div>
  <div v-if="updateNrResults && !noResults">
    <br><br>
    <h2><span id="nrResults">{{ this.store.getNrOfResults }}</span> results found</h2>
  </div>
  <div id="listings">
    <HouseListing class="listing-item" v-for="(data, index) in store.queriedData" :key="index" :data="data" @listingSelected="this.$emit('listingSelected', data.id)"/>
  </div>
  <div v-if="noResults">
    <EmptySearch/>
  </div>
</template>

<script>
import HouseListing from '../elements/HouseListing.vue'
import SearchBar from '../elements/SearchBar.vue'
import EmptySearch from '../elements/EmptySearch.vue'
import SortOptions from '../elements/SortOptions.vue'

export default {
  components: {
    HouseListing,
    SearchBar,
    EmptySearch,
    SortOptions
  },
  props: ['store'],
  data() {
    return {
      updateNrResults: false,
      noResults: false
    }
  },
  methods: {
    sortByOption({option, order}) {
      this.store.sortByOption({option, order});
    },
    handleSearch(query) {
      this.store.handleSearch(query);
      if(this.store.getNrOfResults === 0) {
        this.noResults = true;
      }
      else {
        this.noResults = false;
      }
    },
    updateCounter(flag) {
      this.updateNrResults = flag;
    }
  }
}
</script>

<style>
#listings {
  margin-top: 30px;
}
.listing-item {
  --hi-padding: 10px;
  --li-height: 35px;
  --image-width: 180px;
  --image-height: 180px;
  --font-size: 18px;
  --font-heading: 22px;
}
</style>
