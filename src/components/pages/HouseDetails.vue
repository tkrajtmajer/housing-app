<template>
  <div class="container">
    <BackButton :inOverview="true" @backToOverview="this.$emit('backToOverview')"/>
    <div id="overview">
      <div id="overview-left">
        <div id="house-overview" class="el-bg-two">
          <img :src="houseDetails.image" id="house-img">
          <div id="house-info" class="font-listing-info txt-secondary">
            <div id="vertical-section">
              <h1 class="txt-primary">{{ houseDetails.street }} {{ houseDetails.houseNr }} {{ houseDetails.houseNrAdt }}</h1>
              <div v-if="houseDetails.madeByMe === true">
                <div id="listing-options-container" class="txt-primary">
                  <button @click="this.$emit('editHouse', this.houseDetails.id)" class="button-basic">
                    <img v-if="!isMobile" src="../../assets/ic_edit@3x.png" class="icon-big">
                    <img v-if="isMobile" src="../../assets/ic_edit_white@3x.png" class="icon-big">
                  </button>
                  <DeleteButton :isMobile="isMobile" @deleteHouse="this.$emit('deleteHouse', this.houseDetails.id)" />
                </div>
              </div>
            </div>
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
                <p id="text-size">{{ houseDetails.size }} m2</p>
              </div>
              <div id="info-built">
                <img src="../../assets/ic_construction_date@3x.png" class="icon">
                <p id="text-built">Built in {{ houseDetails.constructionYear }}</p>
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
          <HouseListing class="recommendation-item" v-for="(data, index) in this.topThreePics" :key="index" :data="data" @listingSelected="listingSelected(data.id)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HouseListing from '../elements/HouseListing.vue';
import BackButton from '../elements/BackButton.vue';
import DeleteButton from '../elements/DeleteButton.vue';
import { getTopRecommendations } from '../../common/recommendationSystem';

export default {
  components: {
    HouseListing,
    BackButton,
    DeleteButton
  },
  props: ['store', 'houseDetails'],
  data() {
    return {
      isMobile: window.innerWidth <= 800, 
      topThreePics: []
    }
  },
  methods: {
    listingSelected(id) {
      this.$emit('listingSelected', id);
      this.updateRecommendations(id);
    },
    updateRecommendations(id) {
      this.topThreePics = getTopRecommendations(this.store.responseData, id);
    }
  },
  created() {
    this.updateRecommendations(this.houseDetails.id);
  }
}
</script>

<style scoped>
#overview {
  display: grid;
  grid-template-columns: 63% 37%;
  padding-top: 20px;
}
#overview-left {
  margin-right: 50px;
}
#overview-right {
  margin-left: 50px;
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
}
#info-house-details,
#info-room-details {
  display: flex;
  gap: 35px;
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
#vertical-section{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
}
#listing-options-container {
  line-height: normal;
  display: flex;
  gap: 15px;
}
.button-basic {
  background: none;
}
@media (max-width: 800px) {
  #overview {
    display: inline;
    padding: 0;
  }
  #overview-left,
  #overview-right {
    margin: 0;
  }
  #overview-right {
    padding: 30px;
  }
  #hosue-overview {
    position: relative;
  }
  #house-img {
    z-index: -1;
    position: relative;
  }
  #house-info {
    margin-top: -50px;
    background-color: #FFF;
    z-index: 1;
    border-radius: 30px 30px 0 0 ;
    padding-bottom: 20px;
    line-height: 30px;
  }
  .el-bg-two {
    background: none;
  }
  #info-further {
    padding: 20px 0 0 0;
    line-height: 20px;
  }
  .container {
    padding: 0;
  }
  #listing-options-container {
    position: absolute;
    top: 0;
    right: 0;
    padding: 35px 40px;
  }
}
</style>