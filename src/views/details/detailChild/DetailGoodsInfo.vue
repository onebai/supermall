<template>
  <div class="detail-gdinfo" v-if="Object.keys(detailGoodsInfo).length!=0">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{detailGoodsInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailGoodsInfo.detailImage[0].key}}</div>
    <div class="info-list" v-for="item in detailGoodsInfo.detailImage[0].list" :key="item.id">
      <img :src="item" alt=""  @load="imgLoad"/>
    </div>
  </div>
</template>
<script>
export default {
  name:'DetailGoodsInfo',
  props:{
    detailGoodsInfo:Object,
    default(){
      return {}
    }
  },
  data() {
    return {
      imgcount:0,
      imgLenth:0
    }
  },
  methods: {
    imgLoad(){
      // 一旦图片都加载完成就发送detImgLoad到父组件，进行监听
      if(++this.imgcount === this.detailGoodsInfo.detailImage[0].list.length){
        console.log('detailGoodsInfo');
        this.$emit('detImgLoad');
      console.log(this.imgcount);

      }
    }
  },
  watch:{
    detailInfo(){
      // 获取图片个数
      // this.imgLenth=this.detailGoodsInfo.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>
  .detail-gdinfo {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
    clear: both;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>