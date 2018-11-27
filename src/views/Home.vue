<template>
  <div class="tile">
    <vc-menu-top/>
    <vc-menu-side/>
    <vc-dash-board>
      <div class="btn-acao">
        <a to="/post/_newpost" class="button is-medium is-success" @click="NovoPost()">Novo post</a>
      </div>
      <div class="btn-acao">
        <router-link to="/publish" class="button is-medium is-success">Publicar Online</router-link>
      </div>
    </vc-dash-board>
  </div>
</template>

<script>
// @ is an alias to /src
import VcMenuTop from "@/components/Shared/MenuTop.vue"
import VcMenuSide from "@/components/Shared/MenuSide.vue"
import VcDashBoard from "@/components/Shared/DashBoard.vue"
export default {
  name: 'home',
  components: {
    VcMenuTop, // <vc-menu-top/>
    VcMenuSide, // <vc-menu-side/>
    VcDashBoard, // <vc-dash-board></vc-dash-board>
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
        this.$router.push({ path: '/post/_newpost' })
      }, response => {
        console.log('Error : ' + JSON.stringify(response));
      });
    }
  }
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
