<template lang="html">
  <div class="tile">
    <vc-menu-top/>
    <vc-menu-side/>
    <vc-dash-board>

      <b-message title="Exemplo de preenchimento">
        <b-field label="Name" :horizontal="true">
          <b-input value="github.com/felipedacs/meublog"></b-input>

        </b-field>
        <b-field label="Usuario" :horizontal="true">
          <b-input value="felipedacs"></b-input>
        </b-field>

        <b-field label="Senha" :horizontal="true">
          <b-input value="senha secreta" type="password" password-reveal></b-input>
        </b-field>
      </b-message>


      <b-field label="Name" :horizontal="true">
        <b-input v-model="urlRepository"></b-input>

      </b-field>
      <b-field label="Usuario" :horizontal="true">
        <b-input v-model="userRepository"></b-input>
      </b-field>

      <b-field label="Senha" :horizontal="true">
        <b-input v-model="senhaRepository" type="password" password-reveal></b-input>
      </b-field>


      <a class="button is-success" @click="publish">Publicar</a>
    </vc-dash-board>
  </div>
</template>

<script>
import VcMenuTop from "@/components/Shared/MenuTop.vue"
import VcMenuSide from "@/components/Shared/MenuSide.vue"
import VcDashBoard from "@/components/Shared/DashBoard.vue"
export default {
  name: 'publish',
  components: {
    VcMenuTop, // <vc-menu-top/>
    VcMenuSide, // <vc-menu-side/>
    VcDashBoard // <vc-dash-board></vc-dash-board>
  },
  data(){
    return{
      urlRepository: null,
      userRepository: null,
      senhaRepository: null,
    }
  },
  created(){
    let vm = this;

    this.$http.get('http://localhost:8083/api/config').then(response => {
      vm.urlRepository = response.body.repo;
    }, response => {
      this.$toast.open({
        duration: 5000,
        message: 'Ocorreu erro no carregamento de yugo.json!',
        position: 'is-bottom',
        type: 'is-danger'
      });
    });
  },
  methods: {
    publish() {
      let vm = this;

      var reqData = {
        "repo": vm.urlRepository,
        "usuario": vm.userRepository,
        "senha": vm.senhaRepository
      }

      if (reqData.repo !== null||reqData.usuario !== null||reqData.senha !== null) {
        this.$http.post('http://localhost:8083/api/config', JSON.stringify(reqData),
        {
        }).then(response => {
          console.log('Success : ' + JSON.stringify(response));
          this.$toast.open({
            duration: 5000,
            message: 'Confira em 15 minutos se o repositório foi atualizado!',
            position: 'is-bottom',
            type: 'is-success'
          });
        }, response => {
          console.log('Error : ' + JSON.stringify(response));
          this.$toast.open({
            duration: 5000,
            message: 'Ocorreu erro!',
            position: 'is-bottom',
            type: 'is-danger'
          });
        });
      }
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
