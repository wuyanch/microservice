import Vue from 'vue'
import App from './App.vue'//引入首页
import router from './router'
import Storage from 'vue-ls'

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

// vue-ls 配置
const storageOptions = {
  namespace:'micro_',
  name:'ls',
  storage:'local'
}
Vue.use(Storage, storageOptions)

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title;
  }
  next()
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
