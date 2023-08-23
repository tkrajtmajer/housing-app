<template>
  <div id="main-page">
    <HousesOverview :store="store" />
  </div>
</template>

<script>
import { houseStore } from '@/stores/houseStore'
import HousesOverview from './HousesOverview.vue'

export default {
  components: {
    HousesOverview
  },
  setup() {
    const store = houseStore();

    if(!store.dataWasFetched) {
      store.getHouseListings();
    }
    // console.log(store.queriedData);
    return { store };
  }
}
</script>