<template>
  <div id="search-bar" class="el-tertiary">
    <button class="button-icon align" @click="searchWithKeyword"><img src="../assets/ic_search@3x.png" class="search-icon"></button>
    <input id="input-field" class="font-input-field align el-tertiary" type="search" placeholder="Search for a house" @keydown.enter.prevent="handleInput($event.target.value)">
    <button class="button-icon align" @click="clearInput"><img src="../assets/ic_clear@3x.png" class="search-icon"></button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    searchWithKeyword() {
      this.$emit('newSearch', document.getElementById('input-field').value);
    },
    handleInput(query) {
      this.$emit('newSearch', query);
    },
    clearInput() {
      document.getElementById('input-field').value = '';
    }
  }
}
</script>

<style>
#search-bar {
  width: 500px;
  /* display: flex;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: 10% 80% 10%;
  border-radius: 10px;
}
#input-field {
  border: none;
  padding: 10px;
}
.button-icon {
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}
.search-icon {
  width: 20px;
  padding: 2px;
}
</style>