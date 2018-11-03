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
            <Button type="primary" @click="handleSubmit('formInline')">更改密码</Button>
        </FormItem>
    </Form>
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
