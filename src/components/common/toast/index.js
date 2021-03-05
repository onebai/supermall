import Toast from './Toast'

const obj={}

// 插件一旦安装就会执行install
obj.install = function (Vue) {  
  // 1 创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  // 2 通过new的方式，根据组件构造器，创建组件对象
  const toast = new toastContrustor();

  // 3 将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));
  
  // 4 将元素追加到DOm中，toast.$el对应的就是div
  document.body.appendChild(toast.$el);

  // 5 将Toast添加到Vue的原型中
  Vue.prototype.$toast = toast;
  
}
export default  obj;