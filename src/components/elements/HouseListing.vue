<template>
  <div id="container">
    <div id="listing-info-container">
      <div id="house-image">
        <img :src="data.image" alt="House image">
      </div>
      <div id="house-info" class="font-body-text clickable" @click="this.$emit('listingSelected', data.id)">
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

    <div v-if="data.madeByMe === true">
      <div id="listing-options-container">
        <button @click="this.$emit('editHouse', this.data.id)" class="button-basic">
          <img src="../../assets/ic_edit@3x.png" class="icon-big">
        </button>
        <DeleteButton @deleteHouse="this.$emit('deleteHouse', this.data.id)" />
      </div>
    </div>

    <div v-if="data.madeByMe === false">
      <button @click="likeHouse" class="button-basic">
        <img :src="isLiked ? redHeart : grayHeart" class="icon-big" id="heart">
      </button>
    </div>
  </div>
</template>
  
<script>
import { houseStore } from '@/stores/houseStore'
import DeleteButton from './DeleteButton.vue';
import redHeart from '../../assets/ic_heart.png';
import grayHeart from '../../assets/ic_heart_gray.png';

export default {
  name: 'HouseListing',
  components: {
    DeleteButton
  },
  props: ['data'],
  data() {
    return {
      isLiked: false,
      redHeart,
      grayHeart
    }
  },
  /**
   * Creates a reference to the store. Here the store is used to keep track of favorited items.
   */
  setup() {
    const store = houseStore();
    return { store };
  },
  /**
   * Checks the store for whether an item was added to the favorites list once it is created.
   */
  created() {
    if(this.store.isLiked(this.data.id)) {
      this.isLiked = true;
    }
    else {
      this.isLiked = false;
    }
  },
  methods: {
    likeHouse() {
      if (this.isLiked) {
        this.store.removeFavorite(this.data.id);
        this.isLiked = false;
      }
      else {
        this.store.addFavorite(this.data.id);
        this.isLiked = true;
      }
    }
  }
}
</script>
  
<style scoped>
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
  justify-content: space-between;
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
  width: 800px;
}
.font-body-text {
  font-size: var(--font-size);
}
h2 {
  font-size: var(--font-heading);
}
.clickable {
  cursor: pointer;
}
#listing-info-container {
  display: flex;
  align-content: center;
}
#listing-options-container {
  display: flex;
  gap: 15px;
}
.button-basic {
  background: none;
  float: right;
}
@media (max-width: 800px) {
  #house-info {
    width: auto;
    padding: 5px;
    line-height: 25px;
  }
  .font-body-text {
    font-size: 12px;
  }
  h2 {
    font-size: 14px;
  }
  #house-image {
    width: 110px;
    height: 110px;
  }
  #listing-options-container {
    gap: 2px;
  }
}
</style>