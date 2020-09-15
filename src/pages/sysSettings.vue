<template>
  <section>
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>系统</a-breadcrumb-item>
      <a-breadcrumb-item>设置</a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="spinning" size="large" :tip="message">
      <a-tabs :defaultActiveKey="defaultKey" class="ml3" @change="loadConfig">
        <a-tab-pane tab="邮箱设置" key="smtp">
          <a-form
            class="ml3"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 12 }"
            @submit="saveCurrentTab"
          >
            <a-form-item label="SMTP服务器">
              <a-input v-model="smtp.host" />
            </a-form-item>
            <a-form-item label="SMTP端口">
              <a-input v-model="smtp.port" />
            </a-form-item>
            <a-form-item label="邮件账号">
              <a-input v-model="smtp.email" />
            </a-form-item>
            <a-form-item label="密码">
              <a-input v-model="smtp.password" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="API 设置" key="api" forceRender>
          <a-form
            class="ml3"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 12 }"
            @submit="saveCurrentTab"
          >
            <a-form-item label="API 秘钥">
              <a-input v-model="api.secret" />
            </a-form-item>
            <a-form-item label="授权IP">
              <a-textarea v-model="api.allow" :rows="5" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="ldap设置" key="ldap" forceRender>
          <a-form
            class="ml3"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 12 }"
            @submit="saveCurrentTab"
          >
            <a-form-item label="服务器IP">
              <a-input v-model="ldap.server" />
            </a-form-item>
            <a-form-item label="端口">
              <a-input v-model="ldap.port" />
            </a-form-item>
            <a-form-item label="ADMIN_DN">
              <a-input v-model="ldap.admin_dn" />
            </a-form-item>
            <a-form-item label="密码">
              <a-input v-model="ldap.password" />
            </a-form-item>
            <a-form-item label="SEARCH_BASE">
              <a-input v-model="ldap.search_base" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="其他设置" key="other" forceRender>
          <a-form
            class="ml3"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 12 }"
            @submit="applyMoreSeed"
          >
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" html-type="submit">申请更多的种子</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-spin>
  </section>
</template>

<script>
export default {
  data() {
    return {
      defaultKey: "smtp",
      spinning: false,
      message: "正在特别辛苦的和服务器交互....",
      smtp: {
        host: "",
        port: 25,
        username: "",
        password: ""
      },
      api: {
        secret: "",
        allow: ""
      },
      ldap: {
        server: "",
        port: 389,
        admin_dn: "",
        password: "",
        search_base: ""
      },
      selectedKey: "smtp"
    };
  },
  created() {
    this.loadConfig();
  },
  methods: {
    saveCurrentTab() {
      this.spinning = true;
      this.$request
        .post("/sys/config/" + this.selectedKey, this[this.selectedKey])
        .then(res => {
          if (res) {
            this.spinning = false;
            this.$notification.open({
              message: "配置更新成功,重启节点生效...."
            });
          }
        });
    },
    applyMoreSeed() {
      this.spinning = true;
      this.$request.post("/sys/more/seed").then(res => {
        this.spinning = false;
        if (res) {
          let message =
            res.data.message == ""
              ? "恭喜您，又申请了 66 个 种子"
              : res.data.message;

          this.$notification.open({
            message
          });
        }
      });
    },
    loadConfig(key = false) {
      this.selectedKey = key ? key : "smtp";
      this.spinning = true;
      this.$request.get("/sys/config/" + this.selectedKey).then(res => {
        if (res) {
          this.spinning = false;
          this[this.selectedKey] = res.data.v;
        }
      });
    }
  }
};
</script>
