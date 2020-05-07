import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

import i18n from '@/local'

import '@/assets/css/css.css'
import $$ from '@/libs/index.js'

import { 
  Button,
  Select
} from 'element-ui'
Vue.use(Button)
Vue.use(Select)

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$$ = $$
Vue.prototype.toUrl = function(url, params) {
  this.$router.push({path: url, query: params})
}
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
