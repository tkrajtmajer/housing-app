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
#main-content {
  margin: 150px 330px 50px 330px;
}
#listings {
  margin-top: 30px;
}
.vertical-section {
  display: flex;
  justify-content: space-between;
}
</style>