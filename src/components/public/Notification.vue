<style>

</style>

<template>
<div @click="handleOpen">
  <Dropdown trigger="hover" :visible="visible" style="margin-left: 20px">
        <Icon type="md-notifications"/>
        通知
        <Badge dot style="position:relative; top: -18px">
        </Badge>
        <DropdownMenu slot="list">
            <p>常用于各种自定义下拉内容的场景。</p>
            <ul></ul>
        </DropdownMenu>
    </Dropdown>
</div>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
      handleOpen () {
          this.visible = true;
      },
      handleClose () {
          this.visible = false;
      }
  }
}
</script>
