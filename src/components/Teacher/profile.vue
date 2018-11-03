<style scoped>

</style>

<template>
  <div class="profile">
    <Content class="content">
        <h1><Icon type="md-contact" /> 我的账户</h1>
        <p style="padding-bottom: 24px">在此查看并修改个人信息</p>
        <Card :bordered="false">
          <change-pw></change-pw>
        </Card>
    </Content>
  </div>
</template>

<script>
export default {
    
}
</script>



