<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name:'TabBar',
  components:{
  }
}
</script>

<style scoped>
   #tab-bar{
    display: flex;
    background-color: #eeeeee;
    box-shadow: 0px -3px 0 rgba(212, 211, 211, 0.2);
    position: absolute;
    left: 0;
    right: 0; /* 直接left和bottom，tabbar不会完全展开，只能靠左显示，其他的内容可以之家2个，对于这种需要全宽的内容直接left  right  bottom加三个 */
    bottom: 0;

    text-align: center;
    }
 
</style>