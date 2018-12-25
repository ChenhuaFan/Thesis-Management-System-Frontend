<style scoped>
  .demo-drawer-profile{
      font-size: 14px;
  }
  .demo-drawer-profile .ivu-col{
      margin-bottom: 12px;
  }
</style>

<template>
        <div class="paper-info">
            <p :style="pStyle"><Icon type="md-arrow-round-forward" />《{{ curPaper.title }}》</p>
            <br />
            <div class="demo-drawer-profile">
                <Row>
                    <Col span="24">
                        <Steps :current="step">
                            <Step title="录入论文池"></Step>
                            <Step title="接受报名"></Step>
                            <Step title="确定"></Step>
                        </Steps>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        指导教师: {{ curPaper.teacher }}
                    </Col>
                    <Col span="12">
                        当前已选: {{ curPaper.checked }} / 3
                    </Col>
                </Row>
            </div>
            <br />
            <p :style="pStyle"><Icon type="md-arrow-round-forward" /> 预览</p>
            <div class="demo-drawer-profile">
                <Row>
                    <Col span="24">
                        <paper-cover></paper-cover>
                    </Col>
                </Row>
            </div>
            <br />
            <p :style="pStyle"><Icon type="md-arrow-round-forward" /> 与指导教师取得联系</p>
            <div class="demo-drawer-profile">
                <Row>
                    <Col span="12">
                        电话号码: {{ teaContact }}
                    </Col>
                </Row>
            </div>
            <Divider />
        </div>
</template>
<script>
import { mapState } from 'vuex'
    export default {
        data () {
            return {
                pStyle: {
                    fontSize: '24px',
                    color: 'rgba(0,0,0,0.85)',
                    lineHeight: '30px',
                    display: 'block',
                    marginBottom: '16px'
                }
            }
        },
        computed: mapState({
            curPaper: state => state.student.curPaper,
            teaContact: state => state.student.teaContact,
            step() {
                if (this.curPaper.condition == 'available') {
                    return 1
                } else {
                    return 3
                }
            }
        })
    }
</script>

