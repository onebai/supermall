<template>
  <!-- 如果是纯文字的就不要使用插槽了 -->
  <div class="tabControl tabCon-gun">
    <div v-for="(item,index) in titles" :key="item.id" class="tabControl-item" 
    :class="{active:index === currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script scoped>
  export default {
    name:'TabControl',
    data(){
      return{
        currentIndex:0
      }
    },
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex=index;
        this.$emit('tabClick',index);  // 子向父传递数据，将当前点击的tab传递出去，并传出index
      }
    },
  }
</script>

<style>
  .tabControl{
    display: flex;
    text-align: center;
    background-color: #fff;
    height: 40px;
    line-height: 40px;
  }
  .tabControl-item{
    flex: 1;
  }
  .tabControl-item span{
   
    padding: 3px;
  }
  .active{
    color: red;
  }
  .active span{
    border-bottom: red solid 2px;
  }
  
</style>