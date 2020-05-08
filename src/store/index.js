import Vue from 'vue'
import Vuex from 'vuex'

// import cookie from '@/libs/cookie'

Vue.use(Vuex)

// let ksArr = {}, addressObj = {}
// if (localStorage.getItem('keystoreObj')) {
//   ksArr = JSON.parse(localStorage.getItem('keystoreObj'))
// }
// if (localStorage.getItem('addressObj')) {
//   addressObj = JSON.parse(localStorage.getItem('addressObj'))
// } 

// const navLang = navigator.language
// const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
// const local = localStorage.getItem('language') ? localStorage.getItem('language') : localLang
// let lang = local || 'en-US'

const store = new Vuex.Store({
  state: {
    address: '',
    keystore: '',
    walletType: ''
  },
  mutations: {
    setAddress (state, data) {
      state.address = data
    },
    setKeystore (state, data) {
      state.keystore = data
    },
    setWalletType (state, data) {
      state.walletType = data
    },
  },
})

export default store
