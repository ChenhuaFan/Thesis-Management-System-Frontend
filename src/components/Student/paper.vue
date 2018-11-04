<style scoped>
.time{
    font-size: 14px;
    font-weight: bold;
}
.content{
    padding-left: 5px;
}
</style>

<template>
  <div class="paper">
    <Content class="content">
        <h1><Icon type="md-paper" /> 我的论文</h1>
        <p style="padding-bottom: 24px">在此处追踪并管理已申请的论文</p>
        <paper-ruler></paper-ruler>
        <Row :gutter="16">
          <Col span="8">
            <Card :bordered="false">
              <p slot="title"><Icon type="md-time" /> 时间线</p>
              <my-timeline></my-timeline>
            </Card>
          </Col>
          <Col span="16">
            <Card :bordered="false">
              <p slot="title"><Icon type="md-paper" /> 我的论文</p>
              <!-- 模块 my-paper 尚未抽离出来 -->
              <!-- 根据学生是否有论文来决定是否显示 -->
              <my-mask v-if="!isShow"></my-mask>
              <div class="mypaper" v-if="isShow">
                <paper-info></paper-info>
                <div class="controlBtnsGroup">
                    <Button v-if="isCancelable" size="large" type="error" long @click="cancel()">取消申报</Button>
                    <Alert v-if="!isCancelable" type="warning" show-icon>只有当论文处于可申报状态时，您才可以取消您的申请。</Alert>
                </div>
              </div>
              <!-- 模块 my-paper 尚未抽离出来 -->
            </Card>
          </Col>
        </Row>
    </Content>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('student/getTimeLine', {jwt: vm.jwt, stuId: vm.id})
      vm.$store.dispatch('student/getStudentPaper', {jwt: vm.jwt, stuId: vm.id})
      vm.$store.dispatch('student/setCurPaper', vm.myPaper)
    })
  },
  data() {
    return {
      pStyle: {
          fontSize: '24px',
          color: 'rgba(0,0,0,0.85)',
          lineHeight: '30px',
          display: 'block',
          marginBottom: '16px'
      }
    }
  },
  computed: mapState({
    myPaper: state => state.student.myPaper,
    curPaper: state => state.student.curPaper,
    jwt: state => state.global.jwt,
    id: state => state.global.user.id,
    msg: state => state.global.msg,
    isShow() {
      return JSON.stringify(this.myPaper) != "{}"
    },
    isCancelable() {
      return this.myPaper.condition == 'available'
    }
  }),
  methods: {
    async cancel () {
      const res = await this.$store.dispatch('student/cancel', {jwt: this.jwt, id: this.curPaper.id})
      if(res) {
        this.$store.dispatch('student/getStudentPaper', {jwt: this.jwt, stuId: this.id})
        this.$Notice.success({
            title: this.msg,
            duration: 5
        });

      }
      else
        this.$Notice.error({
            title: this.msg,
            duration: 5
        });
    }
  }
}
</script>

