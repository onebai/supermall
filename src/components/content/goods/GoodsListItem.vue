<template>
  <div class="goodsItem" @click='gdItemClick'>
    <img :src="showImg" alt="" @load="imgLoad">
    <!-- <img v-lazy="showImg" alt="" @load="imgLoad"> -->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'GoodsListItem' ,
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImg(){
        return this.goodsItem.image || this.goodsItem.show.img;
      }
    },
    
    methods: {
      // 1 每个图片加载完成后都执行这个方法，并且使用事件总线的方法将自定义事件itemImgLoad传出去
      imgLoad(){
        this.$bus.$emit('itemImgLoad');

       /*  if(this.$route.path.indexOf('/home')){
         this.$bus.$emit('homeItemImgLoad');
        }else if(this.$route.path.indexOf('/detail')){
         this.$bus.$emit('detailItemImgLoad');
        } */

      },

      // 2 点击商品进入商品详情页的事件函数
      gdItemClick(){
        // console.log('商品点击进入详情页面');

        // 点击后跳转到详情页面push方法，拿到该商品的id号，通过动态路由
        this.$router.push('/detail/'+this.goodsItem.iid);
      }
    },
  }
</script>

<style>
  .goodsItem{
    /* flex: 1; 想要让内容在父容器中显示好几个不能设置flex 1（flex1 指的是均分）*/
    width: 48%;
    padding-bottom: 5px;
  }
  .goodsItem img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    padding: 2px;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
    position: relative;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: red;
    padding-right: 25px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: "";
    width: 14px;
    height: 14px;
    position: absolute;
    left: -15px;
    top: 0px;
    background:url("~assets/img/common/collect.svg") no-repeat 0 0/14px 14px;
  }
</style>