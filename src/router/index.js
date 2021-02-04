import Vue from 'vue';
import  VueRouter from 'vue-router';

Vue.use(VueRouter); // 使用路由

// 懒加载导入组件
const Home= ()=> import ('../views/home/Home.vue');
const Category= ()=> import ('../views/category/Category.vue');
const Cart= ()=> import ('../views/cart/Cart.vue');
const Profile= ()=> import ('../views/profile/Profile.vue');

// 配置路由映射关系
const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  }
];

// 2 创建路由实例
const router =new VueRouter({
  routes,
  mode:'history'
});

export default router;


