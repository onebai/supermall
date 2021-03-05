<template>
  <div class="check-button" :class="{check:isCheck}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>
<script>
export default {
  name:'CheckButton',
  // 传值用于判断是否选中
  props:{
    isCheck:{
      type:Boolean,
      default:false
    }
  }
}
</script>
<style scoped>
  .check-button img{
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check img{
    background-color: red;
    border: 2px solid red;
  }
</style>