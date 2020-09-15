<template>
  <section>
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>节点</a-breadcrumb-item>
      <a-breadcrumb-item>创建</a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="spinning" size="large" :tip="message">
      <a-form
        class="ml3"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="节点IP">
          <a-input disabled v-model="form.ip" />
        </a-form-item>
        <a-form-item label="最大进程数" help="一个主机上运行的最大认证进程数">
          <a-input-number
            v-model="form.max_process"
            :min="5"
            :max="200"
            :step="5"
            style="width:100%"
          />
        </a-form-item>
        <a-form-item label="描述" help="节点的简单描述">
          <a-input v-model="form.description" />
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
      message: "项目正在更新....",
      form: {
        max_process: 5,
        ip: "",
        description: ""
      }
    };
  },
  created() {
    this.form.ip = this.$router.currentRoute.params.ip;
    this.$request
      .get("/node/get/", {
        params: {
          ip: this.form.ip
        }
      })
      .then(res => {
        if (res) {
          const fetchNode = res.data.data[0];
          this.form.description = fetchNode.comment;
          this.form.max_process = fetchNode.max_process;
        }
      });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.spinning = true;

      let projectParams = {
        ...this.form
      };

      this.$request.post("/node/update", projectParams).then(res => {
        if (res) {
          this.$notification.open({
            message: "节点更新成功"
          });
          setTimeout(() => {
            this.$router.push({
              path: "/main/node/list"
            });
            this.spinning = false;
          }, 1000);
        }
      });
    }
  }
};
</script>