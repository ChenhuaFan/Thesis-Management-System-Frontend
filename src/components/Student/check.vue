<style scoped>

</style>

<template>
  <div class="check">
    <Content class="content">
        <h1><Icon type="md-list" /> 论文池</h1>
        <p style="padding-bottom: 24px">在此处查看并申报论文</p>
        <paper-ruler></paper-ruler>
        <Input search enter-button placeholder="查找感兴趣的论文"/>
        <br/>
        <Table border stripe :columns="papers.cols" :data="this.paperList"></Table>
        <div style="text-align: center; padding: 24px;">
          <Page :total="this.count" show-elevator show-sizer @on-page-size-change="setPageSize" @on-change="getPapersTable"></Page>
        </div>
        <Drawer title="论文详情" :closable="true" width="640" v-model="isShow">
            <enroll-detail></enroll-detail>
        </Drawer>
    </Content>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('student/getPaperForStu', {jwt: vm.jwt, major: vm.major, n: vm.n, p: vm.p})
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
                    title: '所属教师',
                    key: 'teacher',
                    align: 'center',
                    width: 150,
                    sortable: true
                },
                {
                    title: '申报情况(可选3人)',
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
    }
  },
  computed: mapState({
    name: state => state.global.user.name,
    major: state => state.global.user.major,
    paperList: state => state.student.paperList,
    n: state => state.student.n,
    p: state => state.student.p,
    count: state => state.student.count,
    jwt: state => state.global.jwt,
    id: state => state.global.user.id
  }),
  methods: {
    setPageSize(n) {
        this.$store.dispatch('student/setPaperN', n);
        this.$store.dispatch('student/getPaperForStu', {jwt: this.jwt, major: this.major, n: this.n, p: this.p});
    },
    getPapersTable(p) {
        this.$store.dispatch('student/setPaperP', p);
        this.$store.dispatch('student/getPaperForStu', {jwt: this.jwt, major: this.major, n: this.n, p: this.p});
    },
    showDrawer (index) {
        this.$store.dispatch('student/setCurPaper', this.paperList[index])
        this.$store.dispatch('student/getTeaContact', {jwt: this.jwt, name: this.paperList[index]['teacher']})
        this.isShow = true
    }
  }
}
</script>

