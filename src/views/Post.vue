<template lang="html">
  <div class="tile">
    <vc-menu/>
    <vc-posts/>
    <vc-dash-board>

      <div class="columns is-gapless is-mobile">
        <div class="column">
          <router-link to="/" class="button is-danger btn-post is-fullwidth"><span class="icon-trash-o"></span></router-link>
        </div>
        <div class="column is-8">
          <b-field>
            <b-input v-model="post.Nome"></b-input>
          </b-field>
        </div>
        <div class="column">
          <router-link to="/" class="button is-warning btn-post is-fullwidth"><span class="icon-pencil"></span></router-link>
        </div>
        <div class="column">
          <router-link to="/" class="button is-success btn-post is-fullwidth"><span class="icon-check"></span></router-link>
        </div>
      </div>



      <b-field>
        <b-input type="textarea" v-model="post.Conteudo"></b-input>
      </b-field>
    </vc-dash-board>
  </div>
</template>

<script>
import axios from 'axios';
import VcMenu from "@/components/Shared/Menu.vue"
import VcPosts from "@/components/Shared/MenuSide.vue"
import VcDashBoard from "@/components/Shared/DashBoard.vue"
export default {
  name: 'post',
  components: {
    VcMenu, // <vc-menu/>
    VcPosts, // <vc-posts/>
    VcDashBoard // <vc-dash-board></vc-dash-board>
  },
  data(){
    return{
      post: {
        Conteudo: 'carregando...',
      },
      errors: [],
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.getPost()
  },
  watch: {
    '$route.params.filename': function (id) {
      this.getPost()
    }
  },
  methods: {
    getPost() {
      axios
      .get('http://localhost:8083/api/post/' + this.$route.params.filename)
      .then(response => {
        this.post = response.data;
        console.log(response.data);
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>

<style lang="css">
.container-acao{
  width: auto !important;
}

.btn-post{
  margin: 0 !important;
}
</style>
