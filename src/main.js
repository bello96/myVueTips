import Vue from "vue";
import App from "./App.vue";

import Tips from "./plugins/index.js";
Vue.use(Tips);

new Vue({
  render: h => h(App)
}).$mount("#app");
