<template>
  <section>
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>用户</a-breadcrumb-item>
      <a-breadcrumb-item>查询</a-breadcrumb-item>
    </a-breadcrumb>

    <a-row>
      <a-col :span="22" :offset="1" class="mt2">
        <a-form @submit="loadPage(1)" layout="inline">
          <a-form-item label>
            <a-input v-model="form.search" placeholder="用户名,邮箱 或手机" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit">搜索</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="22" :offset="1" class="mt2">
        <a-table
          :columns="columns"
          :rowKey="record => record.FID"
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
            <a @click="deleteBind(record)">解除绑定</a>
            <a-divider type="vertical" />
            <a @click="reSendEmail(record)">重发邮件</a>
            <a-divider type="vertical" />
            <a @click="lockUser(record)">{{ record.FLocked == 0 ? "锁定":"解锁"}}</a>
            <a-divider type="vertical" />
            <a @click="editBind(record)">编辑</a>
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
        { title: "用户名", dataIndex: "FUserName" },
        { title: "邮件地址", dataIndex: "Femail" },
        { title: "卡号", dataIndex: "FSN" },
        { title: "手机", dataIndex: "FMobile" },
        // 如果不指定dataIndex , slot 内 获取到的是整个元素对象
        {
          title: "状态",
          dataIndex: "FLocked",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "绑定时间",
          dataIndex: "create_time"
        },
        {
          title: "最后认证时间",
          dataIndex: "FLastAuthTime"
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
        t: "userBind",
        o: page * 20 - 20,
        ...this.form
      };
      this.loading = true;
      this.$request.get("/user/list", { params: urltParams }).then(res => {
        if (res) {
          this.loading = false;
          this.pagination.total = res.data.total;
          this.data = res.data.data;
          this.pagination.current = page;
        }
      });
    },
    //handleTableChange(pagination, filters, sorter) {
    handleTableChange(pagination) {
      this.loadPage(pagination.current);
    },
    deleteBind(record) {
      this.$confirm({
        title: "确实需要解除绑定用户 " + record.FUserName + " 么?",
        content: "点击确认，将会删除绑定的用户及该用户信息.",
        okText: "确认解除绑定",
        cancelText: "取消",
        onOk: () => {
          this.loading = true;
          this.$request.post("/user/unbind/", record).then(res => {
            this.loading = false;
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
    lockUser(record) {
      let operate = record.FLocked == 0 ? "锁定" : "解锁";
      this.$confirm({
        title: "确实需要" + operate + "用户 " + record.FUserName + " 么?",
        content: "点击确认，将会" + operate + "该用户",
        okText: "确认" + operate,
        cancelText: "取消",
        onOk: () => {
          this.loading = true;
          this.$request.post("/user/lock/", record).then(res => {
            this.loading = false;
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
    reSendEmail(record) {
      this.loading = true;
      let email = record.Femail;
      this.loading = true;
      this.$request.post("/user/resend", { email }).then(res => {
        this.loading = false;
        if (res) {
          this.$notification.open({
            message: "发送成功."
          });
        }
      });
    },
    editBind(record) {
      this.$router.push({
        path: "/main/user/bind/edit/" + record.FUserName
      });
    }
  }
};
</script>
