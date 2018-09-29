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
              <my-mask v-if="isShow"></my-mask>
              <div class="mypaper" v-if="!isShow">
                <paper-info></paper-info>
                <div class="controlBtnsGroup">
                    <Button size="large" type="error" long>取消申报</Button>
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
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // todo: 此处需要修改应该是 actions 获取数据。
      vm.$store.dispatch('getPaperOfStudent')
      vm.$store.dispatch('getTimeLine')
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
  computed: {
    isShow() {
      return this.$store.getters.getStudentPaper.mask
    }
  }
}
</script>

