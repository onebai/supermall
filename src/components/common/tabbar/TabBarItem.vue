<template>
  <div id="tab-bar-item" @click="itemclick">
    <div v-if="!isActive">  <!-- 不激活 -->
      <slot name="item-icon"></slot>
    </div>

    <div v-else>  <!-- 激活 -->
      <slot name="item-icon-sctive"></slot>
    </div><!-- 激活状态的图片，显示那个由我动态决定 -->

    <div :style="activeStyle"> <!-- 激活状态添加类名active -->
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  /* 父向子传值使用props，最好使用对象，可以使用数组 */
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data(){
    /* 定义个一个变量用于存储激活状态标志 */
    return{
    //  isActive:true,  // 默认是不激活状态,不写死，我们在下面的计算属性中动态设置
    }
  },
  methods: {
    itemclick(){
      /* 监听每一个tabbaritem的点击事件 */
      this.$router.push(this.path);
    }
  },
  // 计算属性
  computed:{
     /* 当我点击具体的item如首页。分类时，让被点击的显示活跃。方法：获取当前点击的路由，判断其路径中是否包含this.path,有就说明当前应该变红，没有则表示不能变红和 */
     /*  */
     // 路由中的pathshifouthis.path是否相等
    isActive(){
      return this.$route.path.indexOf(this.path)!==-1;  // 不等于-1表示包含 true  活跃
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor}:{}
    }
  },
}

</script>


<style scoped>
   #tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 12px;
    margin-top: 3px;
  }
  #tab-bar-item img{
    width: 30px;
    display: inline-block;
    margin-bottom: -2px;
  }
  .active{
    color: red;
  }
</style>