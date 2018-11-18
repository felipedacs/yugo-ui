import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import "vue-material-design-icons/styles.css"

Vue.use(Buefy)

import VueResource from 'vue-resource'
Vue.use(VueResource)
// Vue.http.options.emulateJSON = true
// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
//nightwatch e2e

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
