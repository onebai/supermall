<template>
  <div id="home">
    <NavBar class='home-nav'>
      <div slot="center">购物街</div>
    </NavBar>
     <TabControl :titles="['流行','新款','精选']" @tabClick='tabClick' ref='tabControl2' class='tabControl2' v-show='isTabFixed'></TabControl>
    <Scroll class='content' ref="Scroll" :probe-type='3' :pullUpLoad="true" @scrollPosion='scrollPosion' @pulingUp='pulingUp'>
      <HomeSwiper :banners="banners" @swiperImgLoad='swiperImgLoad'></HomeSwiper>
      <HomeRecommend :recommend="recommend"></HomeRecommend>
      <HomeFeature></HomeFeature>
      <TabControl :titles="['流行','新款','精选']" @tabClick='tabClick' ref='tabControl'></TabControl>
      <GoodsList :goods=showType></GoodsList> 
    </Scroll>
    <BackTop @click.native='backtop' v-show='isShow'></BackTop>
  </div>
</template>

<script>
import HomeSwiper from '../home/childComponents/HomeSwiper';
import HomeRecommend from './childComponents/HomeRecommend';
import HomeFeature from './childComponents/HomeFeature';

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList.vue';
import Scroll from 'components/common/scroll/Scroll';
// import BackTop from 'components/content/backtop/BackTop';


import {getHomeMultiData, getHomeGoods} from '../../network/home';
import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'


  export default {
    name:'Home',
    components:{
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      GoodsList,
      Scroll,
      // BackTop,

      NavBar,
      TabControl
    },
    data() {
      return {
        banners:[],  
        recommend:[],
        /* 流行/新款/精选 */
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentIndex:'pop',
        isShow:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
      }
    },
    mixins:[itemListenerMixin,backTopMixin],

    /**
     * 计算属性，将需要处理后在展示的数据，写在这个里面，这里面都是方法的形式
     */
    computed:{
      // 需要展示的类型
      showType(){
        return this.goods[this.currentIndex].list;
      }
    },
    // 活跃状态
    activated() {
      this.$refs.Scroll.scroll.y=this.saveY;
      this.$refs.Scroll.scroll.refresh();  // 回来时最好刷新一下
    },
    // 不活跃状态
    deactivated() {
      // 1 记录位置
      this.saveY=this.$refs.Scroll.scroll.y;
      // console.log(this.saveY);
      // 2 离开home时取消全局事件监听
      this.$bus.$off('itemImgLoad',this.listenerFun);
    },
    /* 组件加载完成后立马去请求数据 */  // 只写主要逻辑
    created() {
      this.getHomeMultiData();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
      // 组件一旦创建完就把图片加载完成给监听起来
    },
     // dom元素都挂载完成后在执行
    mounted() {
     console.log('home中的');
    },

    methods: {

      /**
       * 事件监听类的方法
       * tabclick和参数index是由点击tabbar，子组件传入的数据，因为点击单个tabbar调用的数据是不一样的，因此需要使用switch与case进行对应
       */
     tabClick(index){
       switch (index) {
         case 0:
           this.currentIndex='pop';
          break;
          case 1:
            this.currentIndex='new';
          break;
          case 2:
            this.currentIndex='sell';
          break;
       };
       // 解决使用tabControl2占位原来tabControl出现的点击type和显示type不一致问题
       if(this.$refs.tabControl!==undefined){
         this.$refs.tabControl.currentIndex=index;
         this.$refs.tabControl2.currentIndex=index;
       }
       
     },
     /**
      * 数据请求相关的方法
      */
      getHomeMultiData(){
        getHomeMultiData().then((res)=>{
        // console.log(res.data.data.recommend.list);
        this.banners=res.data.data.banner.list;
        this.recommend=res.data.data.recommend.list;
        });
      },
      // 根据点击的类型获取数据
      getHomeGoods(type){
        const page=this.goods[type].page+1;  // 页面加载后默认获取第一页数据
        getHomeGoods(type, page).then((res)=>{
          // console.log(reses.data.data.list);  // 这时候返回的就是list数组了
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;

          // 数据加载完成后调用完成上拉加载更多,不是写在下拉加载内，是写在这个获取数据的部分
          // this.$refs.Scroll.scroll.finishPullUp();  // 直接在这里调用scroll对象的finishPullUp()执行再次加载,这是没封装的写法
          this.$refs.Scroll.finishPullUp();  // 封装后写法,上下加载完成，可以再次重新加载
        });
      },
      // 点击后返回顶部
      /* backtop(){
        console.log('点击回到顶部');
        // 1 判断回到顶部
        this.$refs.Scroll.scroll.scrollTo(0,0,500);
        
      }, */
      // 返回顶部：子通过$emit传过来的自定义函数和参数，设当y值大于800显示，
      scrollPosion(position){
        // console.log(position.y);
        // 1 判断是否回到顶部
        this.isShow=(-position.y)>800;
        // 2 判断是否吸顶
        this.isTabFixed=(-position.y)>this.tabOffsetTop
      },

      // 下拉加载更多和存在的bug解决
      pulingUp(){
        console.log('上拉加载更多~~~');
        this.getHomeGoods(this.currentIndex);  // currentIndex表示我当前点击的是哪个，请求的是哪种type的树。下拉加载更多时需要将从服务器请求来的数据放入本地list中，直接使用前面封装的方法
        
        // this.$refs.Scroll.scroll.refresh();  // 一旦图片加载完成后手动刷新，写在mounted中。
      },

      // 图片加载完成，获取滚动高度,但是我只想获取一次，所以进行防抖处理，因为Home和HomeSwiper是父子关系离得近，不用bus传递了。
      swiperImgLoad(){
        // console.log('轮播图片');
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop;
        // console.log(this.tabOffsetTop);
      }
    },
    
  }
</script>

<style scoped>
  #home{
    /* 让整个首页距离上面有navbar的高度，把高度撑开，navbar就不会遮盖到轮播图 */
    /* padding-top: 44px; */
    /* height: 100vh; */
    position: relative;
  }
  .home-nav{
    background-color:var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0px;
    left:0px;
    right:0px;
    z-index: 9;
  }
  .tabControl{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .tabControl2{
    position: relative;
    z-index: 9;
  }
 .content{
   /* 在上下元素的高度都明确时候，获取中间整个高度的时候，可以使用定位，设置好上下左右的值即可 */
   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0px;
   right: 0;
   margin-top: 44px;
 }
 
</style>
