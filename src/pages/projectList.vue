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
            <a @click="deleteBind(record)">删除</a>
            <a-divider type="vertical" />
            <a @click="editProject(record)">编辑</a>
            <a-divider type="vertical" />
            <a-dropdown class="userDropDown" :trigger="['click']">
              <a class="ant-dropdown-link" href="#">
                更多操作
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="3" @click="bindToNode(record)">绑定到节点</a-menu-item>
                <a-menu-divider />
              </a-menu>
            </a-dropdown>
          </span>
        </a-table>
      </a-col>
    </a-row>

    <a-modal title="绑定项目到节点" v-model="binding" @ok="submitBindNode" cancelText="取消" okText="保存项目绑定">
      <a-checkbox-group :options="preBindHost" v-model="newBindedHost" />
    </a-modal>
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
      preBindHost: [],
      newBindedHost: [],
      oldBindedHost: [],
      loading: false,
      binding: false,
      currentXusage: "",
      columns: [
        { title: "用途", dataIndex: "xusage" },
        { title: "远程端口", dataIndex: "ngxport" },
        { title: "密码策略", dataIndex: "authProtocal" },
        { title: "子进程数", dataIndex: "process_count" },
        { title: "描述", dataIndex: "comment" },
        { title: "负责人邮箱", dataIndex: "bind_email" },
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
      let urltParams = {
        t: "projectList",
        o: page * 20 - 20,
        ...this.form
      };
      this.$request.get("/project/list", { params: urltParams }).then(res => {
        if (res) {
          this.pagination.total = res.data.total;
          this.data = res.data.data;
          this.pagination.current = page;
        }
      });
    },
    handleTableChange(pagination) {
      this.loadPage(pagination.current);
    },
    bindToNode(record) {
      this.currentXusage = record.xusage;
      this.$request
        .get("/project/binded", { params: { xusage: record.xusage } })
        .then(res => {
          if (res) {
            this.binding = true;
            let tmp = [];
            for (let n of res.data.all) {
              tmp.push(n.ip);
            }
            this.preBindHost = tmp;
            tmp = [];
            for (let u of res.data.binded) {
              tmp.push(u.ip);
            }
            this.newBindedHost = tmp;
            this.oldBindedHost = tmp;
          }
        });
    },
    submitBindNode() {
      let operates = [];
      for (let n of this.newBindedHost) {
        if (this.oldBindedHost.indexOf(n) == -1) {
          operates.push(["add", n]);
        }
      }
      for (let n of this.oldBindedHost) {
        if (this.newBindedHost.indexOf(n) == -1) {
          operates.push(["del", n]);
        }
      }
      if (operates.length == 0) {
        this.$notification.open({
          message: "项目绑定没有任何变更"
        });
        this.binding = false;
      } else {
        this.$request
          .post("/project/binded", {
            xusage: this.currentXusage,
            operate: operates
          })
          .then(res => {
            if (res) {
              this.$notification.open({
                message: "操作成功,需要重启修改的节点生效"
              });
              this.binding = false;
            }
          });
      }
    },
    deleteBind(record) {
      this.$confirm({
        title: "确实需要删除这个认证项目: " + record.xusage + " 么?",
        content: "点击确认，将会删除这个认证项目.",
        okText: "确认删除",
        cancelText: "取消",
        onOk: () => {
          this.$request
            .post("/project/remove/", { xusage: record.xusage })
            .then(res => {
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
    editProject(record) {
      this.$router.push({
        path: "/main/project/edit/" + record.xusage
      });
    }
  }
};
</script>
