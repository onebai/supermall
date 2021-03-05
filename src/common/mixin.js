/**
 * mixin 混入：抽取处理啊重复代码使用方法import {itemListenerMixin} from 'common/mixin'。。  mixins:[itemListenerMixin],
 */

import {debounce} from 'common/utils';
import BackTop from 'components/content/backtop/BackTop';


// 返回顶部的监听函数
export const backTopMixin={
  data() {
    return {
      isShow:false,
    }
  },
  components:{
    BackTop
  },
  methods: {
    // 点击后返回顶部
    backtop(){
      console.log('点击回到顶部');
      // 1 判断回到顶部
      this.$refs.Scroll.scroll.scrollTo(0,0,500);
    },
  },
};

// 图片是否加载完的监听函数
export const itemListenerMixin={
  computed:{},
  components:{},
  data() {
    return {
      listenerFun:null,
      newRefresh:null,
    }
  },
  mounted() {
     // 1 给refresh包装一层防抖函数
     this.newRefresh=debounce(this.$refs.Scroll.refresh);
     this.listenerFun=()=>{
      this.newRefresh();  // 执行包装了防抖函数后的refresh       
    };

    // 2 Home和Detail页面的点击监听
    this.$bus.$on('itemImgLoad', this.listenerFun)
    console.log('mixin中的内容');
  },
}