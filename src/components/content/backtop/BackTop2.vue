<template>
  <div class="top">
    点击回到顶部
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>
<script>
export default {
  name:'BackTop2'
}
</script>
<style scoped>
  .top{
    width: 100px;
    height: 100px;
    background-color: red;
    position: relative;
    bottom: 10px;
    right: 5px;
    z-index: 100;
  }
  .top img{
    width: 43px;
    height: 43px;
  
  }
</style>