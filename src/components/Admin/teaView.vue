<style scoped>

</style>

<template>
  <div class="stuView">
    <Card>
      <h2>教师表</h2>
      <p>在此查看数据库中的教师信息并对其修改</p>
      <Divider />
      <Table border stripe :columns="papers.cols" :data="teaList"></Table>
      <div style="text-align: center; padding: 24px;">
        <Page :total="count" show-elevator show-sizer @on-page-size-change="setPageSize" @on-change="getPapersTable"></Page>
      </div>
      <Drawer title="教师详情" :closable="true" width="640" v-model="isShow">
          <enroll-detail></enroll-detail>
      </Drawer>
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('admin/getAllTeacher', {jwt: vm.jwt, n: vm.n, p: vm.p})
        })
    },
  data () {
    return {
        isShow: false,
        papers: {
            counts: 1526,
            n: 10,
            cols: [
                {
                    title: "工号",
                    key: 'id',
                    width: 150
                },
                {
                    title: '姓名',
                    key: 'name',
                    minWidth: 150
                },
                {
                    title: '联系方式',
                    key: 'contact',
                    width: 150,
                }
                // {
                //     title: '操作',
                //     key: 'action',
                //     minWidth: 100,
                //     align: 'center',
                //     fixed: 'right',
                //     render: (h, params) => {
                //         return h('div', [
                //             h('Button', {
                //                 props: {
                //                     type: 'primary',
                //                     size: 'small',
                //                     shape: 'circle',
                //                     icon: 'md-eye'
                //                 },
                //                 on: {
                //                     click: () => {
                //                         // this.enroll(params.row.id);
                //                         this.showDrawer(params.row._index)
                //                     }
                //                 }
                //             }, '查看')
                //         ]);
                //     }
                // }
            ]
        },
    }
  },
  computed: mapState({
    teaList: state => state.admin.teaList,
    n: state => state.admin.n,
    p: state => state.admin.p,
    count: state => state.admin.count,
    jwt: state => state.global.jwt
  }),
  methods: {
    setPageSize(n) {
        this.$store.dispatch('admin/setPaperN', n);
        this.$store.dispatch('admin/getAllTeacher', {jwt: this.jwt, n: this.n, p: this.p});
    },
    getPapersTable(p) {
        this.$store.dispatch('admin/setPaperP', p);
        this.$store.dispatch('admin/getAllTeacher', {jwt: this.jwt, n: this.n, p: this.p});
    }
    // showDrawer (index) {
    //     this.$store.dispatch('setCurrentPaper', this.$store.getters.getPaperList[index])
    //     this.isShow = true
    // }
  }
}
</script>