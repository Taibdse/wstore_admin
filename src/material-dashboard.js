// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from "./components/SidebarPlugin";

// asset imports
import VueMaterial from "vue-material";
import 'vue-loading-overlay/dist/vue-loading.css';
import 'vue-datetime/dist/vue-datetime.css'
import "vue-material/dist/vue-material.min.css";

import "./assets/scss/material-dashboard.scss";
import "@/assets/scss/material-kit.scss";
// library auto imports
import "es6-promise/auto";

/**
 * This is the main Light Bootstrap Dashboard Vue plugin where dashboard related plugins are registerd.
 */
export default {
  install(Vue) {
    Vue.use(SideBar);
    Vue.use(VueMaterial);
  }
};
