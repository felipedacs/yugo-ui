<template lang="html">
  <div class="tile">
    <vc-menu/>
    <vc-posts/>
    <vc-dash-board>
      <b-field label="Name" :horizontal="true">
        <b-input v-model="urlRepository"></b-input>
      </b-field>

      <a class="button is-success" @click="publish">Publicar e sair</a>
      <router-link to="/" class="button is-danger">Cancelar</router-link>
    </vc-dash-board>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import VcMenu from "@/components/Shared/Menu.vue"
import VcPosts from "@/components/Shared/MenuSide.vue"
import VcDashBoard from "@/components/Shared/DashBoard.vue"
export default {
  name: 'publish',
  components: {
    VcMenu, // <vc-menu/>
    VcPosts, // <vc-posts/>
    VcDashBoard // <vc-dash-board></vc-dash-board>
  },
  data(){
    return{
      urlRepository: null,
    }
  },
  created(){
    let vm = this;

    axios
    .get('http://localhost:8083/api/config')
    .then(response => {
      vm.urlRepository = response.data.repo;
      console.log(response.data.repo);
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    publish() {
      let vm = this;

      var reqData = {"repo": vm.urlRepository}

      this.$http.post('http://localhost:8083/api/config', JSON.stringify(reqData),
      {
      }).then(response => {
        console.log('Success : ' + JSON.stringify(response));
      }, response => {
        console.log('Error : ' + JSON.stringify(response));
      });
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
