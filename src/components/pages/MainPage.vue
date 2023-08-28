<template>
  <div id="houses-page" >
    <div v-if="selectedHouse === null && !createNewHouse">
      <HousesOverview :store="store" @listingSelected="showHouseDetails" @createNewListing="createNew" @deleteHouse="deleteHouse" @editHouse="editHouse"/>
    </div>
    <div v-if="selectedHouse !== null && !createNewHouse">
      <HouseDetails :store="store" :houseDetails="selectedHouse" @backToOverview="backToOverview" @listingSelected="showHouseDetails" @deleteHouse="deleteHouse" @editHouse="editHouse"/>
    </div>
    <div v-if="createNewHouse">
      <CreateListing :store="store" :title="title" :button="button" :initialData="selectedHouse" @backToOverview="backToOverview" @processForm="addNewListing"/>
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
      tempHouse: new House(1, null, 'Dolina', 13, null, 10000, 71000, 'Sarajevo', 2, 1, 100, 1970, false),
      title: '',
      button: '',
      editListing: false
    }
  },
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
      this.createNewHouse = false;
      this.store.handleSearch('');
      window.scrollTo({ 
        top: 0,
        behavior: 'smooth'
      });
    },
    createNew() {
      this.createNewHouse = true;
      this.title = 'Create new listing';
      this.button = 'POST';
      this.editListing = false;
    },
    async addNewListing({listingData, imageData}) {
      if(this.editListing) {
        const edittedId = await this.store.editListing(this.selectedHouse.id, listingData, imageData);
        this.selectedHouse = await this.store.getHouseByID(edittedId);
      }
      else {
        const createdId = await this.store.createNewListing(listingData, imageData);
        this.selectedHouse = await this.store.getHouseByID(createdId);
      }
      this.createNewHouse = false;
    },
    deleteHouse(houseId) {
      this.store.deleteListing(houseId);
    },
    async editHouse(houseId) {
      this.selectedHouse = await this.store.getHouseByID(houseId);
      this.title = 'Edit listing';
      this.button = 'SAVE';
      this.createNewHouse = true;
      this.editListing = true;
    }
  }
}
</script>