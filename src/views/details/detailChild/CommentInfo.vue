<template>
  <div class="comment-Info" v-if="Object.keys(commentInfo).length!=0">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多</div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="data">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-img" v-for="(item,index) in commentInfo.images" :key="index">
      <img :src="item" alt="">
    </div>
    </div>
    
  </div>
</template>

<script>
import {formatDate} from 'common/utils'
export default {
  name:'CommentInfo',
  data() {
    return {
      value:0
    }
  },
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    showDate(value){
      // 将时间戳转换为正常的字符串格式：直接使用utils中封装好的时间戳转换工具
      let date=new Date(value*1000);
      return formatDate(date,'yyyy-MM-dd');
    }
  }
}
</script>
<style scoped>
  .comment-Info{
    padding: 5px 12px;
    color: black;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    clear: both;
  }
  .info-header{
    height: 50px;
    line-height: 50px;
    border-bottom:  1px solid rgba(0, 0, 0, 0.1);
  }
  .header-title{
    float: left;
    font-size: 15px;
  }
  .header-more{
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }
  .info-user{
    padding: 10px 0px 5px;
  }
  .info-user img{
    width: 42px;
    height: 42ps;
    border-radius: 50%;
    border:1px solid #eee;
  }
  .info-user span{
    color: black;
    position: relative;
    top: -15px;
    margin-left: 10px;
  }
  
  .info-detail{
    padding: 0px 5px 15px;
  }
  .info-detail p{
    font-size: 14px;
    color: #888;
    line-height: 1.5;
  }
  .info-detail .info-other{
    font-size: 12px;
    margin-top: 10px;
    color: #999;
  }
  .info-detail .data{
    margin-right: 10px;
  }
  .info-img{
    margin-top: 10px;
  }
  .info-img img{
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>