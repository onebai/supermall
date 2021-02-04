<template>
  <div>
    <tabbar>
      <tabbaritem path='/home' activeColor='blue'>
          <img slot="item-icon" src="../../../assets/image/tabbar/home.svg" alt="">
          <img slot="item-icon-sctive" src="../../../assets/image/tabbar/home_active.svg" alt=""><!-- 激活状态的图片，显示那个由我动态决定 -->
        <div slot="item-text">首页</div>
      </tabbaritem>
      <tabbaritem path='/categroy'>
         <img slot="item-icon" src="../../../assets/image/tabbar/home.svg" alt="">
          <img slot="item-icon-sctive" src="../../../assets/image/tabbar/home_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tabbaritem>
      <tabbaritem path='/cart'>
         <img slot="item-icon" src="../../../assets/image/tabbar/home.svg" alt="">
          <img slot="item-icon-sctive" src="../../../assets/image/tabbar/home_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tabbaritem>
      <tabbaritem path='/profile'>
         <img slot="item-icon" src="../../../assets/image/tabbar/home.svg" alt="">
          <img slot="item-icon-sctive" src="../../../assets/image/tabbar/home_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tabbaritem>
    </tabbar>
  </div>
</template>

<script>
import tabbar from '../../common/tabbar/TabBar'
import tabbaritem from '../../common/tabbar/TabBarItem'
export default {
  name:'MainTabBar',
  components:{
    tabbar,
    tabbaritem,
  }
}
</script>

<style>
  
</style>