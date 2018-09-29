<style scoped>
.user-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
}
.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav {
    width: auto;
    float: right;
    margin-right: 20px;
    height: 10vh;
}
</style>

<template>
<Menu class="user-bar" mode="horizontal" theme="dark" @on-select="show">
    <div class="layout-logo"></div>
    <div class="layout-nav">
        <!-- <MenuItem name="notify">
            <my-notification></my-notification>
        </MenuItem> -->
        <MenuItem name="help">
            帮助 & 关于
        </MenuItem>
        <MenuItem name="2">
            <Icon type="md-person"></Icon>
            您好，{{ this.$store.getters.getName }}
        </MenuItem>
    </div>
    <Modal
        v-model="isShow"
        title="关于">
        <p>欢迎使用 论文管理系统</p>
        <p>本系统由 信息工程学院:软件小组 开发维护</p>
        <p>如有疑问，请发送邮件到 rjzx@qq.com</p>
    </Modal>
</Menu>
</template>

<script>
export default {
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        show(name) {
            if (name == 'help')
                this.isShow = true
        }
    }
}
</script>
