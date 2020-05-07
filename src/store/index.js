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
    address: localStorage.getItem('address') ? localStorage.getItem('address') : '',
  },
  mutations: {
    setAddress (state, data) {
      let info = data.info ? data.info : ''
      state.address = info
      if (!data.type) {
        localStorage.setItem('address', info)
      }
    },
  },
})

export default store
