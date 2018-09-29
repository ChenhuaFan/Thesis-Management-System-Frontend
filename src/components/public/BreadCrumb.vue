<template>
    <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem to="/">
            <Icon type="ios-home-outline"></Icon> 论文注册系统
        </BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">
            <Icon type="logo-buffer"></Icon> {{ this.$store.getters.getRole }}
        </BreadcrumbItem>
        <BreadcrumbItem>
            <Icon type="ios-cafe"></Icon> {{ this.$store.getters.getMethod }}
        </BreadcrumbItem>
    </Breadcrumb>
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