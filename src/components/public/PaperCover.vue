<style scoped>
.paper-cover {
  width: 300px;
  margin: auto;
  height: auto;
  padding: 60px;
  text-align: center;
  border: 1px solid #000
}
.title {
  padding: 30px 0 80px 0;
}
</style>

<template>
  <div class="paper-cover">
    <h1>黄山学院</h1>
    <p>毕业设计（论文）</p>
    <p class="title">题目 <span style="text-decoration: underline">《{{ curPaper.title }}》</span></p>
    <p>姓名 <span style="text-decoration: underline">{{ user.name }}</span></p>
    <p>系（部） <span style="text-decoration: underline">信息工程学院</span></p>
    <p>专业 <span style="text-decoration: underline">{{ user.major }}</span></p>
    <p>指导教师 <span style="text-decoration: underline">{{ curPaper.teacher }}</span></p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
      curPaper: state => state.student.curPaper,
      user: state => state.global.user
  })
}
</script>
