/*
状态模块设计原则为：
顶层: View <---- state.current  // current 用于当前的页面展示. getters 作用在此.
中层: state.current <---- state.data // state 的 current数据 可以通过 data 更新 通过 mutations 触发
底层: state.data <---- mutations <---- actions // state 的 data 则可以通过 actions 从服务器得到数据 再通过 mutations 更改。
*/
import http from '../util/http'

export default {
  state: {
    // 当前的状态
    current: {
      // 当前论文的内容和关联的其他信息
      paper: {},
      teacher: {},
      students: [],
      // student: {},
      // 当前论文列表
      list: [],
      page: {
        total: 0,
        n: 10,
        p: 1
      }
    },
    student: {
      // 学生申报的论文
      paper: {
        mask: true,
        body: {}
      }
    }
  },
  getters: {
    getPaper: state=>{return state.current.paper},
    getTeacher: state=>{return state.current.teacher},
    getStudents: state=>{return state.current.students},
    getPaperList: state=>{return state.current.list},
    getStudentPaper: state=>{return state.student.paper},
    getPage: state=>{return state.current.page},
  },
  mutations: {
    setPaperList (state, list) {
      state.current.list = list
    },
    setCurrentPaper (state, paper) {
      state.current.paper = paper
    },
    setCurrentStudent (state, student) {
      state.current.student = student
    },
    setPaperTotal (state, total) {
      state.current.page.total = total
    },
    setPaperN (state, n) {
      state.current.page.n = n
    },
    setPaperP (state, p) {
      state.current.page.p = p
    },
    setStudentPaper (state, paper) {
      console.log(state.student.paper.body)
      state.student.paper.body = paper
      if (paper.id == undefined)
        state.student.paper.mask = true
      else
        state.student.paper.mask = false
    },
    setStudents (state, students) {
      state.current.students = students
    }
  },
  actions: {
    reset (context) {
      context.commit('setPaperList', [])
      context.commit('setCurrentPaper', {})
      context.commit('setCurrentStudent', {})
      context.commit('setPaperTotal', 0)
      context.commit('setPaperN', 10)
      context.commit('setPaperP', 1)
      context.commit('setStudentPaper', {})
    },
    getStudentPaper (context) {
      // 得到当前学生的论文
      context
    },
    async getAllPapersOfStudent (context) {
      try {
        let res = await http.get({
          url: 'http://localhost:81/api/paper/get',
          query: {
            condition: 'available',
            p: context.getters.getPage.p,
            n: context.getters.getPage.n
          },
          header: {
            'Accept': 'application/json',
            'jwt': context.getters.getJwt
          }
        })
        if (res.status) {
          context.commit('setPaperList', res.body)
          context.commit('setPaperTotal', res.counts)
          return true
        } else {
          return false
        }
      } catch (error) {
        return false
      }
    },
    async getPaperOfStudent (context) {
      try {
        if (context.getters.getEnrollPaperId == -1) {
          return
        }
        let res = await http.get({
          url: 'http://localhost:81/api/paper/get',
          query: {
            id: context.getters.getEnrollPaperId
          },
          header: {
            'Accept': 'application/json',
            'jwt': context.getters.getJwt
          }
        })
        if (res.status) {
          context.commit('setStudentPaper', res.body[0])
          context.commit('setCurrentPaper', res.body[0])
          return true
        } else {
          return false
        }
      } catch (error) {
        return false
      }
    }
    ,
    async getAllPapersOfTeacher (context) {
      // 根据教师需要来获得所有可用的论文
      try {
        let res = await http.get({
          url: 'http://localhost:81/api/paper/get',
          query: {
            teaName: context.getters.getName,
            p: context.getters.getPage.p,
            n: context.getters.getPage.n
          },
          header: {
            'Accept': 'application/json',
            'jwt': context.getters.getJwt
          }
        })
        console.log(res)
        if (res.status) {
          context.commit('setPaperList', res.body)
          context.commit('setPaperTotal', res.counts)
          return true
        } else {
          return false
        }
      } catch (error) {
        return false
      }
    },
    async getStudentsOfPaper (context) {
      try {
        let res = await http.get({
          url: 'http://localhost:81/api/enroll/get',
          query: {
            paperId: context.getters.getPaper.id
          },
          header: {
            'Accept': 'application/json',
            'jwt': context.getters.getJwt
          }
        })
        if(res.status) {
          context.commit('setStudents', res.body);
        } else {
          context.commit('setStudents', []);
        }
      } catch (error) {
        return false
      }
    },
    // // 此方法废弃
    // initPage (context, paper) {
    //   context.commit('setCurrentPaper', paper)
    // }
  }
}