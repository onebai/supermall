<template>
  <div class="home-recommend">
    <div v-for="item in recommend" :key="item.id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'HomeRecommend',
    props:{
      recommend:{
        return:{
          type:Array,
          default:[]
        }
      }
    }
    
  }
</script>

<style scoped>
  .home-recommend{
    display: flex;
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    flex: 1; /* 均匀分布 */
    text-align: center;
    font-size: 12px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .recommend-item img{
    width: 70px;
    margin-bottom: 10px;
  }
</style>