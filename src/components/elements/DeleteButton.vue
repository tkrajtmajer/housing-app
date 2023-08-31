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
    /**
     * Displays alert box and disables user scrolling.
     */
    showAlert() {
      this.alertIsVisible = true;
      document.body.style.overflow = 'hidden';
    },
    /**
     * Hides alert box and re-enables user scrolling.
     */
    hideAlert() {
      this.alertIsVisible = false;
      document.body.style.overflow = 'auto';
    },
    /**
     * Emits an event for deleting the current house listing.
     */
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