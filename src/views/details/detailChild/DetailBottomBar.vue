<template>
  <div class="bottom-bar">
    <div class="navLeft">
      <div class="kefu">
        <span class="icon"></span>
        <p>客服</p>
      </div>
      <div class="shop">
        <span class="icon"></span>
        <p>店铺</p>
      </div>
      <div class="cafv">
        <span class="icon"></span>
        <p>收藏</p>
      </div>
    </div>
    <div class="navRight">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="mai">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  name:'DetailBottomBar',
  methods: {
    addToCart(){
      // console.log('加入巩固无线');
      this.$emit('addCart');
    }
  },
}
</script>

<style scoped>
  .bottom-bar{
    height: 49px;
    background-color: white;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #ccc;
    display: flex;
  }
  .navLeft, .navRight{
    flex: 1;
    display: flex;
  }
  .navLeft div, .navRight div{
    flex: 1;
    text-align: center;
  }

  /* navLeft */
  .navLeft{
    line-height: 49px;
    font-size: 14px;
  }
  .kefu{
    text-align: center;
  }
  .navLeft .icon{
    display: block;
    width: 30px;
    height: 28px;
    margin: 3px auto 0px;
    background: url('~assets/img/detail/detail_bottom.png') no-repeat ;
    background-size: 28px;
  }
  .kefu .icon{
    background-position: 0px -67px;
  }
  .kefu p:last-child,.shop p:last-child,.cafv p:last-child  {
    margin-top: -16px;
  }
  .shop .icon{
    background-position: 0px -126px;
  }
  .cafv .icon{
    background-position: 0px 0px;
  }

  /* navRight */
  .navRight {
    text-align: center;
    line-height: 49px;
  }
  .cart{
    background-color: yellow;
    color: black;
  }
  .mai{
    background-color: rgb(252, 57, 93);
    color: white;
  }
</style>