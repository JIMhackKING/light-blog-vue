import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import mavonEditor from 'mavon-editor';
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'mavon-editor/dist/css/index.css';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(mavonEditor);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
