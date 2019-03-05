import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app' // 引入模块app
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: { // 模块中的东西在state中获取 state.app.name name为app模块中state属性
    app
  },
  getters
})

export default store;