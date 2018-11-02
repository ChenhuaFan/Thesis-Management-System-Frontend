<style scoped>

</style>

<template>
  <div class="stuView">
    <Card>
      <h2>论文表</h2>
      <p>在此查看数据库中的论文信息并对其修改</p>
      <Divider />
      <Table border stripe :columns="papers.cols" :data="this.$store.getters.getPaperList"></Table>
      <div style="text-align: center; padding: 24px;">
        <Page :total="this.$store.getters.getPage.total" show-elevator show-sizer @on-page-size-change="setPageSize" @on-change="getPapersTable"></Page>
      </div>
      <Drawer title="论文详情" :closable="true" width="640" v-model="isShow">
          <enroll-detail></enroll-detail>
      </Drawer>
    </Card>
    <br>
    <Card>
      <h2>导出表</h2>
      <p>将数据库中的数据以特定格式导出</p>
      <Divider />
      <Table border stripe :columns="example.cols" :data="example.data"></Table>
      <br>
      <Button type="success" long large>导出</Button>
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