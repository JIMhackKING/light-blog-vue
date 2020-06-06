import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import mavonEditor from 'mavon-editor';
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'mavon-editor/dist/css/index.css';
import axios from 'axios';

// 根据环境设置baseurl
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
if (typeof process.env.VUE_APP_AUTH != 'undefined')
  axios.defaults.headers['Authorization'] = 'Token b6391658bcabae91faf2b9ceab30d9163c768e2c';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(mavonEditor);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

new Vue({
  render: h => h(App)
}).$mount("#app");
