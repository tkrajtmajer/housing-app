<template>
  <header>
    <NavBar/>
  </header>
  <main id="main-content">
    <router-view></router-view>
  </main>
</template>

<script>
import NavBar from './components/elements/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
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