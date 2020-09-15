<template>
  <section>
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>项目</a-breadcrumb-item>
      <a-breadcrumb-item>查询</a-breadcrumb-item>
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
            <a-tag :color="status == 0 ? 'green' : 'volcano'">{{status== 0 ? "正常":"锁定"}}</a-tag>
          </span>
          <span slot="action" slot-scope="record">
            <a @click="deleteNode(record)">删除</a>
            <a-divider type="vertical" />
            <a @click="editNode(record)">编辑</a>
            <a-divider type="vertical" />
            <a-dropdown class="userDropDown" :trigger="['click']">
              <a class="ant-dropdown-link" href="#">
                更多操作
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="3" @click="restartNode(record)">重启节点</a-menu-item>
                <a-menu-divider />
              </a-menu>
            </a-dropdown>
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
        { title: "最大进程数", dataIndex: "max_process" },
        { title: "使用进程数", dataIndex: "used_process" },
        { title: "注释", dataIndex: "comment" },
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
        t: "nodeList",
        o: page * 20 - 20,
        ...this.form
      };
      this.$request.get("/node/list", { params: urltParams }).then(res => {
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
    deleteNode(record) {
      this.$confirm({
        title: "确实需要删除这个认证节点: " + record.ip + " 么?",
        content: "点击确认，将会删除这个认证节点.",
        okText: "确认删除",
        cancelText: "取消",
        onOk: () => {
          this.$request.post("/node/remove/", { ip: record.ip }).then(res => {
            if (res) {
              this.$notification.open({
                message: "操作成功."
              });
              this.loadPage(this.pagination.current);
            }
          });
        }
      });
    },
    restartNode(record) {
      this.$confirm({
        title: "确认重启节点: " + record.ip + " 么?",
        content: "点击确认，将会重启节点，该节点会短时不可用.",
        okText: "确认重启",
        cancelText: "取消",
        onOk: () => {
          this.$request.post("/node/operate/", { ip: record.ip }).then(res => {
            if (res) {
              this.$notification.open({
                message: "操作成功,稍后进入命令历史查看"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/main/node/command/history"
                });
              }, 1500);
            }
          });
        }
      });
    },
    editNode(record) {
      this.$router.push({
        path: "/main/node/edit/" + record.ip
      });
    }
  }
};
</script>
