<template lang="html">
  <div class="tile">
    <vc-menu-top/>
    <vc-menu-side/>
    <vc-dash-board>

      <div class="columns is-gapless is-mobile">
        <div class="column">
          <a class="button is-danger btn-post is-fullwidth" @click="confirmDeletar = !confirmDeletar"><span class="icon-trash-o"></span></a>
        </div>
        <div class="column is-8">
          <b-field>
            <b-input v-model="post.nome"></b-input>
          </b-field>
        </div>
        <div class="column">
          <a class="button is-warning btn-post is-fullwidth" @click="confirmRenomear = !confirmRenomear"><span class="icon-pencil"></span></a>
        </div>
        <div class="column">
          <a class="button is-success btn-post is-fullwidth" @click="SalvarPost()"><span class="icon-check"></span></a>
        </div>
      </div>

      <vc-confirm :mostra="confirmRenomear" @off="confirmRenomear = !confirmRenomear">
        <p>Você será redirecionado à tela inicial, salve seu arquivo antes!</p>
        <p><a class="button is-danger is-large" @click="RenomearPost()">Já salvei! Renomeie meu post!</a></p>
      </vc-confirm>

      <vc-confirm :mostra="confirmDeletar" @off="confirmDeletar = !confirmDeletar">
        <p>Tem certeza disso?</p>
        <p><a class="button is-danger is-large" @click="DeletarPost()">Sim, delete meu post!</a></p>
      </vc-confirm>

      <b-field>
        <b-input type="textarea" v-model="post.conteudo"></b-input>
      </b-field>
    </vc-dash-board>
  </div>
</template>

<script>
import VcMenuTop from "@/components/Shared/MenuTop.vue"
import VcMenuSide from "@/components/Shared/MenuSide.vue"
import VcDashBoard from "@/components/Shared/DashBoard.vue"
import VcConfirm from "@/components/Post/Confirm.vue"
export default {
  name: 'post',
  components: {
    VcMenuTop, // <vc-menu-top/>
    VcMenuSide, // <vc-menu-side/>
    VcDashBoard, // <vc-dash-board></vc-dash-board>
    VcConfirm // <vc-confirm/>
  },
  data(){
    return{
      nomeOriginal: null,
      post: {
        nome: "carregando nome...",
        conteudo: 'carregando...',
      },
      errors: [],
      confirmRenomear: false, // boolean para aviso antes de renomear
      confirmDeletar: false, // boolean para aviso antes de deletar
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
    DeletarPost(){
      this.$http.post('http://localhost:8083/api/deletepost', JSON.stringify(this.post),
      {
      }).then(response => {
        console.log('Success : ' + JSON.stringify(response));
        this.$router.push({ path: '/' })
      }, response => {
        console.log('Error : ' + JSON.stringify(response));
      });
    },
    RenomearPost(){
      var reqData = {
        "nome": this.nomeOriginal,
        "novoNome": this.post.nome,
        "conteudo": this.post.conteudo
      }

      this.$http.post('http://localhost:8083/api/renamepost', JSON.stringify(reqData),
      {
      }).then(response => {
        console.log('Success : ' + JSON.stringify(response));
        this.$router.push({ path: '/' })
      }, response => {
        console.log('Error : ' + JSON.stringify(response));
      });
    },
    SalvarPost() {
      let vm = this;

      var reqData = {"repo": vm.urlRepository}

      this.$http.post('http://localhost:8083/api/savepost', JSON.stringify(vm.post),
      {}).then(response => {
        // console.log('Success : ' + JSON.stringify(response));
        this.$toast.open({
          duration: 5000,
          message: 'Salvo com sucesso!',
          position: 'is-bottom',
          type: 'is-success'
        });
      }, response => {
        // console.log('Error : ' + JSON.stringify(response));
        this.$toast.open({
          duration: 5000,
          message: `Ocorreu erro`,
          position: 'is-bottom',
          type: 'is-danger'
        });
      });
    },
    getPost() {
      let vm = this;

      this.$http.get('http://localhost:8083/api/post/' + this.$route.params.filename).then(response => {
        vm.post = response.body;
        vm.nomeOriginal = vm.post.nome;
      }, response => {
        this.$toast.open({
          message: 'Ocorreu erro no carregamento do post!',
          position: 'is-bottom',
          type: 'is-danger'
        });
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

textarea{
  height: 70vh !important; /* rever compatibilidade com menu superior */
}
</style>
