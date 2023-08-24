<template>
  <div id="houses-page" >
    <div v-if="selectedHouse === null">
      <HousesOverview :store="store" @listingSelected="showHouseDetails"/>
    </div>
    <div v-else>
      <HouseDetails :store="store" :houseDetails="selectedHouse" @backToOverview="backToOverview" @listingSelected="showHouseDetails"/>
    </div>
    <!-- <HouseDetails :store="store" :houseDetails="tempHouse"></HouseDetails> -->
  </div>
</template>

<script>
import { houseStore } from '@/stores/houseStore'
import HousesOverview from './HousesOverview.vue'
import HouseDetails from './HouseDetails.vue'
import House from '@/models/House';

export default {
  components: {
    HousesOverview,
    HouseDetails
  },
  setup() {
    const store = houseStore();

    if(!store.dataWasFetched) {
      store.getHouseListings();
    }

    return { store };
  },
  data () {
    return {
      selectedHouse: null,
      tempHouse: new House(1, null, 'Dolina', 13, null, 10000, 71000, 'Sarajevo', 2, 1, 100, 1970, false)
    }
  },
  methods: {
    async showHouseDetails(houseId) {
      const house = await this.store.getHouseByID(houseId);
      this.selectedHouse = house;
    },
    backToOverview() {
      this.selectedHouse = null;
      this.store.handleSearch('');
    }
  }
}
</script>