import Vue from 'vue'
import App from './App.vue'
//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入淘宝的自适应js
import 'lib-flexible/flexible.js'

//axios
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
