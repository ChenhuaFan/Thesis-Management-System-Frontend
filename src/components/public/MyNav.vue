<style scoped>
.nav {
  position: fixed;
  bottom: 0;
  top: 64px;
  min-width: 200px;
}
</style>

<template>
<Menu class="nav" :active-name="method" theme="light" width="auto" @on-select="onSelect">
    <MenuItem :name="key" v-for="(value, key, index) in methods" v-bind:key="index" :to="`/${role}/${key}`">
        <Icon :type="value.icon" />
        {{ value.name }}
    </MenuItem>
    <MenuItem name="logout">
        <Icon type="md-log-out" />
        登出
    </MenuItem>
</Menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: mapState({
      method: state => state.global.method,
      role (state) {
        if (state.global.user.role == 'root')
          return 'admin'
        else
          return state.global.user.role
      },
      methods (state) {
        if (this.role == 'root')
          return state.nav['admin']
        else
          return state.nav[this.role]
      }
  }),
  methods: {
    onSelect (name) {
      if (name == 'logout') {
        window.sessionStorage.clear()
        this.$router.push('login')
        this.$store.dispatch('global/reset')
        this.$store.dispatch('global/setMsg', '您已成功退出.')
      }
    }
  }
}
</script>
