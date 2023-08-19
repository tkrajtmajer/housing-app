<template>
  <div id="empty-search">
    <img src="../assets/img_empty_houses@3x.png" alt="Empty search" id="img-empty-search">
    <br><br><br>
    <p class="font-body-text txt-secondary">No results found. <br> Please try another keyword.</p>
  </div>
</template>

<script>
export default {
  name: 'EmptySearch'
}
</script>

<style>
#empty-search {
    text-align: center;
    margin-top: 120px;
}
#img-empty-search {
  width: 400px;
}
</style>