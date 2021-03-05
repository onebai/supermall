<template>
  <div class='detail'>
    <DetailNavbar class='detail-Navbar' @titleClick='titleClick' ref='nav'></DetailNavbar>
    <Scroll class='content' ref="Scroll" :probeType='3' @scrollPosion='scrollPosion'>
      <DetailSwiper :topImages='topImages' @swiperImgLoad='swiperImgLoad'></DetailSwiper>
      <DetailInfo :detailInfo='detailInfo'></DetailInfo>
      <DetailShopInfo :shopInfo='shopInfo'></DetailShopInfo>
      <DetailGoodsInfo :detailGoodsInfo='detailGoodsInfo' 
                    @detImgLoad='detImgLoad' ></DetailGoodsInfo>
      <DetailGoodsParams :goodsParams='goodsParams' ref='params'></DetailGoodsParams>
      <CommentInfo :commentInfo='commentInfo' ref='comment'></CommentInfo>
      <GoodsList :goods='detailRecommend' ref='recommend'></GoodsList>
    </Scroll>
    <DetailBottomBar @addCart='addToCart'></DetailBottomBar>
    <BackTop @click.native='backtop' v-show='isShow'></BackTop>
    <!-- <Toast :message='message' :show='show'></Toast> -->
  </div>
</template>

<script>
import DetailNavbar from './detailChild/DetailNavbar'
import DetailSwiper  from 'views/details/detailChild/DetailSwiper'
import DetailInfo from './detailChild/DetailInfo'
import DetailShopInfo from './detailChild/DetailShopInfo'
import DetailGoodsInfo from './detailChild/DetailGoodsInfo'
import DetailGoodsParams from './detailChild/DetailGoodsParams'
import DetailBottomBar from './detailChild/DetailBottomBar'
import CommentInfo from './detailChild/CommentInfo'
import GoodsList from 'components/content/goods/GoodsList'



import Scroll from 'components/common/scroll/Scroll'
// import Toast from 'components/common/toast/Toast'
// import toast from 'components/common/index'

import {getDetail,Goods,ShopInfo,GoodsParams,getRecommened} from 'network/details'
import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

import { mapActions } from 'vuex'

  export default {
    name:'Detail',
    components:{
      DetailNavbar,
      DetailSwiper,
      DetailInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailBottomBar,
      CommentInfo,
      GoodsList,
      // Toast
    },
    data() {
      return {
        iid:null,
        topImages:[],
        detailInfo:{},
        shopInfo:{},
        detailGoodsInfo:{},
        goodsParams:{},
        commentInfo:{},
        detailRecommend:[],
        titltOffetYs:[],
        titleOffsetFun:null,
        currentIndex:null,
        /* message:'',
        show:false */
      }
    },
    // 混入mixin
    mixins:[itemListenerMixin,backTopMixin],

    methods: {
      // 1 将vuex中的actions映射到Detailvue中：因为addCart在actions是方法，因此这里直接写在methods中，如果是属性则写在data中
      ...mapActions(['addCart']),
      ...mapActions({
        add:'addCart'
      }),

      // 1 轮播图加载完成后，滚动页面自动刷新
      swiperImgLoad(){
        this.$refs.Scroll.scroll.refresh();
      },

      // 2 详情中每一张图片加载完成后都刷新一次，但是每一次都刷新太频繁，需要进行防抖
      detImgLoad(){
        console.log('------detImgLoad----');
        // this.$refs.Scroll.scroll.refresh();// 由于在mix in混入中已经封装好了防抖函数，直接使用
        this.newRefresh();
        
        // 调用加了防抖函数之后的title点击调换位置
        this.titleOffsetFun();
      },

      // 3 点击navBar里面的元素跳转到相应的主题
      titleClick(index){
        console.log(index);
        this.$refs.Scroll.scroll.scrollTo(0,-this.titltOffetYs[index],200);
      },

      // 4 滚动后跳转到相应的标题
      scrollPosion(position){
        // console.log(position.y);
        // 将position.y 与 [0, 10577, 11465, 11667]比较
        // position.y在0 与10577 之间 navBar的index取0，
        // position.y在 10577 与 11465 之间 navBar的index取1
        // position.y在 11465 与 11667 之间 navBar的index取2
        // position.y大于11667 navBar的index取3

        // 1 获取position.y的值向上滚动时负数
        const positionY= -position.y;
        let length=this.titltOffetYs.length;
        for(let i=0; i<length-1; i++){
          if((this.currentIndex !== i) && (positionY>=this.titltOffetYs[i] && positionY<this.titltOffetYs[i+1])){
            this.currentIndex=i;
            this.$refs.nav.currentIndex=this.currentIndex;
          }

          /* if((this.currentIndex !== i) && ((i<length-1 && positionY>=this.titltOffetYs[i] && positionY<this.titltOffetYs[i+1])||(i===length-1 && positionY>=this.titltOffetYs[i]))){
            // console.log(i);
            this.currentIndex=i;
            this.$refs.nav.currentIndex=this.currentIndex;
          } */
        } 
         // 2 判断是否回到顶部
        this.isShow=(-position.y)>800;
      },

      // 5 添加购物车addToCart
      addToCart(){
        // console.log('---------------');
        // (1)拿到购物车中需要展示的商品信息image,titl,desc,price,num
        const product={};
        product.image=this.topImages[0];
        product.title=this.detailInfo.title;
        product.desc=this.detailInfo.desc;
        product.price=this.detailInfo.realPrice;
        // 在任何时候只要是操作商品，就需要将该商品的iid传过去
        product.iid=this.iid;

       
        // (2)将商品加入到购物车中
        this.addCart(product).then((res)=>{ // 使用actions映射过来的方法
           this.$toast.show(res,1500);
          // console.log(res);
          // console.log(this.$toast);
          // 显示信息和决定是否显示
         /*  this.show=true;
          this.message=res;

          setTimeout(() => {
            this.show=false;
          }, 1500); */

        });
       /*  this.$store.dispatch('addCart',product).then((res)=>{
          console.log(res);
        });  // actions的调用方法dispatch返回一个promise方法 */


      }
    },
    created() {
      // 1 在组件一创建好后，就拿到商品的id号
      this.iid=this.$route.params.iid;

      // 2 通过iid拿到对应的详情页数据
      getDetail(this.iid).then((res)=>{
        const result=res.data.result; 
        console.log(result);
        // 1 获取顶部轮播图片
        this.topImages=result.itemInfo.topImages;//    //这里面是从服务器获取到的对应iid的数据并保存到本地

        // 2 获取商品信息
        this.detailInfo=new Goods(result.itemInfo, result.columns, result.shopInfo.services);

        // 3 拿到店铺信息
        this.shopInfo=new ShopInfo(result.shopInfo);

        // 4 商品详情数据
        this.detailGoodsInfo=result.detailInfo;

        // 5 拿到商品的参数数据
        this.goodsParams=new GoodsParams(result.itemParams.info,result.itemParams.rule);
         
        // 6 拿到商品的评论数据:评论数据可能不存在，因此需要先判断
        if(result.rate.cRate !=0 ){
          this.commentInfo=result.rate.list[0];
        }

        // 7 给titleOffsetFun赋值titltOffetYs这个函数赋值，给里面每一部分item赋值，并进行防抖处理
        this.titleOffsetFun=debounce(()=>{
          this.titltOffetYs=[]
          this.titltOffetYs.push(0);
          this.titltOffetYs.push(this.$refs.params.$el.offsetTop);
          this.titltOffetYs.push(this.$refs.comment.$el.offsetTop);
          this.titltOffetYs.push(this.$refs.recommend.$el.offsetTop);
          this.titltOffetYs.push(Number.MAX_VALUE);
          console.log(this.titltOffetYs); 
        });

        /*  // 第1次获取:点击navbar 的title进行跳转：错误1 还没有被渲染拿不到dom元素，就没有el，而且此使图片也没有完全被加载完
          /*  this.titltOffetYs.push(0);
            this.titltOffetYs.push(this.$refs.params.$el.offsetTop);
            this.titltOffetYs.push(this.$refs.comment.$el.offsetTop);
            this.titltOffetYs.push(this.$refs.recommend.$el.offsetTop);
            console.log(this.titltOffetYs); 
          */
          // 第2次获取:渲染完成后被回调执行：Dom渲染完成：存在问题，图片没有被加载完成，就执行了，取到的值不对
       /*  this.$nextTick(()=>{
            this.titltOffetYs=[]
            this.titltOffetYs.push(0);
            this.titltOffetYs.push(this.$refs.params.$el.offsetTop);
            this.titltOffetYs.push(this.$refs.comment.$el.offsetTop);
            this.titltOffetYs.push(this.$refs.recommend.$el.offsetTop);
            console.log(this.titltOffetYs); 
          });  */ 
        
      });

      // 3 请求详情里面的推荐数据
      getRecommened().then((res)=>{
        this.detailRecommend=res.data.data.list;
        // console.log(res.data.data.list);
      });
    },
   
    mounted() {
     console.log('detail中的');
     // 获取offsetTop值:undefined，内容还没被请求，来就渲染，el没有值
      /* this.titltOffetYs.push(0);
      this.titltOffetYs.push(this.$refs.params.$el.offsetTop);
      this.titltOffetYs.push(this.$refs.comment.$el.offsetTop);
      this.titltOffetYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.titltOffetYs); */
    },
    updated() {
     /*  debounce(()=>{
        this.titltOffetYs.push(0);
        this.titltOffetYs.push(this.$refs.params.$el.offsetTop);
        this.titltOffetYs.push(this.$refs.comment.$el.offsetTop);
        this.titltOffetYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.titltOffetYs);
      }); */
  },
    // 离开detail页面时需要取消全局事件监听，由于detail没有进行页面缓存不能使用deactived所以使用destroyed。由于使用了mixin混入，相当于在本页面中也有了mixin里面的全部内容包括属性,所以直接使用this.listenerFun)..detail没有使用缓存只能使用destroyed而不是deactivted
    destroyed() {
      this.$bus.$off('itemImgLoad',this.listenerFun);
    },

  }
</script>

<style scoped>
  .detail{
    background-color: #fff;
    height: 100vh;

    /* 遮住底部导航 */
    position: relative;
    z-index: 9;
  }
  .detail-Navbar{
    background-color: white;
    /* 通过相对定位设置detail中的navbar显示在最前面 */
    position: relative;
    z-index: 10;
  }
  .content{
    /* //  使用calc的时候，减号两边必须加空格 */
   height: calc(100% - 44px - 49px);  
   
  }
</style>