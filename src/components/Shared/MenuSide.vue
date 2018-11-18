<template lang="html">
  <aside class="column is-3 is-hidden-mobile is-fullheight routers">
    <ul class="menu-list">
      <li>
        <router-link :to="'/'"> <a :class="{'is-active': $route.path == '/'}" >Home</a> </router-link>
      </li>
    </ul>
    <p class="menu-label">
      Posts
    </p>
    <ul class="menu-list">
      <li v-for="(post, index) in posts" >
        <router-link :to="'/post/' + post"> <a :class="{'is-active': $route.params.filename == post}" >{{post}}</a> </router-link>
      </li>
    </ul>
    <p class="menu-label">
      Ajuda
    </p>
  </aside>
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

    // axios
    // .get(this.$store.state.apiRoot + this.$store.state.pathPosts)
    // .then(response => {
    //   for (var i = 0; i < response.data.length; i++) {
    //     this.posts.push(response.data[i].Nome.replace('.md', ''))
    //   }
    // })
    // .catch(e => {
    //   this.errors.push(e)
    // })

  }
}
</script>

<style lang="css">
.routers{
  overflow: auto !important;
}
</style>
