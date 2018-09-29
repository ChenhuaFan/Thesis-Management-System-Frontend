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
        <Table border stripe :columns="papers.cols" :data="this.$store.getters.getPaperList"></Table>
        <div style="text-align: center; padding: 24px;">
          <Page :total="this.$store.getters.getPage.total" show-elevator show-sizer @on-page-size-change="setPageSize" @on-change="getPapersTable"></Page>
        </div>
        <Drawer title="论文详情" :closable="true" width="640" v-model="isShow">
            <enroll-detail></enroll-detail>
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
      vm.$store.dispatch('getAllPapersOfStudent')
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

