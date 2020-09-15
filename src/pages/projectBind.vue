<template>
  <section>
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>项目</a-breadcrumb-item>
      <a-breadcrumb-item>绑定</a-breadcrumb-item>
    </a-breadcrumb>

    <a-row>
      <a-col :span="22" :offset="1" class="mt2">
        <a-form @submit="loadPage(1)" layout="inline"></a-form>
      </a-col>
      <a-col :span="22" :offset="1" class="mt2">
        <a-table
          :columns="columns"
          :rowKey="record => record.ID"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <span slot="action" slot-scope="record">
            <a @click="deleteBind(record)">删除绑定</a>
          </span>
        </a-table>
      </a-col>
    </a-row>
  </section>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      data: [],
      pagination: {
        pageSize: 20,
        total: 100,
        current: 1
      },
      loading: false,
      columns: [
        { title: "IP地址", dataIndex: "ip" },
        { title: "项目名称", dataIndex: "xusage" },
        { title: "端口", dataIndex: "port" },
        {
          title: "创建时间",
          dataIndex: "create_time"
        },
        {
          title: "更新时间",
          dataIndex: "update_time"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },
  created() {
    this.loadPage(1);
  },
  methods: {
    loadPage(page) {
      this.loading = true;
      let urltParams = {
        t: "projectBindList",
        o: page * 20 - 20,
        ...this.form
      };
      this.$request
        .get("/project/bind/list", { params: urltParams })
        .then(res => {
          if (res) {
            this.loading = false;
            this.pagination.total = res.data.total;
            this.data = res.data.data;
            this.pagination.current = page;
          }
        });
    },
    handleTableChange(pagination) {
      this.loadPage(pagination.current);
    },
    deleteBind(record) {
      this.$confirm({
        title:
          "确实需要删除这个项目: " +
          record.xusage +
          "在这个节点:" +
          record.ip +
          " 绑定关系么?",
        content: "点击确认，将会删除绑定信息.",
        okText: "确认删除",
        cancelText: "取消",
        onOk: () => {
          this.$request.post("/bind/remove/", { ...record }).then(res => {
            if (res) {
              this.$notification.open({
                message: "操作成功."
              });
              this.loadPage(this.pagination.current);
            }
          });
        }
      });
    }
  }
};
</script>
