<style scoped>
.layout{
    background: #f5f7f9;
    position: relative;
    min-height: 100vh;
    overflow: scroll;
}
</style>

<template>
    <div class="layout" id="app">
        <Layout>
            <Header>
                <user-bar></user-bar>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <my-nav></my-nav>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <my-breadcrumb></my-breadcrumb>
                    <br>
                    <router-view></router-view>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {

    }
</script>
