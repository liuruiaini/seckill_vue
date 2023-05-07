import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import qs from 'qs';



Vue.use(ElementUI);
Vue.prototype.$axios=axios;
Vue.prototype.$VueAxios=VueAxios;
// Vue.prototype.$VueAxios=vue-axios;
Vue.prototype.$qs=qs;

Vue.config.productionTip = false
// 设置axios跨域访问之后，携带cookie
axios.defaults.withCredentials=true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
