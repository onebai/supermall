<template>
  <div class='goods'>
    <GoodsListItem v-for='item in goods' :key="item.id" :goodsItem='item'></GoodsListItem>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
  export default {
    name:'GoodsList',
    components:{
      GoodsListItem
    },
    props:{  // 接收的参数名要与传入的参数名相同
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  } 
</script>

<style>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 1%;
  }
</style>