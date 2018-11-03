<style scoped>
    .login-content {
        padding-top: 15%
    }

    .login-content h1 {
        /* font-weight: lighter; */
        text-align: center;
        margin: 30px;
    }
</style>

<template>
    <div class="login-content">
      <h1>欢迎！</h1>
      <Row type="flex" justify="center" align="middle">
        <Col :xs="20" :sm="10" :md="7" :lg="7">
          <Form ref="loginForm" :model="loginForm" :rules="ruleLoginForm">
              <FormItem prop="user">
                  <Input type="text" v-model="loginForm.user" placeholder="请输入'学号'或'工号'">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="password">
                  <Input type="password" v-model="loginForm.password" placeholder="请输入'密码'">
                      <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="role">
                  <RadioGroup v-model="loginForm.role" :style="{textAlign:'center'}">
                      您的身份是：
                      <Radio label="student">
                          <span>学生</span>
                      </Radio>
                      <Radio label="teacher">
                          <span>教师</span>
                      </Radio>
                      <Radio label="admin">
                          <span>管理员</span>
                      </Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('loginForm')" :disabled="loginForm.btnEnable" long>登录</Button>
              </FormItem>
                <Alert type="warning" show-icon>若您没有账户名或密码请联系管理员</Alert>
                <Alert type="warning" show-icon>我们使用 Javascript 和 Cookies 来帮助您更好地使用此系统，因此请不要禁用上述的功能。</Alert>
          </Form>
        </Col>
      </Row>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        mounted: function () {
            const self = this
            this.$nextTick(function () {
                if (self.msg !== '')
                    this.$Notice.warning({
                        title: self.msg,
                        duration: 5
                    });
            })
        },
        computed: mapState({
            msg: state => state.global.msg
        }),
        data () {
            return {
                loginForm: {
                    user: '',
                    password: '',
                    role: 'student',
                    btnEnable: false
                },
                ruleLoginForm: {
                    user: [
                        { required: true, message: '学号 或 工号 不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能低于6位', trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '您必须选择您的登录角色', trigger: 'blur'}
                    ]
                }
                // msg: this.$store.getters.getMsg
            }
        },
        methods: {
            handleSubmit(name) {
                this.loginForm.btnEnable = true
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$store.dispatch('global/login', {
                            id: this.loginForm.user,
                            pw: this.loginForm.password,
                            role: this.loginForm.role,
                        })
                        if (res) {
                            this.$Message.success('登录成功，稍后为您转跳。')
                            setTimeout(() => {
                                this.$router.push('/'+this.loginForm.role)
                            }, 1000)
                        } else {
                            this.$Message.error('登录失败：'+this.msg);
                        }
                    } else {
                        this.$Message.error('请检查您的账户名和密码。');
                    }
                })
                this.loginForm.btnEnable = false
            }
        }
    }
</script>
