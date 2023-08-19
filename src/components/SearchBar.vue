<template>
  <input type="search" placeholder="Search for a house" @keydown.enter.prevent="handleInput($event.target.value)">
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    handleInput(query) {
      this.$emit('newSearch', query);
    }
  }
}
</script>