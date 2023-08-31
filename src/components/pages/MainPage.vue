<template>
  <div id="houses-page" >
    <div v-if="selectedHouse === null && !createNewHouse">
      <HousesOverview :store="store" :isMobile="isMobile" @listingSelected="showHouseDetails" @createNewListing="createNew" @deleteHouse="deleteHouse" @editHouse="editHouse"/>
    </div>
    <div v-if="selectedHouse !== null && !createNewHouse">
      <HouseDetails :store="store" :houseDetails="selectedHouse" @backToOverview="backToOverview" @listingSelected="showHouseDetails" @deleteHouse="deleteHouse" @editHouse="editHouse"/>
    </div>
    <div v-if="createNewHouse">
      <CreateListing :store="store" :title="title" :button="button" :initialData="selectedHouse" @backToOverview="backToOverview" @processForm="addNewListing"/>
    </div>
  </div>
</template>

<script>
import { houseStore } from '@/stores/houseStore'
import HousesOverview from './HousesOverview.vue'
import HouseDetails from './HouseDetails.vue'
import CreateListing from './CreateListing.vue'

export default {
  components: {
    HousesOverview,
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
      createNewHouse: false,
      title: '',
      button: '',
      editListing: false
    }
  },
  props: ['isMobile'],
  methods: {
    /**
     * Toggles the HouseDetails component to be in the main view of the page. 
     */
    async showHouseDetails(houseId) {
      const house = await this.store.getHouseByID(houseId);
      this.selectedHouse = house;
      window.scrollTo({ 
        top: 0,
        behavior: 'smooth'
      });
    },
    /**
     * Toggles the HousesOverview component to be in the main view of the page. 
     */
    backToOverview() {
      this.selectedHouse = null;
      this.createNewHouse = false;
      this.store.handleSearch('');
      window.scrollTo({ 
        top: 0,
        behavior: 'smooth'
      });
    },
    /**
     * Toggles the CreateListing component to be in the main view of the page. 
     */
    createNew() {
      this.createNewHouse = true;
      this.title = 'Create new listing';
      this.button = 'POST';
      this.editListing = false;
    },
    /**
     * Accepts FormData from the CreateListing component, a new house listing is added through the store.
     */
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
      this.backToOverview();
    },
    /**
     * Toggles the CreateListing component to be in the main view of the page. The page will display text for editing an existing listing and will populate the form with existing listing data.
     */
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