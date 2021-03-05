<template>
  <Swiper class='detail-swiper'>
    <SwiperItem v-for='item in topImages' :key="item.id" >
      <img :src='item' alt='' @load='imgLoad'>
    </SwiperItem>
  </Swiper>
</template>
<script>
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem'

export default {
  name:'DetailSwiper',
  components:{
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      imgNum:0
    }
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods: {
    // 轮播图图片加载完成
    imgLoad(){
      if(++this.imgNum === this.topImages.length){
        this.$emit('swiperImgLoad');
      }
    }
  },
}
</script>
<style scoped>
  .detail-swiper{
    height: 300px;
    /* overflow: hidden; */
  }
</style>