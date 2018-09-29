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
        <Table border stripe :columns="papers.cols" :data="this.$store.getters.getPaperList"></Table>
        <div style="text-align: center; padding: 24px;">
          <Page :total="papers.counts" show-elevator show-sizer @on-page-size-change="setPageSize" @on-change="getPapersTable"></Page>
        </div>
        <Drawer title="论文详情" :closable="true" width="640" v-model="isShow">
          <div class="title">
            <h1><Icon type="md-arrow-round-forward" /> 《{{ this.$store.getters.getPaper.title }}》</h1>
            <br>
            <Steps :current="1">
                <Step title="录入论文池"></Step>
                <Step title="接受报名"></Step>
                <Step title="申请人评审"></Step>
                <Step title="确定"></Step>
            </Steps>
          </div>
          <div class="candidate">
            <h1><Icon type="md-arrow-round-forward" /> 候选人</h1>
            <br>
            <Alert show-icon>
                您该怎么做？
                <template slot="desc">您可以点击下表中（ <Button size="small" type="error"><Icon type="md-close"></Icon></Button> ）来拒绝该候选人的申请并空出该位置以供其他人选择；您也可以点击下表中（ <Button size="small" type="success"><Icon type="md-checkmark"></Icon></Button> ）来直接确定一位最终人选，而其他的候选人将会被自动拒绝，他们将会继续参与接下来的论文选题。</template>
            </Alert>
            <Table border :columns="students.cols" :data="this.$store.getters.getStudents"></Table>
          </div>
        </Drawer>
    </Content>
  </div>
</template>

<script>
export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // todo: 此处需要修改应该是 actions 获取数据。
            //   vm.$store.dispatch('initPage', vm.$store.getters.getStudentPaper.body)
            vm.$store.dispatch('getAllPapersOfTeacher')
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
                        width: 100,
                        align: 'center',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
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
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, [
                                    h('Icon', {
                                    props: {type: 'md-close'}
                                    })
                                ])
                            ]);
                        }
                    }
                ]
            }
        }
    },
    methods: {
        setPageSize(n) {
            this.$store.commit('setPaperN', n);
            this.$store.dispatch('getAllPapersOfTeacher');
        },
        getPapersTable(p) {
            this.$store.commit('setPaperP', p);
            this.$store.dispatch('getAllPapersOfTeacher');
        },
        showDrawer (index) {
            this.$store.commit('setCurrentPaper', this.$store.getters.getPaperList[index])
            this.$store.dispatch('getStudentsOfPaper')
            this.isShow = true
        }
    }
}
</script>

