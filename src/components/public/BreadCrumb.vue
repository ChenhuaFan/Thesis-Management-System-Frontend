<template>
    <Alert v-if="isShow" banner closable type="info" show-icon :style="{margin: '24px 0'}">
        来自 <Time :time="oneNotify.time" /> 管理员的通知
        <span slot="desc">{{ oneNotify.title }}: {{ oneNotify.content }}</span>
    </Alert>
</template>

<script>
import { mapState } from 'vuex'
export default {
    // beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //     })
    // },
    computed: mapState({
        oneNotify: state => state.global.notify[0],
        jwt: state => state.global.jwt,
        msg: state => state.global.msg,
        isShow(state) {
            return state.global.notify.length != 0
        }
    }),
    data () {
      return {
        
      }
    }
}
</script>