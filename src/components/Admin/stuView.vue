<style scoped>

</style>

<template>
  <div class="stuView">
    <Card>
      <h2>学生表</h2>
      <p>在此查看数据库中的学生信息并对其修改</p>
      <Divider />
      <Table border stripe :columns="papers.cols" :data="this.$store.getters.getPaperList"></Table>
      <div style="text-align: center; padding: 24px;">
        <Page :total="this.$store.getters.getPage.total" show-elevator show-sizer @on-page-size-change="setPageSize" @on-change="getPapersTable"></Page>
      </div>
      <Drawer title="学生详情" :closable="true" width="640" v-model="isShow">
          <enroll-detail></enroll-detail>
      </Drawer>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
        isShow: false,
        papers: {
            counts: 1526,
            n: 10,
            cols: [
                {
                    title: "学号",
                    key: 'id',
                    width: 150
                },
                {
                    title: '姓名',
                    key: 'name',
                    minWidth: 150
                },
                {
                    title: '院系',
                    key: 'department',
                    width: 150
                },
                {
                    title: '专业',
                    key: 'major',
                    width: 150,
                },
                {
                    title: '联系方式',
                    key: 'contact',
                    width: 150,
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
  methods: {
    setPageSize(n) {
        this.$store.commit('setPaperN', n);
        this.$store.dispatch('getAllPapersOfStudent');
    },
    getPapersTable(p) {
        this.$store.commit('setPaperP', p);
        this.$store.dispatch('getAllPapersOfStudent');
    },
    showDrawer (index) {
        this.$store.commit('setCurrentPaper', this.$store.getters.getPaperList[index])
        this.isShow = true
    }
  }
}
</script>