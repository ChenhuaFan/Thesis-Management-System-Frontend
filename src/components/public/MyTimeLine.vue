<template>
  <div class="timeline">
      <my-mask v-if="show"></my-mask>
      <Timeline pending v-if="!show">
        <TimelineItem :color="value.type" v-for="(value, key, index) in this.$store.getters.getTimeLine" v-bind:key="index">
          <p class="time"><Time :time="value.time" /></p>
          <p class="content">{{ value.content }}</p>
        </TimelineItem>
      </Timeline>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  computed: {
    show () {
      return (this.$store.getters.getTimeLine.length == 0)
    }
  }
}
</script>

