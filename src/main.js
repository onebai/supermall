/* mainjs是程序入口，是起步文件，所以这里面的文件，在一开始就能加载
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import toast from 'components/common/toast/index'
import FastClick from 'fastclick'
// import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false;
// 自己注册一个$bus
Vue.prototype.$bus=new Vue();

// 安装toast插件
Vue.use(toast);

// 解决移动端点击后的300ms延时
FastClick.attach(document.body);

// 使用图片懒加载插件
/* Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png'), // 在图片加载过程中先显示这个照片用来占位置
}) */

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
