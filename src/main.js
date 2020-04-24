// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import Global from './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css';
import {Message} from "element-ui";
import './assets/iconfont/iconfont.css'


/*axios.defaults.baseURL='http://106.12.11.162:8888/api/private/v1/login'
axios.interceptors.request.use(config => {
  console.log(config)
  //在最后必须return config
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config;
})*/
Vue.prototype.$http=axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$message=Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
