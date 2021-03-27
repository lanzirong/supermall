import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//通过new一个Vue实例来作为事件总线，并将这个实例加到Vue的原生上面
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
