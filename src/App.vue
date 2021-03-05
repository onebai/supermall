<template>
  <div id="app">
    <!-- 给路由显示界面包装一层，不要让页面被销毁， -->
    <keep-alive exclude='Detail'>
      <router-view></router-view>
    </keep-alive>
    <mainTabbar></mainTabbar>
  </div>
</template>

<script>
  import mainTabbar from './components/content/mainTabbar/MainTabBar'
  export default {
    name: 'App',
    components: {
      mainTabbar
    }
  }
</script>
<style>
  @import 'assets/css/base.css';
</style>
