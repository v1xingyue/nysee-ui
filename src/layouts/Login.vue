<template>
  <div class="fullPageDiv">
    <a-row>
      <a-col class="loginForm" :span="6" :offset="9">
        <a-card title="Libra Configuration Pro" :bordered="true" :hoverable="true">
          <a-form class="login-form">
            <a-form-item>
              <a-input placeholder="Username" v-model="userName" focus>
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input type="password" placeholder="Password" v-model="userPassword">
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                block
                type="primary"
                html-type="submit"
                class="login-form-button"
                shape="round"
                @click="realLogin"
              >Log in</a-button>
            </a-form-item>
          </a-form>
          <p>Tips: Seeing Is Believing ...</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import auth from "@/utils/auth";
export default {
  data() {
    return {
      userName: "",
      userPassword: ""
    };
  },
  methods: {
    realLogin() {
      const loginParams = {
        username: this.userName,
        password: this.userPassword
      };
      this.$request
        .post("/login", loginParams)
        .then(res => {
          if (res.data.auth) {
            let token = res.data.token;
            let role = res.data.role || "admin";
            auth.setAuth(role, token, loginParams.username);
            this.$router.push({
              path: "/main"
            });
          } else {
            console.log(res);
            let message = res.data.error || "未知错误...";
            this.$notification.error({ message: message });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
