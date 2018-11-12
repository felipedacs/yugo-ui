<template lang="html">
  <div class="tile">
    <vc-menu/>
    <vc-posts/>
    <vc-dash-board>
      <b-field label="Name" :horizontal="true">
        <b-input v-model="urlRepository"></b-input>
      </b-field>

      <router-link to="/" class="button is-success">Publicar e sair</router-link>
      <router-link to="/" class="button is-danger">Cancelar</router-link>
    </vc-dash-board>
  </div>
</div>
</template>

<script>
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
    // mockar
    this.urlRepository = 'aaaeeee';
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
