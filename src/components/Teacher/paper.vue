<style scoped>
.title {
  margin-bottom: 24px;
}
.candidate {
  margin: 24px 0;
}
</style>

<template>
  <div class="paper">
    <Content class="content">
        <h1><Icon type="md-list" /> 我发布的论文</h1>
        <p style="padding-bottom: 24px">在此处查看并处理发布的论文</p>
        <Input search enter-button placeholder="查找论文"/>
        <br/>
        <Table border stripe :columns="papers.cols" :data="paperList"></Table>
        <div style="text-align: center; padding: 24px;">
          <Page :total="count" show-elevator show-sizer @on-page-size-change="setPageSize" @on-change="getPapersTable"></Page>
        </div>
        <Drawer title="论文详情" :closable="true" width="800" v-model="isShow">
          <div class="title">
            <h1><Icon type="md-arrow-round-forward" /> 《{{ curPaper.title }}》</h1>
            <br>
            <Steps :current="step">
                <Step title="录入论文池"></Step>
                <Step title="接受报名"></Step>
                <Step title="确定"></Step>
            </Steps>
          </div>
          <div class="candidate">
            <h1><Icon type="md-arrow-round-forward" /> 候选人</h1>
            <br>
            <Alert show-icon>
                您该怎么做？
                <template slot="desc">您可以点击下表中（ <Button size="small" type="error"><Icon type="md-close"></Icon></Button> ）来拒绝该候选人的申请并空出该位置以供其他人选择；您也可以点击下表中（ <Button size="small" type="success"><Icon type="md-checkmark"></Icon></Button> ）来直接确定一位最终人选，而其他的候选人将会被自动拒绝，他们将会继续参与接下来的论文选题。当您认为有必要驳回对该篇论文的审核结果时，您可以通过（ <Button size="small" type="warning"><Icon type="md-refresh"></Icon></Button> ）来回退您的操作，这篇论文将重新开放申请。</template>
            </Alert>
            <Table border :columns="students.cols" :data="curCandidates"></Table>
          </div>
        </Drawer>
    </Content>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    beforeRouteEnter (to, from, next) {
        next(async vm => {
            // todo: 此处需要修改应该是 actions 获取数据。
            await vm.$store.dispatch('teacher/getPaperForTea', {jwt: vm.jwt, name: vm.name, n: vm.n, p: vm.p})
        })
    },
    data () {
        return {
            isShow: false,
            papers: {
                cols: [
                    {
                        title: "论文索引",
                        key: 'id',
                        width: 100
                    },
                    {
                        title: '标题',
                        key: 'title',
                        minWidth: 300
                    },
                    {
                        title: '已选人数(可选3人)',
                        key: 'checked',
                        width: 150,
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        minWidth: 100,
                        align: 'center',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        shape: 'circle',
                                        icon: 'md-eye'
                                    },
                                    on: {
                                        click: () => {
                                            // this.enroll(params.row.id);
                                            this.showDrawer(params.row._index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ]
            },
            students: {
            cols: [
                    {
                        title: '学号',
                        key: 'id',
                        minWidth: 120
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        minWidth: 100
                    },
                    {
                        title: '院系',
                        key: 'department',
                        minWidth: 120
                    },
                    {
                        title: '专业',
                        key: 'major',
                        minWidth: 120
                    },
                    {
                        title: '联系方式',
                        key: 'contact',
                        minWidth: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small',
                                        disabled: !this.able
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: async () => {
                                            await this.accept(params.row.id)
                                        }
                                    }
                                }, [
                                    h('Icon', {
                                    props: {type: 'md-checkmark'}
                                    })
                                ]),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        disabled: !this.able
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.reject(params.row.id)
                                        }
                                    }
                                }, [
                                    h('Icon', {
                                    props: {type: 'md-close'}
                                    })
                                ]),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        disabled: this.able
                                    },
                                    on: {
                                        click: () => {
                                            this.backout(params.row.id)
                                        }
                                    }
                                }, [
                                    h('Icon', {
                                    props: {type: 'md-refresh'}
                                    })
                                ])
                            ]);
                        }
                    }
                ]
            }
        }
    },
    computed: mapState({
        paperList: state => state.teacher.paperList,
        curPaper: state => state.teacher.curPaper,
        n: state => state.teacher.n,
        p: state => state.teacher.p,
        count: state => state.teacher.count,
        jwt: state => state.global.jwt,
        name: state => state.global.user.name,
        msg: state => state.global.msg,
        curCandidates: state => state.teacher.curCandidates,
        step () {
            if (this.curPaper.condition == 'available') {
                return 1
            } else {
                return 3
            }
        },
        able () {
            return this.curPaper.condition == 'available'
        }
    }),
    methods: {
        setPageSize(n) {
            this.$store.dispatch('teacher/setPaperN', n);
            this.$store.dispatch('teacher/getPaperForTea', {jwt: this.jwt, name: this.name, n: this.n, p: this.p});
        },
        getPapersTable(p) {
            this.$store.dispatch('teacher/setPaperP', p);
            this.$store.dispatch('teacher/getPaperForTea', {jwt: this.jwt, name: this.name, n: this.n, p: this.p});
        },
        showDrawer (index) {
            this.$store.dispatch('teacher/setCurPaper', this.paperList[index])
            this.$store.dispatch('teacher/getCandidates', {jwt: this.jwt, id: this.curPaper.id})
            this.isShow = true
        },
        async accept (stuId) {
            const res = await this.$store.dispatch('teacher/accept', {jwt: this.jwt, id: this.curPaper.id, stuId})
            if(res) {
                await this.$store.dispatch('teacher/getPaperForTea', {jwt: this.jwt, name: this.name, n: this.n, p: this.p})
                this.isShow = false
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
        },
        async reject (stuId) {
            const res = await this.$store.dispatch('teacher/reject', {jwt: this.jwt, id: this.curPaper.id, stuId})
            if(res) {
                await this.$store.dispatch('teacher/getPaperForTea', {jwt: this.jwt, name: this.name, n: this.n, p: this.p})
                this.isShow = false
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
        },
        async backout (stuId) {
            const res = await this.$store.dispatch('teacher/backout', {jwt: this.jwt, id: this.curPaper.id, stuId})
            if(res) {
                await this.$store.dispatch('teacher/getPaperForTea', {jwt: this.jwt, name: this.name, n: this.n, p: this.p})
                this.isShow = false
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

