/* 
  自己安装better-scroll插件在外面包装一层，就是本层，让所有的需要滚动的需要该插件的都面向这个文件实现。  避免在better-scroll插件出问题，不好维护。
 */
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name:'Scroll',
    data() {
      return {
        scroll:null,
      }
    },
    props:{
      probeType:{
        return:{
          type:Number,
          default:0,
        }
      },
      pullUpLoad:{
        return:{
          type:Boolean,
          default:true
        }
      }
    },
    mounted() {
      // 1 创建BScroll对象
      this.scroll=new BScroll(this.$refs.wrapper,{
        useTransition:false,   //  去除滑动时候的模糊效果
        click:true,   // 添加点击确认否则在Scroll里面的点击事件全部无法点击
        probeType:this.probeType,
        pullUpLoad:true,
      });

      // 2 实时监听位置
      if(this.probeType==2 || this.probeType==3){
        this.scroll.on('scroll',(position)=>{
          // console.log(position);
          // 监听完后需要把获得的position传出去
          this.$emit('scrollPosion',position);
        });
      }
     

      // 3 下拉加载更多
      if(this.pullUpLoad){
        this.scroll.on ('pullingUp',()=>{
        // console.log('下载加载更多');
        // 监听完成后将下载加载事件传到调用的位置
        this.$emit('pulingUp');
       });
      }
      

    },
    
    // 在home中组件一开始创建就开始调用refresh方法，但是Scroll组件中的scroll是在dom元素挂载完成后才执行，也就是首页中的goodsListitem中的图还没加载就刷新，当然调用不了，报错。解决方法：先判断 this.scroll是否创建（因为scroll是在挂载完成后才创建的与图片是一样的），创建了则才执行refresh。

    methods: {
      finishPullUp(){
       this.scroll && this.scroll.finishPullUp();
      },
      refresh(){
        this.scroll && this.scroll.refresh();
        // console.log('9999');
      }
    },
  }
</script>
<style scoped>

</style>