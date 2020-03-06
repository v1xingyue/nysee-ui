<template>
  <div class="headerPullRight">
    <a-avatar style="backgroundColor:#87d068" icon="user" />
    <a-dropdown class="userDropDown" :trigger="['click']">
      <a class="ant-dropdown-link" href="#">
        {{loginName}}
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item key="1">
          <router-link to="/about">关于</router-link>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3" @click="logout">退出</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import auth from "@/utils/auth";
export default {
  computed: {
    loginName() {
      return auth.getUser();
    }
  },
  methods: {
    logout() {
      auth.removeAuth();
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>