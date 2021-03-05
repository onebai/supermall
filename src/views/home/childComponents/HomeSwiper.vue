<template>
  <div class="home-swiper">
    <Swiper v-if='banners.length'>
      <SwiperItem v-for='item in banners' :key="item.id">
        <a :href="item.link">
          <img :src="item.image" alt="" @load='imgLoad'>
        </a>
        <!-- {{item}} -->
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem';


  export default {
    name:'HomeSwiper',
    components:{
      Swiper,
      SwiperItem
    },
   
    /* 父传子传值 */
    props:{
      banners:{
        return:{
          type:Array,
          default:[]
        }
      }
    },
     data() {
      return {
        isLoad:false
      }
    },
    methods: {
      imgLoad(){
        if(!this.isLoad){
          this.$emit('swiperImgLoad');  // 对于获取高度，只需要获取一次即可，也就是发送  1 次事件就行，和防抖(输入完一个后等一会看后面还有没有内容)，而这里不需要这样，发哦个完一次事件后，直接计算出高度就行了，不一样。
          this.isLoad=true;
        }
      }
    },
    
  }
</script>

<style scoped>
  
</style>