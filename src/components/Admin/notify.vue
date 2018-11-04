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
          <p>查看至今为止所有已经发布的通知</p>
          <Divider />
          <my-mask v-if="isShow"></my-mask>
          <Timeline pending v-if="!isShow">
            <TimelineItem v-for="(value, key, index) in this.timeLine" v-bind:key="index">
              <p class="time"><Time :time="value.time" /></p>
              <p class="content">{{ value.content }}</p>
            </TimelineItem>
          </Timeline>
        </Card>
      </Col>
      <Col span="8">
        <Card>
          <h2>服务控制</h2>
          <p>开启或关闭所有论文功能</p>
          <Divider />
          所有服务：<i-switch v-model="isService" @on-change="change" >
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
      <Form :model="formItem" :label-width="80">
        <FormItem label="通知">
            <Input v-model="formItem.notify" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="通知内容..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary">提交</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isService: true,
      isShow: false,
      timeLine: [
        {
          'content': '第一次论文选题已经开始',
          'time': '2018-10-05 03:53:21'
        },
        {
          'content': '第二次论文选题已经开始',
          'time': '2018-11-05 03:53:21'
        },
      ],
      formItem: {
        notify: ''
      }
    }
  },
  methods: {
    change (state) {
      console.log(state)
    }
  }
}
</script>
