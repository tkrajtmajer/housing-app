<template>
  <div id="delete-alert" class="el-bg-one">
    <div id="alert-content" class="el-bg-two">
      <h2>Delete listing</h2><br>
      <p class="font-body-text">Are you sure you want to delete this listing?<br>
      This action cannot be undone.</p><br><br>
      <button @click="this.$emit('confirmDeletion')" class="button-basic el-primary font-buttons">
        YES, DELETE
      </button><br><br>
      <button @click="this.$emit('cancelDeletion')" class="button-basic el-secondary font-buttons">
        GO BACK
      </button>
    </div>
  </div>
</template>

<style scoped>
#delete-alert {
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0.2, 0.2, 0.2, 0.5);
  display: flex;
  align-items: center;
  justify-content: center; 
}
#alert-content {
  width: 600px;
  padding: 50px;
  border-radius: 10px;
}
.button-basic {
  width: 75%;
  border-radius: 10px;
  padding: 15px 20px 15px 20px;
}
</style>