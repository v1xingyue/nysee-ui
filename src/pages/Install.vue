<template>
  <div class="install">
    <div class="header">
      <p>欢迎使用 Libra 综合认证系统</p>
    </div>

    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <a-spin :spinning="spinning" size="large" :tip="message"></a-spin>
      <section v-show="!spinning" v-html="steps[current].content"></section>
      <div v-show="displayQR" id="qrCodeContainer"></div>
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">下一步</a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$router.push({path:'/login'})"
      >完成</a-button>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
let box = {};
export default {
  data() {
    return {
      message: "正在初始化，请稍后....",
      spinning: false,
      current: 0,
      displayQR: false,
      steps: [
        {
          title: "First",
          content: `
          确保您的服务器环境已经完成配置, 数据库 , nginx, redis, ldap。
          `
        },
        {
          title: "Second",
          content: "种子初始化完成"
        },
        {
          title: "Third",
          content: "扫描管理员秘钥二维码"
        },
        {
          title: "Last",
          content: `
          <p>完成安装。</p>
          <p>下一步的工作: </p>
          <ul style="list-style: none;">
            <li>1. 建议删除 app/admin/handlers/install.py </li>
            <li>2. 配置smtp</li>
            <li>3. 添加节点，项目</li>
            <li>4. 绑定用户，愉快的认证</li>
          </ul>
          `
        }
      ]
    };
  },
  methods: {
    next() {
      this.spinning = true;
      if (this.current == 0) {
        this.$request.get("/install?step=0").then(res => {
          console.log(res);
          this.$message.success("种子初始化完成!");
          this.current++;
          this.spinning = false;
        });
      } else if (this.current == 1) {
        this.$request.get("/install?step=1").then(res => {
          if (res != false) {
            this.showQRcode(res.data);
            this.$message.success("管理员种子绑定成功!");
            this.current++;
            this.spinning = false;
            this.displayQR = true;
          }
        });
      } else if (this.current == 2) {
        this.$request.get("/install?step=2").then(res => {
          console.log(res);
          this.current++;
          this.spinning = false;
          this.displayQR = false;
        });
      } else {
        this.current++;
      }
    },
    prev() {
      this.current--;
    },
    showQRcode(data) {
      if (box.qrcode) {
        box.qrcode.clear();
        box.qrcode.makeCode(data);
      } else {
        box.qrcode = new QRCode(document.getElementById("qrCodeContainer"), {
          text: data,
          width: 200,
          height: 200,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      }
    }
  }
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
  font-size: 1.5rem;
}

.steps-action {
  margin-top: 24px;
  text-align: center;
}
div.install {
  padding: 2rem;
}
div.install .header {
  text-align: center;
  font-size: 2rem;
}

.steps-action button {
  margin-left: 1rem;
}

#qrCodeContainer {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  margin-bottom: 2rem;
  margin-top: 2rem;
}
</style>
