<template>
  <div>
    <h2><Icon type="md-document" /> 更改密码</h2>
    <p>为了您的账号安全，请更改您的默认密码。</p>
    <Divider />
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
            <Button type="primary" @click="handleSubmit('formInline')" :disabled="formInline.btnEnable">更改密码</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
        formInline: {
            pw: '',
            repw: '',
            btnEnable: false
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
computed: mapState({
    id: state => state.global.user.id,
    role: state => state.global.user.role
}),
methods: {
    handleSubmit(name) {
        this.formInline.btnEnable = true
        this.$refs[name].validate(async (valid) => {
            if (valid && this.formInline.pw == this.formInline.repw) {
                console.log({
                    id: this.id,
                    pw: this.formInline.repw,
                    role: this.role,
                })
                const res = await this.$store.dispatch('global/updatePW', {
                    id: this.id,
                    pw: this.formInline.repw,
                    role: this.role,
                })
                if (res) {
                    this.$Message.success('更改成功，请重新登录。')
                    this.$router.push('/login')
                } else {
                    this.$Message.error('更新失败'+this.msg);
                }
            } else {
                this.$Message.error('两次密码不相同');
            }
        })
        this.formInline.btnEnable = false
    }
}
}
</script>
