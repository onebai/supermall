<template>
  <div class="base-info">
    <div class="info-title">{{detailInfo.title}}</div>
    <div class="info-price">
      <span class="new-price">{{detailInfo.newPrice}}</span>
      <span class="old-price">{{detailInfo.oldPrice}}</span>
      <span class="discount" v-if="detailInfo.discount">{{detailInfo.discount}}</span>
    </div>
    <div class="info-other" v-if="detailInfo.columns && detailInfo.services">
      <span>{{detailInfo.columns[0]}}</span>
      <span>{{detailInfo.columns[1]}}</span>
      <span>{{detailInfo.services[detailInfo.services.length-1].name}}</span>
    </div>
    <div class="info-service" v-if="detailInfo.services">
      <span class="servInfo" v-for="index in  detailInfo.services.length" :key="index">
        <img :src="detailInfo.services[index-1].icon" alt="">
        <span>{{detailInfo.services[index-1].name}}</span>
      </span>
     
    </div>
  </div>
</template>
<script>
export default {
  name:'DetailInfo',
  props:{
    detailInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>
<style scoped>
  .base-info{
    font-size: 14px;
  }
  .info-title{
    padding: 5px;

    color: black;
  }
  .info-price{
    padding: 5px;
  }
  .info-price .new-price{
    font-size: 20px;
    color: red;
  }
  .info-price .old-price{
    padding-left: 5px;
    font-size: 10px;
    text-decoration-line:line-through;
  }
  .info-price .discount{
    padding: 2px 5px ;
    background-color: red;
    border-radius: 10px;
    color: white;
    font-size: 10px;

    /* 让元素上浮一些：使用相对定位即可 */
    position: relative;
    top: -5px;
  }

  .info-other{
    margin: 0 5px;
    padding: 8px 0px;
    border-bottom: 1px solid #ccc;
    text-align: center;
    display: flex;
    justify-content:space-between; /* // 两端对齐 */
  }
 
 .info-service{
   padding: 15px 5px;
   font-size: 10px;
   text-align: center;
   border-bottom: 3px solid #ccc;
   display: flex;
   justify-content: space-between;
 }
 .info-service .servInfo img{
   width: 12px;
 }
  
</style>
