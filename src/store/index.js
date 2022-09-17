import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      page: 1,
      date: new Date()
    }
  },
  mutations: {
    changeDate(state, newDate){
      state.date = new Date(newDate)
    },
    changePage(state, page){
      state.page = page
    }
  },
  actions: {
  },
  modules: {
  }
})
