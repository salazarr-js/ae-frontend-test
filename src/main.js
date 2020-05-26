import Vue from "vue";
import App from "./App.vue";

/** MAIN STYLES */
import "./scss/main.scss";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
