<template>
  <div class="container">
    <div class="vertical-section">
      <h1>Houses</h1>
      <button v-if="!isMobile" class="el-primary font-buttons button-basic" @click="this.$emit('createNewListing')">
        <img src="../../assets/ic_plus_white@3x.png" class="align icon"> 
        <span class="align">CREATE NEW</span>
      </button>
      <button v-if="isMobile" id="add-house-mobile" class="button-basic" @click="this.$emit('createNewListing')">
        <img src="../../assets/ic_plus_grey@3x.png" class="align icon">
      </button>
    </div>
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
      <HouseListing class="listing-item" v-for="(data, index) in store.queriedData" :key="index" :data="data" @listingSelected="this.$emit('listingSelected', data.id)" @deleteHouse="deleteHouse" @editHouse="editHouse" @likeHouse="likeHouse"/>
    </div>
    <div v-if="noResults">
      <EmptySearch/>
    </div>
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
  props: ['store', 'isMobile'],
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
    /**
     * Handles the results of querying the store, if there are results the number of results are displayed, else the EmptySearch component is displayed.
     * 
     * @param {*} query 
     */
    handleSearch(query) {
      this.store.handleSearch(query);
      if(this.store.getNrOfResults === 0) {
        this.noResults = true;
      }
      else {
        this.noResults = false;
      }
    },
    /**
     * Flag for whether the number of search results should be displayed.
     * 
     * @param {*} flag 
     */
    updateCounter(flag) {
      this.updateNrResults = flag;
    },
    /**
     * Handles deleting a house in the store.
     * 
     * @param {*} houseId 
     */
    deleteHouse(houseId) {
      this.store.deleteListing(houseId);
    },
    editHouse(houseId) {
      this.$emit('editHouse', houseId);
    }
  }
}
</script>

<style scoped>
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
.button-basic {
  margin: 0;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  padding: 15px 20px 15px 20px;
}
@media (max-width: 800px) {
  .vertical-section {
    display: inline;
    width: 100%;
    text-align: center;
  }
  .button-basic {
    background: none;
  }
  #add-house-mobile {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 10px;
  }
  .icon {
    width: auto;
    max-height: 20px;
  }
}
</style>
