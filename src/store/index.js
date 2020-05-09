import Vue from 'vue'
import Vuex from 'vuex'

// import cookie from '@/libs/cookie'

Vue.use(Vuex)

const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
const local = localStorage.getItem('language') ? localStorage.getItem('language') : localLang
let lang = local || 'en-US'

const store = new Vuex.Store({
  state: {
    // address: "0xdf9CAf7c7e4540C605fdF17b978A6fa896a55156",
    address: "",
    keystore: '',
    walletType: '',
    language: lang,
    // HDPath: "m/44'/1'/0'/0/0",
    // HDPath: "m/44'/60'/0'/0/0"
    HDPath: "",
    ksObj: {}
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
    setLanguage (state, data) {
      // state.language = data
      let info = data.info ? data.info : ''
      state.language = info
      if (!data.type) {
        localStorage.setItem('language', info)
      }
    },
    setHDPath (state, data) {
      state.HDPath = data
    },
    setKsObj (state, data) {
      state.ksObj = data
    },
  },
})

export default store
