<template>
  <div class="timeline">
      <my-mask v-if="isShow"></my-mask>
      <Timeline pending v-if="!isShow">
        <TimelineItem :color="value.type" v-for="(value, key, index) in this.timeLine" v-bind:key="index">
          <p class="time"><Time :time="value.time" /></p>
          <p class="content">{{ value.content }}</p>
        </TimelineItem>
      </Timeline>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     // vm.$store.dispatch('student/getTimeLine', {jwt: vm.jwt, stuId: vm.id})
  //   })
  // },
  data () {
    return {
      
    }
  },
  computed: mapState({
    timeLine: state => state.student.timeLine,
    jwt: state => state.global.jwt,
    id: state => state.global.user.id,
    isShow() {
      return this.timeLine.length == 0
    }
  })
}
</script>

