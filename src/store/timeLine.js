import http from '../util/http'

export default {
  state: {
    current: {
      timeLine: []
    }
  },
  getters: {
    getTimeLine: state=>{return state.current.timeLine}
  },
  mutations: {
    setTimeLine (state, timeLine) {
      state.current.timeLine = timeLine
    }
  },
  actions: {
    async getTimeLine(context) {
      try {
        let res = await http.get({
          url: 'http://localhost:81/api/timeline/get',
          query: {
            stuId: context.getters.getId
          },
          header: {
            'Accept': 'application/json',
            'jwt': context.getters.getJwt
          }
        })
        if(res.status) {
          context.commit('setTimeLine', res.body);
        } else {
          context.commit('setTimeLine', []);
        }
      } catch (error) {
        return false
      }
    }
  }
}