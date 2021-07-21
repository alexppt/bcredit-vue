// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from "element-ui/src/mixins/locale";'../node_modules/element-ui/lib/locale/lang/en.js'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8080'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI, {locale})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
