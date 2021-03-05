<template>
  <div class="total">
    <div class="left" @click='totalCheck'>
      <CheckButton class='checkall' :isCheck='ischeckall'></CheckButton>
      <span>全选</span>
    </div>
    <div class="center">总计:{{totalPrice}}</div>
    <div class="right" @click='totalClick'>去结算:{{totalnum}}</div>
  </div>
</template>
<script>
import CheckButton from 'components/common/checkButton/CheckButton'
export default {
  name:'CartBottom',
  components:{
    CheckButton
  },

  computed:{
    // 1 总金额使用的过滤filter连接reduce链接保留2位小数toFixed
    totalPrice(){
      return this.$store.state.cartList.filter((item)=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue+item.price*item.count
      },0).toFixed(2);
    },

    // 2 计算商品总数:被选中的count总和/被选中的cartList中的长度
    totalnum(){
    /*   return this.$store.state.cartList.filter((item)=>{
        return item.checked
      }).reduce((preVlaue,item)=>{
        return preVlaue+item.count
      },0); */

    return this.$store.state.cartList.filter((item)=>{
      return item.checked}).length;
    },

    // 3 自动的：是否全部选中
    ischeckall(){
      if(this.$store.state.cartList.length === 0 ){ return false}
      // 1 filter方法
      // return !(this.$store.state.cartList.filter((item)=>{return !item.checked}).length); // 子选项全部选中则全选选中，子有一个没选，全选显示不全选
      // 2 find方法
      // return !this.$store.state.cartList.find(item => !item.checked);   与上面的第二句代码同理

      // 3 普通遍历 for判断只要有一个没选中 则return false ，找不到没选中的则返回true
      for(let item of this.$store.state.cartList){
        if(!item.checked){
          return false; // 有一个没选中则全选为不选中
        }
      }
      return true;  // 找不到就是全部选中
    }
  },
  methods: {
    // 点击的全选/全不选，(1)子都是不选中或有几个未选中，点击后全部选中。(2)原来子都是选中，点击后变为不选中
    totalCheck(){
      console.log('全选');
      if(this.ischeckall){  // 子全部选中
        this.$store.state.cartList.forEach(item => item.checked = false);
      }else{  // 子有未选中的
        this.$store.state.cartList.forEach(item => item.checked = true);
      }
    },
    // 点击结算后给用户的提示信息
    totalClick(){
      if(!this.ischeckall){ // 一个商品都没选的情况
        this.$toast.show('请选择要购买的商品', 1500);
      }
    }
  },
}
</script>
<style scoped>
  .total{
    height: 40px;
    background-color: #eee;
    position: relative;
    bottom: 133px;
    display: flex;
  }
  .left{
    width: 80px;
    /* 让这个选择按钮水平垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left span{
    margin-left: 5px;
  }
  .center{
    flex: 1;
    text-align: center;
    line-height: 40px;
  }
  .right{
    width: 90px;
    background-color: var(--color-tint);
    text-align: center;
    line-height: 40px;
  }
  /* 全选 */
 

</style>