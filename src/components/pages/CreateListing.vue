<template>
  <div id="container-create-new" class="container">
    <img src="../../assets/ic_plus_grey@3x.png" style="display: none;" id="plus-img">
    <div id="create-listing">
      <BackButton @backToOverview="this.$emit('backToOverview')"/>
      <br>
      <h1>{{ this.title }}</h1>
      <br><br>
      <form @submit.prevent="submitNewHouse" id="form">
        <label for="street-name" class="font-input-field-title">Street name*</label><br><br>
        <input type="text" id="street-name" class="font-input-field" v-model="streetName" placeholder="Enter the street name" required @blur="checkForValidity"><br>
        <p class="font-error-message" id="street-name-error"></p><br>
        <div class="flex">
          <div class="el">
            <label for="house-nr" class="font-input-field-title">House number*</label><br><br>
            <input type="number" id="house-nr" class="font-input-field" v-model="houseNumber" placeholder="Enter house number" required @blur="checkForValidity"><br>
            <p class="font-error-message" id="house-nr-error"></p><br>
          </div>
          <div class="el">
            <label for="addition" class="font-input-field-title">Addition (optional)</label><br><br>
            <input type="text" id="addition" class="font-input-field" v-model="numberAddition" placeholder="e.g. A"><br><br>
          </div>
        </div>
        <label for="postcode" class="font-input-field-title">Postal code*</label><br><br>
        <input type="text" id="postcode" class="font-input-field" v-model="zip" placeholder="e.g. 1000 AA" required @blur="checkForValidity"><br>
        <p class="font-error-message" id="postcode-error"></p><br>
        <label for="city" class="font-input-field-title">City*</label><br><br>
        <input type="text" id="city" class="font-input-field" v-model="city" placeholder="e.g. Utrecht" required @blur="checkForValidity"><br>
        <p class="font-error-message" id="city-error"></p><br>

        <label for="image" class="font-input-field-title">Upload picture (PNG or JPG)* 
          <div id="icon-upload" class="container-style-icon">
            <img src="../../assets/ic_plus_grey@3x.png" id="uploaded-image" class="img-style-icon"> 
            <button id="button-remove-image" @click="cancelImage">
              <img src="../../assets/ic_clear_white@3x.png">
            </button>
          </div>
        </label>
        <input type="file" id="image" accept="image/*" required @change="handleImageUpload" @blur="checkForValidity"><br>
        <p class="font-error-message" id="image-error"></p><br>

        <label for="price" class="font-input-field-title">Price*</label><br><br>
        <input type="number" id="price" class="font-input-field" v-model="price" placeholder="e.g. &euro;150.000" required @blur="checkForValidity"><br>
        <p class="font-error-message" id="price-error"></p><br>
        
        <div class="flex">
          <div class="el">
            <label for="size" class="font-input-field-title">Size*</label><br><br>
            <input type="number" id="size" class="font-input-field" v-model="size" placeholder="e.g. 60m2" required @blur="checkForValidity"><br>
            <p class="font-error-message" id="size-error"></p><br>
          </div>
          <div class="el">
            <label for="has-garage" class="font-input-field-title">Garage*</label><br><br>
            <select id="has-garage" class="font-input-field" v-model="hasGarage" placeholder="Select" required @blur="checkForValidity">
              <option value="" disabled selected>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <br>
            <p class="font-error-message" id="has-garage-error"></p><br>
          </div>
        </div>

        <div class="flex">
          <div class="el">
            <label for="nr-bedrooms" class="font-input-field-title">Bedrooms*</label><br><br>
            <input type="number" id="nr-bedrooms" class="font-input-field" v-model="bedrooms" placeholder="Enter amount" required @blur="checkForValidity"><br>
            <p class="font-error-message" id="nr-bedrooms-error"></p><br>
          </div>
          <div class="el">
            <label for="nr-bathrooms" class="font-input-field-title">Bathrooms*</label><br><br>
            <input type="number" id="nr-bathrooms" class="font-input-field" v-model="bathrooms" placeholder="Enter amount" required @blur="checkForValidity"><br>
            <p class="font-error-message" id="nr-bathrooms-error"></p><br>
          </div>
        </div>

        <label for="construction-year" class="font-input-field-title">Construction date*</label><br><br>
        <input type="number" id="construction-year" class="font-input-field" v-model="constructionYear" placeholder="e.g. 1990" required @blur="checkForValidity"><br>
        <p class="font-error-message" id="construction-year-error"></p><br>

        <label for="description" class="font-input-field-title">Description*</label><br><br>
        <textarea rows="5" cols="30" id="description" class="font-input-field" v-model="description" placeholder="Enter description" required @blur="checkForValidity"></textarea><br>
        <p class="font-error-message" id="description-error"></p><br>

        <button type="submit" id="submit" class="el-primary font-buttons button-basic">{{ this.button }}</button><br><br>
      </form>
    </div>
  </div>
</template>

<script>
import BackButton from '../elements/BackButton.vue';
import { onMounted } from 'vue';

export default {
  components: {
    BackButton
  },
  props: ['store', 'title', 'button', 'initialData'],
  data() {
    return {
      streetName: '',
      houseNumber: '',
      numberAddition: '',
      zip: '',
      city: '',
      image: '',
      price: '',
      size: '',
      hasGarage: '',
      bedrooms: '',
      bathrooms: '',
      constructionYear: '',
      description: ''
    }
  },
  created() {
    if(this.initialData !== null) {
      this.$data.streetName = this.initialData.street;
      this.$data.houseNumber = this.initialData.houseNr;
      this.$data.numberAddition = this.initialData.houseNrAdt;
      this.$data.zip = this.initialData.postcode;
      this.$data.city = this.initialData.city;
      this.$data.image = this.initialData.image;
      this.$data.price = this.initialData.price;
      this.$data.size = this.initialData.size;
      this.$data.hasGarage = this.initialData.hasGarage;
      this.$data.bedrooms = this.initialData.nrRooms;
      this.$data.bathrooms = this.initialData.nrBathrooms;
      this.$data.constructionYear = this.initialData.constructionYear;
      this.$data.description = this.initialData.description;
    }

    onMounted(() => {
      this.showImage(this.$data.image);
    });
  },
  methods: {
    submitNewHouse() {
      const listingData = new FormData();

      Object.keys(this.$data).forEach(key => {
        if(key !== 'image') {
          listingData.append(key, this[key]);
        }
      });

      var imageData = new FormData();

      if(this.$data.image instanceof File) {
        imageData.append('image', this.$data.image, this.$data.image.name);
      }
      else {
        imageData = null;
      }

      this.$emit('processForm', {listingData, imageData});
    },
    handleImageUpload(event) {
      const file = event.target.files[0];

      this.showImage(URL.createObjectURL(file));
      this.image = file;
    },
    showImage(src) {
      document.getElementById("uploaded-image").src = src;
      document.getElementById("icon-upload").classList.replace('container-style-icon', 'container-style-upload');
      document.getElementById("uploaded-image").classList.replace('img-style-icon', 'img-style-upload');

      document.getElementById("button-remove-image").style = "display: block;";
      document.getElementById("image").disabled = true;

      const error = document.getElementById("image-error");
      error.innerHTML = '';
    },
    cancelImage(event) {
      event.preventDefault();
      document.getElementById("uploaded-image").src = document.getElementById("plus-img").src;
      this.image = '';

      document.getElementById("icon-upload").classList.replace('container-style-upload', 'container-style-icon');
      document.getElementById("uploaded-image").classList.replace('img-style-upload', 'img-style-icon');

      document.getElementById("button-remove-image").style = "display: none;";
      document.getElementById("image").disabled = false;

      const error = document.getElementById("image-error");
      error.innerHTML = 'Required field missing.';
    },
    checkForValidity(event) {
      const el = event.target;
      const error = document.getElementById(el.id + "-error");

      if(el.validity.valid) {
        el.classList.remove('form-invalid-field');
        error.innerHTML = '';
      }
      else {
        el.classList.add('form-invalid-field');
        if(el.validity.valueMissing) {
          error.innerHTML = 'Required field missing.';
        }
        else if(el.type === 'file' && el.files.length === 0) {
          error.innerHTML = 'Required field missing.';
        } 
        else {
          error.innerHTML = 'Invalid input.';
        }
      }
    }
  }
}
</script>

<style scoped>
#container-create-new {
  background-image: url('../../assets/img_background@3x.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: auto auto 0 0;
}
form{
  width: 450px;
}
input,
select,
textarea {
  background-color: #FFF;
  border-radius: 10px;
  border: none;
  padding: 20px;
  width: 100%;
}
textarea {
  resize: none;
  overflow: hidden;
}
.form-invalid-field {
  border: #EB5440 solid;
  color: #EB5440;
  outline: none;
}
.font-error-message {
  padding-top: 10px;
  color: #EB5440;
}
#icon-upload {
  position: relative;
}
.button-basic {
  padding: 15px 90px 15px 90px;
  border-radius: 10px;
}
#button-remove-image {
  background: none;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  margin: -20px -25px 0 0;
  display: none;
  cursor: pointer;
}
#button-remove-image img {
  width: 50px;
}
.flex {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
#image {
  display: none;
  width: auto;
}
form:valid #submit {
  opacity: 1;
  float: right;
  cursor: pointer;
  pointer-events: auto;
}
#submit {
  opacity: 0.3;
  float: right;
  cursor: not-allowed;
  pointer-events: none;
}
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
.container-style-icon {
  border: #C3C3C3 dashed;
  border-radius: 5px;
  padding: 60px;
  margin-top: 15px;
  width: fit-content;
}
.img-style-icon {
  width: 20px; 
  height: 20px;
} 
.container-style-upload { 
  padding: 0; 
  border: none; 
  margin-top: 15px;
  width: 150px; 
  height: 150px;
}
.img-style-upload {
  width: 100%; 
  height: 100%; 
  border-radius: 10px; 
  object-fit: cover; 
  object-position: left;
}
</style>