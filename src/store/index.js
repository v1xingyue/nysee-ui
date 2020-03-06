import Vue from 'vue'
import Vuex from 'vuex'
import Info from './info'

Vue.use(Vuex)

let state = {
  appName: 'nysee applicaiton Center'
}

export default new Vuex.Store({
  state,
  mutations: {
  },
  actions: {
  },
  modules: {
    Info
  }
})
