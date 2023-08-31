<template>
    <nav id="nav-bar">
      <router-link to="/houses" class="nav-bar-el align">
        <img :src="isActive('/houses') ? redHome : grayHome" class="icon">
      </router-link>
      <router-link to="/my-listings" class="nav-bar-el align">
        <img :src="isActive('/my-listings') ? redList : grayList" class="icon">
      </router-link>
      <router-link to="/favorites" class="nav-bar-el align">
        <img :src="isActive('/favorites') ? redFav : grayFav" class="icon">
      </router-link>
      <router-link to="/about" class="nav-bar-el align">
        <img :src="isActive('/about') ? redInfo : grayInfo" class="icon">
      </router-link>
    </nav>
  </template>

<script>
import redHome from '../../assets/ic_mobile_navigarion_home_active@3x.png';
import grayHome from '../../assets/ic_mobile_navigarion_home@3x.png';
import redList from '../../assets/ic_edit@3x.png';
import grayList from '../../assets/ic_edit_gray@3x.png';
import redFav from '../../assets/ic_heart.png';
import grayFav from '../../assets/ic_heart_lightgray.png';
import redInfo from '../../assets/ic_mobile_navigarion_info_active@3x.png';
import grayInfo from '../../assets/ic_mobile_navigarion_info@3x.png';

export default {
  name: 'NavBarMobile',
  data() {
    return {
      redHome,
      grayHome,
      redList,
      grayList,
      redFav,
      grayFav,
      redInfo,
      grayInfo
    }
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    }
  }
}
</script>

<style scoped>
#nav-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  color: #000;
  padding: 20px;
  font-size: 18px;
  vertical-align: middle;
  z-index: 1;
  display: flex;
  justify-content: space-around;
}
/* #nav-bar a.router-link-active,
#nav-bar a.router-link-exact-active {
  font-weight: 700;
  color: #000;
} */
.icon {
  max-height: 25px;
}
</style>