<template>
  <section>
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>用户</a-breadcrumb-item>
      <a-breadcrumb-item>编辑</a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="spinning" size="large" :tip="message">
      <a-form
        class="ml3"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="用户名">
          <a-input disabled v-model="username" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input disabled v-model="email" />
        </a-form-item>
        <a-form-item label="手机">
          <a-input v-model="mobile" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">更新</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </section>
</template>

<script>
export default {
  data() {
    return {
      spinning: false,
      message: "正在更新....",
      username: "xingyue",
      email: "",
      mobile: ""
    };
  },
  created() {
    this.username = this.$router.currentRoute.params.uid;
    this.$request
      .get("/user/bind", { params: { uid: this.username } })
      .then(res => {
        if (res) {
          let users = res.data.res;
          if (users.length != 0) {
            this.email = users[0].Femail;
            this.mobile = users[0].FMobile;
          }
        }
      });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.spinning = true;

      let editParams = {
        username: this.username,
        mobile: this.mobile,
        action: "update"
      };

      this.$request.post("/user/bind", editParams).then(res => {
        this.spinning = false;
        if (res) {
          this.$notification.open({
            message: "更新成功...."
          });
        }
      });
    }
  }
};
</script>
