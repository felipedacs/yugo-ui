<template lang="html">
  <div class="tile">
    <vc-menu/>
    <vc-posts/>
    <vc-dash-board>

      <div class="columns is-gapless is-mobile">
        <div class="column">
          <a class="button is-danger btn-post is-fullwidth" @click="DeletarPost()"><span class="icon-trash-o"></span></a>
        </div>
        <div class="column is-8">
          <b-field>
            <b-input v-model="post.nome"></b-input>
          </b-field>
        </div>
        <div class="column">
          <a class="button is-warning btn-post is-fullwidth" @click="RenomearPost()"><span class="icon-pencil"></span></a>
        </div>
        <div class="column">
          <a class="button is-success btn-post is-fullwidth" @click="SalvarPost()"><span class="icon-check"></span></a>
        </div>
      </div>



      <b-field>
        <b-input type="textarea" v-model="post.conteudo"></b-input>
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
      nomeOriginal: null,
      post: {
        nome: "carregando nome...",
        conteudo: 'carregando...',
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
    DeletarPost(){
      this.$http.post('http://localhost:8083/api/deletepost', JSON.stringify(this.post),
      {
      }).then(response => {
        console.log('Success : ' + JSON.stringify(response));
      }, response => {
        console.log('Error : ' + JSON.stringify(response));
      });
    },
    RenomearPost(){
      console.log(this.nomeOriginal);
      var reqData = {
        "nome": this.nomeOriginal,
        "novoNome": this.post.nome,
        "conteudo": this.post.conteudo
      }

      this.$http.post('http://localhost:8083/api/renamepost', JSON.stringify(reqData),
      {
      }).then(response => {
        console.log('Success : ' + JSON.stringify(response));
      }, response => {
        console.log('Error : ' + JSON.stringify(response));
      });
    },
    SalvarPost() {
      let vm = this;

      var reqData = {"repo": vm.urlRepository}

      this.$http.post('http://localhost:8083/api/savepost', JSON.stringify(vm.post),
      {
      }).then(response => {
        console.log('Success : ' + JSON.stringify(response));
      }, response => {
        console.log('Error : ' + JSON.stringify(response));
      });
    },
    getPost() {
      axios
      .get('http://localhost:8083/api/post/' + this.$route.params.filename)
      .then(response => {
        this.post = response.data;
        this.nomeOriginal=this.post.nome;
        // console.log(response.data);
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
