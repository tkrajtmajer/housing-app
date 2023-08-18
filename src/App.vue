<template>
  <NavBar/>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
}
body {
  font-family: 'Montserrat', sans-serif;
}
</style>
