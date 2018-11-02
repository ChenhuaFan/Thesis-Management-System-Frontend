<style scoped>

</style>

<template>
  <div class="profile">
    <Content class="content">
        <h1><Icon type="md-contact" /> 我的账户</h1>
        <p style="padding-bottom: 24px">在此查看并修改个人信息</p>
        <Card :bordered="false">
          <p slot="title"><Icon type="md-document" /> 更改密码</p>
          <Form ref="formInline" :model="formInline" :rules="repwRule" inline>
              <FormItem prop="pw">
                  <Input type="password" v-model="formInline.pw" placeholder="输入新密码">
                      <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="repw">
                  <Input type="password" v-model="formInline.repw" placeholder="确认您的密码">
                      <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formInline')">更改密码</Button>
              </FormItem>
          </Form>
        </Card>
    </Content>
  </div>
</template>

<script>
export default {
    data () {
        return {
            formInline: {
                pw: '',
                repw: ''
            },
            repwRule: {
                pw: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                ],
                repw: [
                    { required: true, message: '请再输入一遍', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid && this.formInline.pw == this.formInline.repw) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('密码不一致');
                }
            })
        }
    }
}
</script>



