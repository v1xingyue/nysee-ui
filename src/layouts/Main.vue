<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="nysee-ui-main">
      <a-layout-sider
        v-if="navLayout == 'left'"
        :theme="navTheme"
        collapsible
        v-model="collapsed"
        :trigger="null"
      >
        <div class="logo">Nysee Dashboard Pro</div>
        <!--menu-->
        <VMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            :type=" collapsed ? 'menu-unfold':'menu-fold'"
            @click="collapsed = !collapsed"
            class="trigger"
          ></a-icon>
          <VHeader />
          <a-icon
            :type=" fullscreen ? 'fullscreen-exit':'fullscreen'"
            class="fullScreenIcon"
            @click="makeFullScreen"
          />
        </a-layout-header>

        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
          </a-breadcrumb>
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">Bill is a dog.</div>
        </a-layout-content>
        <Footer />
        <VSetting />
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import Footer from "../components/common/Footer";
import VMenu from "../components/common/VMenu";
import VHeader from "../components/common/VHeader";
import VSetting from "../components/common/VSetting";

export default {
  components: {
    Footer,
    VMenu,
    VHeader,
    VSetting
  },
  data() {
    return {
      collapsed: true,
      fullscreen: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  methods: {
    makeFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>