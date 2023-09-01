<template>
  <div id="about-page" class="container">
    <div v-if="isMobile">
      <h1>About</h1>
      <br><br>
    </div>
    <h1 v-if="!isMobile">About DTT Real Estate</h1>
    <h2 v-if="isMobile">About DTT Real Estate</h2>
    <div id="about-dtt-re">
      <p class="font-body-text txt-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <br>
      <p class="font-body-text txt-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
    </div>
    <h1 v-if="!isMobile">Design and Development</h1>
    <h2 v-if="isMobile">Design and Development</h2>
    <div id="design-and-dev" class="font-body-text txt-secondary">
      <img src="../../assets/img_logo_dtt@3x.png" alt="DTT logo" id="about-img-logo" class="align">
      <div id="dnd-text" class="align">
        <p>By DTT</p>
        <a href="https://www.d-tt.nl" class="txt-hyperlink">www.d-tt.nl</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isMobile']
}
</script>

<style scoped>
#design-and-dev {
  display: flex;
  padding-top: 40px;
  vertical-align: middle;
}
#about-dtt-re {
  padding: 40px 0 60px 0;
}
#dnd-text {
  padding-top: 12px;
  padding-left: 40px;
}
#about-img-logo {
  width: 220px;
}
a {
  text-decoration: none;
}
h1 {
  text-align: center;
}
</style>