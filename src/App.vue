<template>
  <NavBar/>
  <div id="main-content">
    <h1>Houses</h1>
    <br>
    <SearchBar @newSearch="handleSearch"/>
    <div id="listings">
      <HouseListing :responseData="queriedData"/>
    </div>
    <div v-if="noResults">
      <EmptySearch/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import HouseListing from './components/HouseListing.vue'
import SearchBar from './components/SearchBar.vue'
import EmptySearch from './components/EmptySearch.vue'
import House from './models/House.js'

export default {
  name: 'App',
  components: {
    NavBar,
    HouseListing,
    SearchBar,
    EmptySearch
  },
  data() {
    return {
      responseData: [],
      queriedData: []
    };
  },
  methods: {
    async getHouseListings() {
      const apikey = 'qMjVn2QEhdDCeO95Lk1wHcI7FU3gJomG'; 

      try {
        const response = await fetch('https://api.intern.d-tt.nl/api/houses', {
          headers: {
            'X-Api-Key': apikey
          }
        });

        if (response.ok) {
          const data = await response.json();

          for(const el of data) {
            // process the data into separate house objects
            const house = new House(el.image, el.location.street, el.price, el.location.zip, el.location.city, el.rooms.bedrooms, el.rooms.bathrooms, el.size);
            this.responseData.push(house);
          }
        } else {
          console.error(response.statusText);
        }
      }
      catch (e) {
        // Handle error
        console.log(e);
      }
    },
    handleSearch(query) {
      this.queriedData = [];
      
      if(query === '') {
        this.queriedData = this.responseData;
      }
      else if(query === undefined) {
        throw new Error( "e jbg :(");
      }
      else {
        this.queriedData = this.responseData.filter(house => {
          return (
            house.address.toLowerCase().includes(query.toLowerCase()) ||
            house.price.toString().includes(query.toLowerCase()) || 
            house.postcode.toLowerCase().includes(query.toLowerCase()) || 
            house.city.toLowerCase().includes(query.toLowerCase()) ||
            house.size.toString().includes(query.toLowerCase()) 
          );
        });
      }

      if (this.queriedData.length === 0) {
        this.noResults = true;
      } else {
        this.noResults = false;
      }
    }
  },
  created() {
    this.getHouseListings();
    this.queriedData = this.responseData;
  }
}
</script>

<style>
#main-content {
  margin: 150px 250px 50px 250px;
}
#listings {
  margin-top: 30px;
}
</style>
