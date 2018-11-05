<style scoped>

</style>

<template>
  <div class="enrolldetail">
    <paper-info></paper-info>
    <div class="controlBtnsGroup">
        <Alert v-if="isShowEnrollBtn" type="warning" show-icon>你已经申请过论文了，因此不能再选择其他论文。</Alert>
        <Button v-if="!isShowEnrollBtn" size="large" type="info" long @click="enroll()">申报该论文</Button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      
    }
  },
  computed: mapState({
    myPaper: state => state.student.myPaper,
    curPaper: state => state.student.curPaper,
    jwt: state => state.global.jwt,
    msg: state => state.global.msg,
    isShowEnrollBtn() {
      return JSON.stringify(this.myPaper) != "{}"
    }
  }),
  methods: {
    async enroll () {
      const res = await this.$store.dispatch('student/enroll', {jwt: this.jwt, id: this.curPaper.id})
      console.log(res)
      if(res) {
        this.$router.push('/student/paper')
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

