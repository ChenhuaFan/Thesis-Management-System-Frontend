<style scoped>
.nav {
  position: fixed;
  bottom: 0;
  top: 64px;
  min-width: 200px;
}
</style>

<template>
<Menu class="nav" :active-name="this.$store.getters.getMethod" theme="light" width="auto" @on-select="onSelect">
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
export default {
  data () {
    return {
      role: this.$store.getters.getRole,
      // to: this.$route
      methods: this.$store.getters.getMethods
    }
  },
  computed: {
    
  },
  methods: {
    onSelect (name) {
      if (name == 'logout') {
        window.sessionStorage.clear()
        this.$router.push('login')
        this.$store.dispatch('reset')
        this.$store.commit('setMsg', '您已成功退出.')
      }
    }
  }
}
</script>
