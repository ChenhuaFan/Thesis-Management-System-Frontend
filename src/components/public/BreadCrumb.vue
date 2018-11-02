<template>
    <!-- <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem to="/">
            <Icon type="ios-home-outline"></Icon> 论文注册系统
        </BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">
            <Icon type="logo-buffer"></Icon> {{ this.$store.getters.getRole }}
        </BreadcrumbItem>
        <BreadcrumbItem>
            <Icon type="ios-cafe"></Icon> {{ this.$store.getters.getMethod }}
        </BreadcrumbItem>
    </Breadcrumb> -->
    <Alert banner closable type="info" show-icon :style="{margin: '24px 0'}">
        来自管理员的通知
        <span slot="desc">第一轮论文申报已经开始,请各位老师同学抓紧时间。</span>
    </Alert>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    },
    computed: {
      
    }
  }
</script>