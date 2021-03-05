// 1 导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

// 2 使用
Vue.use(Vuex);
const state = {
  cartList:[]
}

// 3 创建store对象这里面的内容全部抽取到单独文件中了
const store=new Vuex.Store({
  state,
  // 单纯的修改state中状态相关的代码都写在这个里面
  mutations,
  // 异步操作和比较复杂的逻辑判断放在actions里面
  actions,
});

// 4 挂载-导出
export default store;