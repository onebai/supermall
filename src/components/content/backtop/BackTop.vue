<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:'BackTop'
}
</script>

<style scoped>
  .backtop{
    position: fixed;
    bottom: 52px;
    right: 5px;
    z-index: 1000;
  }
  .backtop img{
    width: 43px;
    height: 43px;
  } 
</style>