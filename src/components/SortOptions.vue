<template>
  <div id="sort-options">
    <button @click="sortBy('price')" id="left" class="button-basic el-primary font-input-field-title">Price</button>
    <button @click="sortBy('size')" id="right" class="button-basic el-tertiary-other font-input-field-title">Size</button>
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
      console.log('iz options ', this.currentOption, this.currentOrder);
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
</style>