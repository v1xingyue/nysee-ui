<template>
  <a-menu :theme="navTheme" :defaultSelectedKeys="['1']" mode="inline">
    <a-menu-item key="1">
      <a-icon type="pie-chart" />
      <span>Option 1</span>
    </a-menu-item>
    <a-menu-item key="2">
      <a-icon type="desktop" />
      <span>Option 2</span>
    </a-menu-item>
    <a-sub-menu key="sub1">
      <span slot="title">
        <a-icon type="user" />
        <span>User</span>
      </span>
      <a-menu-item key="3">Tom</a-menu-item>
      <a-menu-item key="4">Bill</a-menu-item>
      <a-menu-item key="5">Alex</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <span slot="title">
        <a-icon type="team" />
        <span>Team</span>
      </span>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="9">
      <a-icon type="file" />
      <span>File</span>
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { icon: "pie-chart", title: "Option 1" },
        { icon: "desktop", title: "Option 2" }
      ]
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    }
  }
};
</script>

<style>
</style>