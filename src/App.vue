<template>
  <div id="app">
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body rota">
        <router-view/>
      </div>
    </section>
  </div>
</template>

<style>
@import '../src/assets/icomoon/style.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.hero-body{
  height: 100% !important;
  padding: 0 !important;
}

.rota{
  display: flex !important;
  overflow: hidden !important;
  height: calc(100vh) !important;
}
</style>
