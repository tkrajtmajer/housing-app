<template>
  <div id="sort-options">
    <button @click="sortBy('price')">Price</button>
    <button @click="sortBy('size')">Size</button>
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