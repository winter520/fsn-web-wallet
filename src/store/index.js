import Vue from 'vue'
import Vuex from 'vuex'

// import cookie from '@/libs/cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    address: '0xE000E632124aa65B80f74E3e4cc06DC761610583',
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
