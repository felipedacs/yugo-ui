import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiRoot: 'http://localhost:8083',
    pathPosts: '/api/posts',
    pathPost: '/api/post/',

  },
  mutations: {

  },
  actions: {

  }
})
