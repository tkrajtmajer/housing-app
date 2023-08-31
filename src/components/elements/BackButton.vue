<template>
  <div id="back-menu">
    <button class="back-menu-el button-basic" @click="this.$emit('backToOverview')">
      <img v-if="!inOverview" src="../../assets/ic_back_grey@3x.png" id="back-icon">
      <img v-if="isMobile && inOverview" src="../../assets/ic_back_white@3x.png" id="back-icon">
    </button>
    <p id="back-txt" class="back-menu-el font-back-button">Back to overview</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: window.innerWidth <= 800, 
    };
  },
  props: ['inOverview']
}
</script>

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
@media (max-width: 800px) {
  #back-txt {
    display: none;
  }
  #back-menu {
    position: absolute;
    top: 0;
    padding: 40px 0 0 40px;
  }
  #back-icon {
    width: 18px;
  }
}
</style>