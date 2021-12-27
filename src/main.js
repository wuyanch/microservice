import Vue from 'vue'
import App from './App.vue'//引入首页
import router from './router'

//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//引入淘宝的自适应js
import 'lib-flexible/flexible.js'

//axios
import axios from 'axios'

//引入字体
import './css/font.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
