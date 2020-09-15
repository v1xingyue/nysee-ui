<template>
  <section>
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>节点</a-breadcrumb-item>
      <a-breadcrumb-item>操作历史</a-breadcrumb-item>
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
          <!-- 确定某个列的渲染样式-->
          <span slot="status" slot-scope="status">
            <a-tag :color="status == 0 ? 'green' : '#108ee9'">{{status== 0 ? "执行中":"执行完成"}}</a-tag>
          </span>
          <span slot="action" slot-scope="record">
            <a @click="deleteRecord(record)">删除日志</a>
            <a-divider type="vertical" />
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
        { title: "节点IP", dataIndex: "ip" },
        { title: "执行命令", dataIndex: "command" },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: {
            customRender: "status"
          }
        },
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
      ],
      reloadTimes: 0
    };
  },
  created() {
    this.loadPage(this.pagination.current);
    let maxReloadTimes = 10;
    let refreshTimer = setInterval(() => {
      this.loadPage(this.pagination.current);
      if (maxReloadTimes-- <= 0) {
        clearInterval(refreshTimer);
      }
    }, 10 * 1000);
  },
  methods: {
    loadPage(page) {
      this.loading = true;
      let urltParams = {
        t: "commandHistory",
        o: page * 20 - 20,
        ...this.form
      };
      this.$request
        .get("/command/history", { params: urltParams })
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
    deleteRecord(record) {
      if (record.status == 0) {
        this.$notification.error({
          message: "不能删除，该命令未执行"
        });
      } else {
        this.$request
          .post("/command/remove", {
            ID: record.ID
          })
          .then(res => {
            if (res) {
              this.$notification.info({
                message: "删除成功"
              });
              this.loadPage(this.pagination.current);
            }
          });
      }
    }
  }
};
</script>
