<template>
  <nav id="nav-bar">
    <img src="../assets/img_logo_dtt@3x.png" alt="DTT logo" class="nav-bar-el align" id="dtt-logo"> 
    <a href="/houses" class="nav-bar-el align" onclick="toggleActive()">Houses</a>
    <a href="/about" class="nav-bar-el align" onclick="toggleActive()">About</a>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  mounted() {
    this.setupLinks();
  },
  methods: {
    setupLinks() {
      var currentPagePath = window.location.pathname;
      var links = document.querySelectorAll('#nav-bar a');
      
      for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute('href') === currentPagePath) {
          links[i].classList.add('active');
        }
      }
    },
    toggleActive(event) {
      var links = document.querySelectorAll('#nav-bar a');
      
      for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
      }
      
      event.target.classList.add('active');
    }
  }
}
</script>

<style>
#nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  color: #000;
  padding: 20px;
  padding-left: 250px;
  font-size: 18px;
  vertical-align: middle;
}
#nav-bar a {
  text-decoration: none;
  font-weight: 400;
  color: #4A4B4C;
}
#nav-bar a.active {
  font-weight: 700;
  color: #000;
}
.nav-bar-el {
  padding-right: 70px;
}
#dtt-logo {
  width: 250px;
}
.align {
  vertical-align: middle;
}
</style>