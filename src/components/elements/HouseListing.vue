<template>
  <div id="container" v-for="(data, index) in store.queriedData" :key="index">
    <div id="house-image">
      <img src="../../assets/img_placeholder_house@3x.png" alt="House image">
    </div>
    <div id="house-info" class="font-body-text">
      <div id="address"><h2>{{ data.address }}</h2></div>
      <div id="price">&euro; {{ data.price }}</div>
      <div id="location-data" class="txt-secondary">
        <div id="postcode">{{ data.postcode }}</div>
        <div id="city">{{ data.city }}</div>
      </div>
      <div id="room-specifics" class="txt-secondary">
        <div id="nrRooms">
          <img src="../../assets/ic_bed@3x.png" class="icon align">
          <span class="align">{{ data.nrRooms }}</span>
        </div>
        <div id="nrBathrooms">
          <img src="../../assets/ic_bath@3x.png" class="icon align">
          <span class="align">{{ data.nrBathrooms }}</span>
        </div>
        <div id="size">
          <img src="../../assets/ic_size@3x.png" class="icon align">
          <span class="align">{{ data.size }} m2</span>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'HouseListing',
  props: ['store']
}
</script>
  
<style>
#container {
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}
#house-image {
  width: 180px;
  height: 180px;
  overflow: hidden;
}
#house-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left;
  border-radius: 10px;
}
#location-data {
  display: flex;
}
#location-data div {
  margin-right: 5px;
}
#room-specifics {
  display: flex;
  margin-right: 10px;
}
#room-specifics div {
  margin-right: 15px;
}
#house-info {
  padding: 10px;
  line-height: 35px;
  margin-left: 20px;
}
.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>