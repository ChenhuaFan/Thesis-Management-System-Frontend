<style scoped>

</style>

<template>
  <div class="profile">
    <Content class="content">
        <h1><Icon type="md-contact" /> 我的账户</h1>
        <p style="padding-bottom: 24px">在此查看并修改个人信息</p>
        <Card :bordered="false">
          <p slot="title"><Icon type="md-document" /> 更改密码</p>
          <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
              <FormItem prop="user">
                  <Input type="text" v-model="formInline.user" placeholder="Username">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="password">
                  <Input type="password" v-model="formInline.password" placeholder="Password">
                      <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
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
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
}
</script>

