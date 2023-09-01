<template>
  <header>
    <NavBar v-if="!isMobile"/>
  </header>
  <main id="main-content">
    <router-view :isMobile="isMobile"></router-view>
  </main>
  <footer v-if="isMobile">
    <br><br>
    <NavBarMobile/>
  </footer>
</template>

<script>
import { houseStore } from '@/stores/houseStore'
import NavBar from './components/elements/NavBar.vue'
import NavBarMobile from './components/elements/NavBarMobile.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    NavBarMobile
  },
  data() {
    return {
      isMobile: window.innerWidth <= 800, 
    };
  },
  setup() {
    const store = houseStore();

    if(!store.dataWasFetched) {
      store.getHouseListings();
    }

    return { store };
  }
}
</script>

<style>
#listings {
  margin-top: 30px;
}
.vertical-section {
  display: flex;
  justify-content: space-between;
}
</style>