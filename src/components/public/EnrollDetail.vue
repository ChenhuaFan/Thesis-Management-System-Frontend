<style scoped>

</style>

<template>
  <div class="enrolldetail">
    <paper-info></paper-info>
    <div class="controlBtnsGroup">
        <Alert v-if="!isShowEnrollBtn" type="warning" show-icon>你已经申请过论文了，因此不能再选择其他论文。</Alert>
        <Button v-if="isShowEnrollBtn" size="large" type="info" long @click="this.$store">申报该论文</Button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  computed: {
    isShowEnrollBtn() {
      return this.$store.getters.getStudentPaper.mask
    }
  }
}
</script>

