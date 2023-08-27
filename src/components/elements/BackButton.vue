<template>
  <div id="back-menu">
    <button class="back-menu-el button-basic" @click="this.$emit('backToOverview')">
      <img src="../../assets/ic_back_grey@3x.png" id="back-icon">
    </button>
    <p class="back-menu-el font-back-button">Back to overview</p>
  </div>
</template>

<style scoped>
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
.button-basic {
  background: none;
}
</style>