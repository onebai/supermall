<template>
  <div class="shop-Info">
    <div class="shopInfo-header">
      <img :src="shopInfo.logo" alt="">
      <span>{{shopInfo.name}}</span>
    </div>
    <div class="shopInfo-detail">
      <div class="shopInfo-left">
        <span>
        <p>{{shopInfo.sells | sellCountFilter}}</p>
        <p>总销量</p>
        </span>
        <span>
          <p>{{shopInfo.goodCount}}</p>
          <p>全部宝贝</p>
        </span>
      </div>
      <div class="shopInfo-right" v-if='shopInfo.score'>
        <p v-for="index in shopInfo.score.length" :key="index">
          <span class="name">{{shopInfo.score[index-1].name}}</span>
          <span class="score" :class="{'scoreBetter':shopInfo.score[index-1].isBetter}">{{shopInfo.score[index-1].score}}</span>
          <span class="better" :class="{'betterBetter':shopInfo.score[index-1].isBetter}">{{shopInfo.score[index-1].isBetter? '高':'低'}}</span>
        </p>
      </div>
    </div>
    <div class="shop-bottom">
      <span class="enter-shop">进店逛逛</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name:'DetailShopInfo',
  props:{
    shopInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  // 过滤器：数量超过一万显示万，并保留1位小数
  filters:{
    sellCountFilter(value){
      let result=value;
      if(value>10000){
        result=(value/10000).toFixed(1) + '万';
      }
      return result;
    }
  }
}
</script>

<style scoped>
  .shop-Info{
    padding: 15px 5px 5px 5px;
    font-size: 14px;
    border-bottom: 10px solid #cccccc;
  }
  .shop-Info .shopInfo-header img{
    width: 60px;
    border: 2px solid #ccc;
    border-radius: 30px;
  }
  .shop-Info .shopInfo-header span{
    font-size: 18px;
    position: relative;
    top: -22px;
    left: 5px;
   }

  .shopInfo-detail {
    width: 100%;
    margin-top: 20px;
    display: flex;
  }
  .shopInfo-detail .shopInfo-left{
    flex: 1;
    border-right: 1px solid #ccc;
    display: flex;
    justify-content: space-around;
    color: black;
  }
  .shopInfo-detail .shopInfo-left span{
    flex: 1;
    text-align: center;
  }
  .shopInfo-detail span p{
    padding: 2px;
  }

  .shopInfo-detail .shopInfo-right{
    flex: 1;
    /* padding-left: 35px; */
    margin-left: 10px;
  }
  .shopInfo-detail .shopInfo-right p{
    display: flex;
  }
   .shopInfo-detail .shopInfo-right p span{
     text-align: center;
     flex: 1;
   }
  .shopInfo-detail .shopInfo-right p span:first-child{
    color: black;
  } 
  .score, .better{
    color: green;
  }
  .scoreBetter{
    color: red;
  }
  .betterBetter{
    color: red;
  }
  /* 进店看看 */
  .shop-bottom{
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }
  .enter-shop{
    padding: 5px 10px;
    background-color: #eee;
    border-radius: 15px;
    font-size: 16px;
    color: black;
  }
</style>