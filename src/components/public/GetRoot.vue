<style scoped>

</style>

<template>
  <div class="getRoot">
    <h2><Icon type="md-unlock" /> 获取您的 Root 权限</h2>
      <p>再输入一次管理员密码来提升您的等级权限</p>
      <Divider />
      <Form ref="rootForm" :model="rootForm" :rules="ruleInline" inline>
        <FormItem prop="pw">
            <Input type="password" v-model="rootForm.pw" placeholder="再输入一次管理员密码">
                <Icon type="md-lock" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('rootForm')">提升权限</Button>
        </FormItem>
      </Form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
        rootForm: {
            pw: ''
        },
        ruleInline: {
            pw: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { type: 'string', min: 6, message: '密码不能低于6位', trigger: 'blur' }
            ]
        }
    }
  },
  computed: mapState({
    jwt: state => state.global.jwt,
    msg: state => state.global.msg
  }),
  methods: {
        handleSubmit(name) {
          this.$refs[name].validate(async (valid) => {
              if (valid) {
                    const res = await this.$store.dispatch('admin/getRoot', {jwt: this.jwt, pw: this.rootForm.pw})
                    if (res)
                        this.$Notice.success({
                            title: this.msg,
                            duration: 5
                        });
                    else
                        this.$Notice.error({
                            title: this.msg,
                            duration: 5
                        });
              } else {
                  this.$Message.error('失败，请注意是否满足填写要求？');
              }
          })
      }
  }
}
</script>
