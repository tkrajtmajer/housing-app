<template>
  <nav id="nav-bar">
    <img src="../../assets/img_logo_dtt@3x.png" alt="DTT logo" class="nav-bar-el align" id="dtt-logo"> 
    <router-link to="/houses" class="nav-bar-el font-header-menu align">Houses</router-link>
    <router-link to="/my-listings" class="nav-bar-el font-header-menu align">My Listings</router-link>
    <router-link to="/favorites" class="nav-bar-el font-header-menu align">Favorites</router-link>
    <router-link to="/about" class="nav-bar-el font-header-menu align">About</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
#nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  color: #000;
  padding: 20px;
  padding-left: 330px;
  font-size: 18px;
  vertical-align: middle;
  z-index: 1;
}
#nav-bar a {
  text-decoration: none;
  font-weight: 400;
  color: #4A4B4C;
}
#nav-bar a.router-link-active,
#nav-bar a.router-link-exact-active {
  font-weight: 700;
  color: #000;
}
.nav-bar-el {
  padding-right: 70px;
}
#dtt-logo {
  width: 250px;
}
</style>