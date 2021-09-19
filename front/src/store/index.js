import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDark: false,
    itemList: []
  },
  mutations: {
    tapTheme(state) {
      state.isDark = !state.isDark
    },
  },
  actions: {
    //TODO：所有 action 先使用挂载到 window 下的 axios 实例
    fetchNowList({ commit, state }) {
      window.axios.get('/list')
        .then(res => {
          if(res.data?.data?.list?.length) {
            state.itemList = res.data.data.list
          } else {
            $toast('读取数据错误', 1500, state.isDark ? 'light-theme' : '')
          }
        })
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
