<template>
  <div id="container" @click="this.$emit('listingSelected', data.id)">
    <div id="house-image">
      <img :src="data.image" alt="House image">
    </div>
    <div id="house-info" class="font-body-text">
      <div id="address"><h2>{{ data.street }} {{ data.houseNr }} {{ data.houseNrAdt }}</h2></div>
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
  props: ['data']
}
</script>
  
<style scoped>
/* temp */
:root {
  --hi-padding: 10px;
  --li-height: 35px;
  --image-width: 180px;
  --image-height: 180px;
  --font-size: 18px;
  --font-heading: 22px;
}

#container:hover {
  background-color: #C3C3C3;
}
#container {
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}
#house-image {
  width: var(--image-width);
  height: var(--image-height);
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
  padding: var(--hi-padding);
  line-height: var(--li-height);
  margin-left: 20px;
}
.font-body-text {
  font-size: var(--font-size);
}
h2 {
  font-size: var(--font-heading);
}
</style>