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
    // address: "0x80962D48724ACD9aE20DaA1cf7A0E5dE80AAE600",
    // address: "0x3f28E90ccd1a91cA06bf8E57B0D558F3f383506D",
    address: "",
    keystore: '',
    walletType: '',
    // walletType: 'trezor',
    language: lang,
    HDPath: "",
    // HDPath: "m/44'/1'/0'/0/0",
    // HDPath: "m/44'/46688'/0'/0/0",
    // HDPath: "m/44'/46688'/1'/0/0",
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
