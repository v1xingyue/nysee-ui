<template>
  <section>
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>项目</a-breadcrumb-item>
      <a-breadcrumb-item>新建</a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="spinning" size="large" :tip="message">
      <a-form
        class="ml3"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="用途" help="单个英文单词，用作服务识别">
          <a-input v-model="form.xusage" />
        </a-form-item>
        <a-form-item label="外部调用端口" help="外部调用端口，不能重复">
          <a-input v-model="form.ngxport" />
        </a-form-item>
        <a-form-item label="密码认证策略" help>
          <AuthProtocal v-model="form.authProtocal" />
        </a-form-item>
        <a-form-item label="子进程数" help="根据请求量适当设置子进程数">
          <a-input-number :min="1" :max="10" v-model="form.process" style="width:100%" />
        </a-form-item>
        <a-form-item label="调用客户端" help="调用IP,一行一个">
          <a-textarea v-model="form.remoteClient" :rows="5" />
        </a-form-item>
        <a-form-item label="描述" help="调用的简单描述">
          <a-input v-model="form.description" />
        </a-form-item>
        <a-form-item label="秘钥" help="调用 Radius 认证的秘钥">
          <a-input v-model="form.secret" />
        </a-form-item>
        <a-form-item label="负责人邮箱" help="负责人邮件地址">
          <a-input v-model="form.email" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">保存</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </section>
</template>

<script>
import AuthProtocal from "../components/common/AuthProtocal";
export default {
  components: {
    AuthProtocal
  },
  data() {
    return {
      spinning: false,
      message: "项目正在创建....",
      form: {
        xusage: "",
        ngxport: "",
        process: 2,
        remote_client: "",
        description: "",
        secret: this.randomPassword(16),
        email: "",
        authProtocal: "OTP"
      }
    };
  },
  created() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.spinning = true;

      let projectParams = {
        ...this.form
      };

      this.$request.post("/project/create", projectParams).then(res => {
        if (res) {
          this.$notification.open({
            message: "项目创建成功，认证秘钥稍后发送给 " + this.form.email
          });
          setTimeout(() => {
            this.$router.push({
              path: "/main/project/list"
            });
            this.spinning = false;
          }, 3000);
        }
      });
    },
    randomPassword(len) {
      let charlist =
        "abcdefghijkmnpqrstuvwxyz12345678_ABCDEFGHIJKMNPQRSTUVWXYZ";
      let res = "";
      for (let l = 0; l < len; l++) {
        let index = Math.floor(Math.random() * charlist.length);
        res += charlist[index];
      }
      return res;
    }
  }
};
</script>