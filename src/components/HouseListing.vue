<template>
  <div id="container" v-for="(data, index) in responseData" :key="index">
    <img id="house-image" src="../assets/img_placeholder_house@3x.png" alt="House image">
    <div id="house-info">
      <div id="address">{{ data.address }}</div>
      <div id="price">{{ data.price }}</div>
      <div id="postcode">{{ data.postcode }}</div>
      <div id="city">{{ data.city }}</div>
      <div id="nrRooms">{{ data.nrRooms }}</div>
      <div id="nrBathrooms">{{ data.nrBathrooms }}</div>
      <div id="size">{{ data.size }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HouseListing',
  props: ['responseData']
}
</script>

<style>
#container {
  display: flex;
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 14px;
}
#house-image {
  width: 30%;
}
</style>