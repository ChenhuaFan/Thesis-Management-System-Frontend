<style scoped>

</style>

<template>
  <div class="stuView">
    <Card>
      <h2>论文表</h2>
      <p>在此查看数据库中的论文信息并对其修改</p>
      <Divider />
      <Table border stripe :columns="papers.cols" :data="ppList"></Table>
      <div style="text-align: center; padding: 24px;">
        <Page :total="count" show-elevator show-sizer @on-page-size-change="setPageSize" @on-change="getPapersTable"></Page>
      </div>
      <Drawer title="论文详情" :closable="true" width="640" v-model="isShow">
          <enroll-detail></enroll-detail>
      </Drawer>
    </Card>
    <br>
    <Card>
      <h2>导出论文汇总</h2>
      <p>将数据库中的数据以特定格式导出</p>
      <Divider />
      <Table border stripe :columns="example.cols" :data="exPpList"></Table>
      <div style="text-align: center; padding: 24px;">
        <Page :total="count" show-elevator show-sizer @on-page-size-change="setExportSize" @on-change="getExportTable"></Page>
      </div>
      <Button type="success" long large @click="getFile()">导出论文汇总</Button>
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('admin/getAllPaper', {jwt: vm.jwt, n: vm.n, p: vm.p})
            vm.$store.dispatch('admin/getExportPaperList', {jwt: vm.jwt, n: vm.exN, p: vm.exP})
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
                    title: "论文索引",
                    key: 'id',
                    width: 150
                },
                {
                    title: '标题',
                    key: 'title',
                    minWidth: 150
                },
                {
                    title: '指导教师',
                    key: 'teacher',
                    width: 150,
                },
                {
                    title: '申报人数',
                    key: 'checked',
                    width: 150,
                },
                {
                    title: '论文状态',
                    key: 'condition',
                    width: 150
                },
                {
                    title: '论文类型',
                    key: 'type',
                    width: 100,
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
        example: {
          cols: [
              {
                  title: "学号",
                  key: 'id',
                  width: 150
              },
              {
                  title: '姓名',
                  key: 'name',
                  width: 150
              },
              {
                  title: '论文标题',
                  key: 'title',
                  minWidth: 150,
              },
              {
                  title: '指导教师',
                  key: 'teacher',
                  width: 150,
              }
          ],
          data: [
            {
              'id': '21509081010',
              'name': '范宸华',
              'title': '卷积神经网络和人脸识别',
              'teacher': '何川'
            },
            {
              'id': '...',
              'name': '...',
              'title': '...',
              'teacher': '...'
            }
          ]
        }
    }
  },
  computed: mapState({
    ppList: state => state.admin.ppList,
    n: state => state.admin.n,
    p: state => state.admin.p,
    count: state => state.admin.count,
    exPpList: state => state.admin.export.ppList,
    exN: state => state.admin.export.n,
    exP: state => state.admin.export.p,
    exCount: state => state.admin.export.count,
    jwt: state => state.global.jwt
  }),
  methods: {
    setPageSize(n) {
        this.$store.dispatch('admin/setPaperN', n);
        this.$store.dispatch('admin/getAllPaper', {jwt: this.jwt, n: this.n, p: this.p});
    },
    getPapersTable(p) {
        this.$store.dispatch('admin/setPaperP', p);
        this.$store.dispatch('admin/getAllPaper', {jwt: this.jwt, n: this.n, p: this.p});
    },
    setExportSize(n) {
        this.$store.dispatch('admin/setExportN', n);
        this.$store.dispatch('admin/getExportPaperList', {jwt: this.jwt, n: this.exN, p: this.exP});
    },
    getExportTable(p) {
        this.$store.dispatch('admin/setExportP', p);
        this.$store.dispatch('admin/getExportPaperList', {jwt: this.jwt, n: this.exN, p: this.exP});
    },
    async getFile() {
        window.location.href='/api/paper/export?jwt='+this.jwt
    }
    // showDrawer (index) {
    //     this.$store.commit('setCurrentPaper', this.$store.getters.getPaperList[index])
    //     this.isShow = true
    // }
  }
}
</script>