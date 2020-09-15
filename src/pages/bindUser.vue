<template>
  <section>
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>用户</a-breadcrumb-item>
      <a-breadcrumb-item>绑定</a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="spinning" size="large" :tip="message">
      <a-form
        class="ml3"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="用户名">
          <a-input v-model="username" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model="email" />
        </a-form-item>
        <a-form-item label="手机">
          <a-input v-model="mobile" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button :disabled="binded" v-if="!binded" type="primary" html-type="submit">绑定</a-button>
          <a-button v-if="binded" type="primary" @click="rebind">绑定下一个</a-button>
        </a-form-item>
      </a-form>
    </a-spin>

    <p v-show="displayQrCode" style="text-align:center">请使用支持OTP的软件扫描如下的二维码:</p>
    <div v-show="displayQrCode" id="qrCodeContainer"></div>
  </section>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      spinning: false,
      message: "正在绑定....",
      username: "",
      email: "",
      mobile: "13800000000",
      qrCodeObject: {},
      displayQrCode: false,
      binded: false
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.spinning = true;

      let bindParams = {
        username: this.username,
        email: this.email,
        mobile: this.mobile
      };

      this.$request.post("/user/bind", bindParams).then(res => {
        this.spinning = false;
        if (res) {
          this.showQRcode(res.data.data);
          this.displayQrCode = true;
          this.$notification.open({
            message: "用户与卡片绑定成功,稍后查收邮件。"
          });
          this.binded = true;
        }
      });
    },
    showQRcode(data) {
      if (this.qrcode) {
        this.qrcode.clear();
      }

      this.qrcode = new QRCode(document.getElementById("qrCodeContainer"), {
        text: data,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    },
    rebind(e) {
      e.preventDefault();
      this.binded = false;
      this.username = "";
      this.mobile = "";
      this.email = "";
      this.displayQrCode = false;
      return false;
    }
  }
};
</script>

<style scoped>
#qrCodeContainer {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  margin-bottom: 2rem;
}
</style>