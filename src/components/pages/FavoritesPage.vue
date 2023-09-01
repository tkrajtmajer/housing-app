<template>
  <div id="favorites">
    <h1 v-if="isMobile">Favorites</h1>
    <div v-if="selectedHouse === null && !editListing" class="container">
      <HouseListing class="listing-item" v-for="(data, index) in store.getFavorites()" :key="index" :data="data" @listingSelected="showHouseDetails" @deleteHouse="deleteHouse" @editHouse="editHouse"/>
    </div>
    <div v-if="selectedHouse !== null && !editListing">
      <HouseDetails :store="store" :houseDetails="selectedHouse" @backToOverview="backToOverview" @listingSelected="showHouseDetails" @deleteHouse="deleteHouse" @editHouse="editHouse"/>
    </div>
    <div v-if="editListing">
      <CreateListing :store="store" :title="title" :button="button" :initialData="selectedHouse" @backToOverview="backToOverview" @processForm="addNewListing"/>
    </div>
  </div>
</template>

<script>
import { houseStore } from '@/stores/houseStore'
import HouseListing from '../elements/HouseListing.vue'
import HouseDetails from './HouseDetails.vue'
import CreateListing from './CreateListing.vue'

export default {
  components: {
    HouseListing,
    HouseDetails,
    CreateListing
  },
  setup() {
    const store = houseStore();
    return { store };
  },
  data () {
    return {
      selectedHouse: null,
      title: 'Edit listing',
      button: 'SAVE',
      editListing: false
    }
  },
  props: ['isMobile'],
  methods: {
    async showHouseDetails(houseId) {
      const house = await this.store.getHouseByID(houseId);
      this.selectedHouse = house;
      window.scrollTo({ 
        top: 0,
        behavior: 'smooth'
      });
    },
    backToOverview() {
      this.selectedHouse = null;
      this.editListing = false;
      window.scrollTo({ 
        top: 0,
        behavior: 'smooth'
      });
    },
    async addNewListing({listingData, imageData}) {
      const edittedId = await this.store.editListing(this.selectedHouse.id, listingData, imageData);
      this.selectedHouse = await this.store.getHouseByID(edittedId);
      this.editListing = false;
    },
    deleteHouse(houseId) {
      this.store.deleteListing(houseId);
      this.backToOverview();
    },
    async editHouse(houseId) {
      this.selectedHouse = await this.store.getHouseByID(houseId);
      this.editListing = true;
    }
  }
}
</script>

<style scoped>
#listings {
  margin-top: 30px;
}
.listing-item {
  --hi-padding: 20px;
  --li-height: 35px;
  --image-width: 200px;
  --image-height: 200px;
  --font-size: 20px;
  --font-heading: 22px;
}
.button-basic {
  margin: 0;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  padding: 15px 20px 15px 20px;
}
@media (max-width: 800px) {
  h1 {
    text-align: center;
    padding-top: 30px;
  }
}
</style>