import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import store from "./store";

import { getJwtTokenLocal } from "./utils/auth";

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

// import Chartist from "chartist";
import { isEmpty } from "./utils/validations";

// configure router
const router = new VueRouter({
  base: "/",
  mode: "history",
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
});

//protect route when navigate
router.beforeEach((to, from, next) => {
  const jwtToken = getJwtTokenLocal();
  if (from.path == "/login" && isEmpty(jwtToken)) {
    return;
  }
  next();
});

// Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  render: (h) => h(App),
  router,
});
