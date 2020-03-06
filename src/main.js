import Vue from 'vue'
import App from './App.vue'
//import router from './router'
import router from './router/nysee'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

import "./assets/less/nysee.less";
import request from "./utils/request"

Vue.prototype.$request = request;

Vue.use(Antd);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
