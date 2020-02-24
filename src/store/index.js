import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {bookList} from './bookList'
import bookStore from './bookstore'
import cart from './cart'

export default new Vuex.Store({
  state: {
    position:0
  },
  mutations: {
    getPosition(state,payload){
      state.position=payload.position
    }
  },
  actions: {
    
  },
  modules: {
    bookList,
    bookStore,
    cart
  }
})
