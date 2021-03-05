<template>
  <div class='cart'>
    <!-- 1 导航 -->
    <NavBar class='cartNav'>
      <div slot="center">购物车({{cartLen}})</div>
    </NavBar>

    <!-- 2 商品列表 -->
    <CartList></CartList>

    <!-- 3 底部汇总 -->
    <CartBottom class='total'></CartBottom>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import CartList from './childComps/CartList';
  import CartBottom from './childComps/CartBottom'

  export default {
    name:'Cart',
    components:{
      NavBar,
      CartList,
      CartBottom
    },
    computed:{
      cartLen(){
        return this.$store.state.cartList.length;
      }
    }
  }
</script>

<style scoped>
  .cart{
    color: rgb(24, 21, 21);
    clear: both;
  }
  .cartNav{
    position: relative;
    background-color: var(--color-tint);
    z-index: 9;
    color: white;
  }
  /* 底部汇总 */
  
</style>