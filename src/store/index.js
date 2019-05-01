import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app' // 引入模块app
import permission from './modules/permission'
import getters from './getters'
Vue.use(Vuex)

// 模块中的东西在state中获取 state.app.name name为app模块中state属性 
// 模块中的mutation 正常调用 this.$store.commit('方法名字'， 参数)
const store = new Vuex.Store({
  modules: { 
    app,
    permission, 
  },
  getters
})

export default store;