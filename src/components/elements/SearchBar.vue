<template>
  <div id="search-bar" class="el-tertiary">
    <button class="button-basic align" @click="searchWithKeyword"><img src="../../assets/ic_search@3x.png" class="search-icon"></button>
    <input id="input-field" class="font-input-field align el-tertiary" type="search" placeholder="Search for a house" @keydown.enter.prevent="handleInput($event.target.value)">
    <button class="button-basic align" @click="clearInput"><img src="../../assets/ic_clear@3x.png" class="search-icon"></button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    searchWithKeyword() {
      if(document.getElementById('input-field').value !== '') {
        this.$emit('newSearch', document.getElementById('input-field').value);
        this.$emit('updateResultsCount', true);
      }
    },
    handleInput(query) {
      if(query !== '') {
        this.$emit('newSearch', query);
        this.$emit('updateResultsCount', true);
      }
    },
    clearInput() {
      document.getElementById('input-field').value = '';
      this.$emit('newSearch', '');
      this.$emit('updateResultsCount', false);
    }
  }
}
</script>

<style scoped>
#search-bar {
  width: 500px;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  border-radius: 10px;
}
#input-field {
  border: none;
  padding: 10px;
}
.search-icon {
  width: 20px;
  padding: 2px;
}
.button-basic {
  background: none;
}
@media (max-width: 800px) {
  #search-bar {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>