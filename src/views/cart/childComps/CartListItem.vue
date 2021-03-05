<template>
  <div class="cartListItem">
    <!-- {{product}} -->
    <div class='button'>
      <CheckButton :isCheck='product.checked' @click.native='checkClick'></CheckButton>
    </div>
    <div class="pro-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="pro-info">
      <p class="proTitle">{{product.title}}</p>
      <p class="proDesc">{{product.desc}}</p>
      <p class="proBottom">
        <span class="proPrice">￥{{product.price}}</span>
        <span class="proCount">×{{product.count}}</span>
      </p>
    </div>
  </div>
</template>
<script>
import CheckButton from 'components/common/checkButton/CheckButton'

export default {
  name:'CartListItem',
  components:{
    CheckButton
  },
  data() {
    return {
      isCheck:false      
    }
  },
  props:{
    product:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    // 更改是否选中：选中时点击为不选中，不选中时单击为选中
   checkClick(){
     this.product.checked = !this.product.checked;
   }
  },
}
</script>
<style scoped>
  .cartListItem{
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  /* 选择按钮 */
  .button{
    width: 20px;
    /* 让这个选择按钮水平垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* 图片部分 */
  .pro-img{
    padding: 5px;
  }
  .pro-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  /* 文字部分 */
  .pro-info{
    font-size: 16px;
    color: #666;
    padding: 5px 10px;
    overflow: hidden;
    position: relative;
    margin-top: 5px;
  }
  .proTitle, .proDesc{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .proDesc{
    font-size: 14px;
    margin-top: 10px;
  }
  /* 文字底部 */
  .proBottom{
    margin-top: 20px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .proPrice{
    float: left;
    color: red;
  }
  .proCount{
    float: right;
    color: red;
  }
</style>