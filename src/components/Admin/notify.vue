<template>
  <div>
    <Card>
      <get-root></get-root>
    </Card>
    <br>
    <Row :gutter="16">
      <Col span="16">
        <Card>
          <h2>已发布通知</h2>
          <p>查看最近已发布的5条通知</p>
          <Divider />
          <my-mask v-if="isShow"></my-mask>
          <Timeline pending v-if="!isShow">
            <TimelineItem v-for="(value, key, index) in notify" v-bind:key="index">
              <p class="time"><Time :time="value.time" /></p>
              <p class="content">{{ value.content }}</p>
            </TimelineItem>
          </Timeline>
        </Card>
      </Col>
      <Col span="8">
        <Card>
          <h2>服务控制</h2>
          <p>您的更改将会在10分钟内生效</p>
          <Divider />
          学生 & 教师服务：<i-switch v-model="isServeData" :loading="isSwitch" @on-change="change" >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </Card>
      </Col>
    </Row>
    <br>
    <Card>
      <h2>发布新通知</h2>
      <p>在此发布新通知，通知内容将会被全体用户阅读.</p>
      <Divider />
      <Form :model="formItem" :label-width="80" :rules="ruleLoginForm">
        <FormItem label="通知" prop="notify">
            <Input v-model="formItem.notify" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="通知内容..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="submit">提交</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      await vm.$store.dispatch('global/getSwitch', {jwt: vm.jwt})
      vm.isServeData = vm.isServe
    })
  },
  computed: mapState({
    notify: state => state.global.notify,
    jwt: state => state.global.jwt,
    msg: state => state.global.msg,
    isServe: state => state.global.isServe,
    isSwitch () {
      return this.isServe === ''
    },
    isShow() {
      return this.notify.length == 0
    }
  }),
  data () {
    return {
      isServeData: '',
      formItem: {
        notify: ''
      },
      ruleLoginForm: {
          notify: [
              { required: true, message: '通知内容不能为空', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    async change () {
      if (await this.$store.dispatch('global/updateSwitch', {jwt: this.jwt})) {
        await this.$store.dispatch('global/getSwitch', {jwt: this.jwt})
        this.isServeData = this.isServe
        this.$Notice.success({
          title: this.msg,
          duration: 5
        });
      } 
      else {
        this.isServeData = this.isServe
        this.$Notice.error({
            title: this.msg,
            duration: 5
        });
      }
    },
    async submit () {
      if (await this.$store.dispatch('global/pullNotify', {jwt: this.jwt, body: this.formItem.notify})) {
        this.formItem.notify = ''
        this.$store.dispatch('global/getNotify', {jwt: this.jwt})
        this.$Notice.success({
          title: this.msg,
          duration: 5
        });
      }
      else
        this.$Notice.error({
            title: this.msg,
            duration: 5
        });
    }
  }
}
</script>
