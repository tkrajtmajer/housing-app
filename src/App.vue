<template>
  <NavBar/>
  <div id="main-content">
    <h1>Houses</h1>
    <br>
    <div id="listings">
      <HouseListing :responseData="responseData"/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import HouseListing from './components/HouseListing.vue'
import House from './models/House.js'

export default {
  name: 'App',
  components: {
    NavBar
    HouseListing
  },
  data() {
    return {
      responseData: []
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
          console.log(data);

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
    }
  },
  created() {
    this.getHouseListings();
  }
}
</script>

<style>
#main-content {
  margin: 100px 250px 50px 250px;
}
#listings {
  margin-top: 30px;
}
</style>
