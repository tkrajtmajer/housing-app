<template>
  <div id="back-menu">
    <button class="back-menu-el button-basic" @click="this.$emit('backToOverview')">
      <img src="../../assets/ic_back_grey@3x.png" id="back-icon">
    </button>
    <p class="back-menu-el font-back-button">Back to overview</p>
  </div>
  <br>
  <div id="overview">
    <div id="overview-left">
      <div id="house-overview" class="el-bg-two">
        <img :src="houseDetails.image" id="house-img">
        <div id="house-info" class="font-listing-info txt-secondary">
          <h1 class="txt-primary">{{ houseDetails.street }} {{ houseDetails.houseNr }} {{ houseDetails.houseNrAdt }}</h1>
          <div id="info-loc">
            <img src="../../assets/ic_location@3x.png" class="icon">
            <p id="text-loc">{{ houseDetails.postcode }} {{ houseDetails.city }}</p>
          </div>
          <div id="info-house-details">
            <div id="info-price">
              <img src="../../assets/ic_price@3x.png" class="icon">
              <p id="text-price">{{ houseDetails.price }}</p>
            </div>
            <div id="info-size">
              <img src="../../assets/ic_size@3x.png" class="icon">
              <p id="text-size">{{ houseDetails.size }}</p>
            </div>
            <div id="info-built">
              <img src="../../assets/ic_construction_date@3x.png" class="icon">
              <p id="text-built">{{ houseDetails.constructionYear }}</p>
            </div>
          </div>
          <div id="info-room-details">
            <div id="info-nr-rooms">
              <img src="../../assets/ic_bed@3x.png" class="icon">
              <p id="text-nr-rooms">{{ houseDetails.nrRooms }}</p>
            </div>
            <div id="info-nr-bathrooms">
              <img src="../../assets/ic_bath@3x.png" class="icon">
              <p id="text-nr-bathrooms">{{ houseDetails.nrBathrooms }}</p>
            </div>
            <div id="info-garage">
              <img src="../../assets/ic_garage@3x.png" class="icon">
              <p id="text-garage">{{ houseDetails.hasGarage ? 'Yes' : 'No' }}</p>
            </div>
          </div>

          <p id="info-further" class="font-body-text txt-secondary">
            {{ houseDetails.description }}
          </p>
        </div>
      </div>
    </div>
    <div id="overview-right">
      <h2>Recommended for you</h2>
      <br>
      <div class="recommendation-items">
        <HouseListing class="recommendation-item" v-for="(data, index) in store.queriedData.slice(0, 3)" :key="index" :data="data" @listingSelected="this.$emit('listingSelected', data.id)"/>
      </div>
    </div>
  </div>
</template>

<script>
import HouseListing from '../elements/HouseListing.vue';

export default {
  components: {
    HouseListing
  },
  props: ['store', 'houseDetails']
}
</script>

<style scoped>
#overview {
  display: grid;
  grid-template-columns: 63% 37%;
}
#overview-left {
  margin-right: 50px;
}
#overview-right {
  margin-left: 50px;
}
#back-menu {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  padding-bottom: 10px;
}
.back-menu-el {
  display: flex;
  align-items: center;
}
#back-icon {
  width: 25px;
}
#house-info {
  padding: 40px;
  line-height: 35px;
}
#house-img {
  width: 100%;
}
#info-further {
  padding: 20px 0 20px 0;
}
#info-loc,
#info-price,
#info-size,
#info-built,
#info-nr-rooms,
#info-nr-bathrooms,
#info-garage {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  /* gap: 5px; */
}
#info-house-details,
#info-room-details {
  display: flex;
  gap: 35px;
}
.button-basic {
  background: none;
}
.icon {
  width: auto;
  max-height: 20px;
}
.recommendation-item {
  --hi-padding: 5px 0 0 10px;
  --li-height: 25px;
  --image-width: 120px;
  --image-height: 120px;
  --font-size: 14px;
  --font-heading: 18px;
}
</style>