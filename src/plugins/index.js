import Tips from "./Tips.vue";
import notify from "./notify.js";

export default (Vue) => {
    Vue.component(Tips.name, Tips);
    Vue.prototype.$notify = notify;
};