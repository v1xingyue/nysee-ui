<template>
  <a-menu :theme="navTheme" mode="inline" :selectedKeys="selectedKeys">
    <template v-for="item in menus">
      <template v-if="!item.sub">
        <a-menu-item :key="item.key" @click="menumItemClick(item)">
          <a-icon :type="item.icon" />
          <span>{{item.title}}</span>
        </a-menu-item>
      </template>
      <a-sub-menu :key="item.key" v-else>
        <span slot="title">
          <a-icon :type="item.icon" />
          <span>{{item.title}}</span>
        </span>
        <a-menu-item v-for="s in item.sub" :key="s.key" @click="menumItemClick(s)">{{s.title}}</a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script>
export default {
  data() {
    const menus = [
      {
        icon: "user",
        title: "用户管理",
        key: "user",
        sub: [
          { key: "u1", title: "用户查询", link: "/main/user/list" },
          { key: "u0", title: "绑定用户", link: "/main/user/bind" }
        ]
      },
      {
        icon: "project",
        title: "项目管理",
        key: "project",
        sub: [
          { key: "p1", title: "查看项目", link: "/main/project/list" },
          { key: "p0", title: "创建项目", link: "/main/project/create" },
          { key: "p2", title: "项目绑定", link: "/main/project/bind" }
        ]
      },
      {
        icon: "cloud-server",
        title: "节点管理",
        key: "cloud",
        sub: [
          { key: "c1", title: "查看节点", link: "/main/node/list" },
          { key: "c0", title: "创建节点", link: "/main/node/create" },
          { key: "c3", title: "命令状况", link: "/main/node/command/history" }
        ]
      },
      {
        icon: "setting",
        title: "系统设置",
        key: "s",
        link: "/main/sys/settings"
      }
      // {
      //   icon: "border-outer",
      //   title: "日志管理",
      //   key: "f",
      //   link: "/main/log/history"
      // }
    ];
    let selectedMap = {};
    for (let item of menus) {
      if (item.sub) {
        for (let s of item.sub) {
          selectedMap[s.link] = [item.key, s.key];
        }
      } else {
        selectedMap[item.link] = [item.key];
      }
    }
    return {
      menus,
      selectedMap,
      currentLink: ""
    };
  },
  watch: {
    $route(to, from) {
      console.log(from.path);
      this.currentLink = to.path;
    }
  },
  mounted() {
    this.currentLink = this.$router.currentRoute.path;
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    selectedKeys() {
      return this.selectedMap[this.currentLink];
    }
  },
  methods: {
    menumItemClick(e) {
      if (e.link != this.$route.path) {
        this.currentLink = e.link;
        this.$router.push({
          path: e.link
        });
      }
    }
  }
};
</script>

<style>
li.ant-menu-submenu.ant-menu-submenu-vertical.ant-menu-submenu-selected {
  background-color: #4fa6f8;
}
</style>