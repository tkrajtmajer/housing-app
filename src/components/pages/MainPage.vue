<template>
  <div id="houses-page" >
    <div v-if="selectedHouse === null && !createNewHouse">
      <HousesOverview :store="store" @listingSelected="showHouseDetails" @createNewListing="createNew" />
    </div>
    <div v-if="selectedHouse !== null && !createNewHouse">
      <HouseDetails :store="store" :houseDetails="selectedHouse" @backToOverview="backToOverview" @listingSelected="showHouseDetails"/>
    </div>
    <div v-if="createNewHouse">
      <CreateListing :store="store" @backToOverview="backToOverview" @processForm="addNewListing"/>
    </div>
    <!-- <HouseDetails :store="store" :houseDetails="tempHouse"></HouseDetails> -->
  </div>
</template>

<script>
import { houseStore } from '@/stores/houseStore'
import HousesOverview from './HousesOverview.vue'
import HouseDetails from './HouseDetails.vue'
import CreateListing from './CreateListing.vue'
import House from '@/models/House';

export default {
  components: {
    HousesOverview,
    HouseDetails,
    CreateListing
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
      createNewHouse: false,
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
      this.createNewHouse = false;
    },
    createNew() {
      this.createNewHouse = true;
    },
    async addNewListing({listingData, imageData}) {
      const createdId = await this.store.createNewListing(listingData, imageData);
      this.selectedHouse = await this.store.getHouseByID(createdId);
      this.createNewHouse = false;
    }
  }
}
</script>