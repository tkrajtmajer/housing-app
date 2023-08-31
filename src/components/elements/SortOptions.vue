<template>
  <div id="sort-options">
    <button @click="sortBy('price')" id="left" :class="['button-basic', 'font-input-field-title', { 'el-primary': currentOption === 'price' }, { 'el-tertiary-other': currentOption === 'size' || currentOption === '' }]">Price</button>
    <button @click="sortBy('size')" id="right" :class="['button-basic', 'font-input-field-title', { 'el-primary': currentOption === 'size' }, { 'el-tertiary-other': currentOption === 'price' || currentOption === '' }]">Size</button>
  </div>
</template>

<script>
export default {
  name: 'SortOptions',
  data() {
    return {
      currentOption: '',
      currentOrder: 1
    };
  },
  methods: {
    sortBy(option) {
      if(this.currentOption === option) {
        this.currentOrder *= -1;
      }
      else {
        this.currentOrder = 1;
        this.currentOption = option;
      }
      this.$emit('sortByOption', {option: this.currentOption, order: this.currentOrder});
    }
  }
}
</script>

<style scoped>
.button-basic {
  padding: 10px 50px 10px 50px;
}
#left {
  border-radius: 10px 0 0 10px;
}
#right {
  border-radius: 0 10px 10px 0;
}
@media (max-width: 800px) {
  #sort-options {
    width: 100%;
  }
  .button-basic {
    width: 50%;
  }
}
</style>