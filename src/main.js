import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'


Vue.config.productionTip = false
//通过new一个Vue实例来作为事件总线，并将这个实例加到Vue的原生上面
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//使用懒加载插件(vue-lazyload)
//使用步骤:安装(npm install vue-lazyload --save)->导入->安装(Vue.use)->修改指令(img :src->v-lazy)
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})

//解决移动端300ms延迟(fastClick)
//使用步骤安装->导入->调用attach函数
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
