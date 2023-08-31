<template>
  <button @click="showAlert" class="button-basic">
    <img v-if="!isMobile" src="../../assets/ic_delete@3x.png" class="icon-big">
    <img v-if="isMobile" src="../../assets/ic_delete_white@3x.png" class="icon-big">
  </button>
  <div v-if="this.alertIsVisible === true">
    <DeleteAlert @confirmDeletion="deleteHouse" @cancelDeletion="hideAlert" />
  </div>
</template>

<script>
import DeleteAlert from "./DeleteAlert.vue";

export default {
  components: {
    DeleteAlert
  },
  props: ['isMobile'],
  data() {
    return {
      alertIsVisible: false
    }
  },    
  methods: {
    showAlert() {
      this.alertIsVisible = true;
      document.body.style.overflow = 'hidden';
    },
    hideAlert() {
      this.alertIsVisible = false;
      document.body.style.overflow = 'auto';
    },
    deleteHouse() {
      this.hideAlert();
      this.$emit('deleteHouse');
    }
  }
}
</script>

<style scoped>
.button-basic {
  background: none;
  float: right;
}
</style>