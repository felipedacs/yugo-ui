<template>
  <div class="tile">
    <vc-menu/>
    <vc-posts/>
    <vc-dash-board>
      <div class="btn-acao">
        <a to="/post/_newpost" class="button is-medium is-success" @click="NovoPost()">Novo post</a>
      </div>
      <div class="btn-acao">
        <router-link to="/publish" class="button is-medium is-success">Publicar Online</router-link>
      </div>
      <!-- <vc-yugo-logo/> -->
    </vc-dash-board>
  </div>
</template>

<script>
// @ is an alias to /src
import VcMenu from "@/components/Shared/Menu.vue"
import VcPosts from "@/components/Shared/MenuSide.vue"
import VcDashBoard from "@/components/Shared/DashBoard.vue"
import VcYugoLogo from "@/views/Yugo.vue"
import axios from 'axios';
export default {
  name: 'home',
  components: {
    VcMenu, // <vc-menu/>
    VcPosts, // <vc-posts/>
    VcDashBoard, // <vc-dash-board></vc-dash-board>
    VcYugoLogo // <vc-yugo-logo/>
  },
  data () {
    return {
      posts: [],
      errors: []
    }
  },
  methods: {
    NovoPost() {
      this.$http.post('http://localhost:8083/api/newpost',
      {
      }).then(response => {
        console.log('Success : ' + JSON.stringify(response));
        this.$router.push({ path: '/post/_newpost' }) // -> /user
      }, response => {
        console.log('Error : ' + JSON.stringify(response));
      });
    }
  },
  mounted () {
    // axios
    // .get('http://localhost:8083/api')
    // .then(response => {
    //   // JSON responses are automatically parsed.
    //   this.posts = response.data
    // })
    // .catch(e => {
    //   this.errors.push(e)
    // })
  },
}
</script>

<style media="screen">
.corpo{
  width: 100% !important;
}

.tile{
  height: 100% !important;
}

.btn-acao{
  padding-bottom: 1rem;
}
</style>
