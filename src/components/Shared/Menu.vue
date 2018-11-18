<template lang="html">
  <nav class="nav is-hidden-tablet">
    <ul class="navbar-menu navbar-end is-active">
      <li class="navbar-item"><router-link :to="'/'">Home</router-link></li>
      <li class="navbar-item dropdown is-hoverable">
        <div class="dropdown-trigger">
            <a aria-haspopup="true" aria-controls="dropdown-menu4">Posts</a>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
          <div class="dropdown-content">
            <div class="dropdown-item">
              <ul class="menu-list">
                <li v-for="(post, index) in posts" >
                  <router-link :to="'/post/' + post"> <a :class="{'is-active': $route.params.filename == post}" >{{post}}</a> </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </li>
    </ul>

  </nav>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      errors: [],
      posts:[]
    }
  },
  created(){
    this.$http.get(this.$store.state.apiRoot + this.$store.state.pathPosts).then(response => {

    for (var i = 0; i < response.body.length; i++) {
        this.posts.push(response.body[i].nome.replace('.md', ''))
      }

  }, response => {
    // error callback
  });
  },
  methods: {
    mostraLinksPosts() {
      event.stopPropagation();
 dropdown.classList.toggle('is-active');
    }
  }
}
</script>

<style lang="css">
.routers{
  overflow: auto !important;
}

.navbar-item{
  display: inline-block !important;
}
</style>
