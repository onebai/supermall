<template>
  <div class="cart-list">
    <Scroll class='content' ref="Scroll" :probe-type='3'>
      <CartListItem v-for='item in cartL' :key="item.id" :product='item'></CartListItem>
    </Scroll>
  </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

export default {
  name:'CartList',
  components:{
    Scroll,
    CartListItem
  },
  data() {
    return {
      cartList:null,
    }
  },
  computed:{
    // 1 从vuex中拿到商品列表
    cartL(){
      this.cartList=this.$store.state.cartList;
      return this.cartList;
    }
  },
  // 加入购物车，直接滚不能滚动的问题,yuanyin:因为重新进入Cart之后，需要重新计算可滚动高度
  activated() {
    this.$refs.Scroll.scroll.refresh();
  },
}
</script>

<style scoped>
  .cart-list{
    color: red;
    height: 100vh;
  }
  .content{
   overflow: hidden;
   height: calc(100% - 44px - 49px - 40px);

    /* 在上下元素的高度都明确时候，获取中间整个高度的时候，可以使用定位，设置好上下左右的值即可 */
  /*  position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0px;
   right: 0; */
   /* margin-top: 44px; */
 }
</style>