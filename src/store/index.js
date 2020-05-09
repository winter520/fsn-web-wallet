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
    // address: "0x249a8088ad4cf89427Af948ed8741f8EEA0faF52",
    address: "",
    keystore: '',
    walletType: '',
    language: lang,
    // HDPath: "m/44'/60'/0'/0/0"
    HDPath: ""
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
  },
})

export default store
