<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click='backClick'>
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      
      <div slot="center" class='detailNav'>
        <div v-for='(item,index) in titles' :key="item.id"  class='detailItem' 
            :class='{active:index===currentIndex}'
            @click='itemClick(index)'>
          {{item}}
        </div>
      </div>
    </NavBar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

  export default {
    name:'DetailNavbar',
    components:{
      NavBar      
    },
    data() {
      return {
        titles:['商品','详情','评论','推荐'],
        currentIndex:0,
      }
    },
    methods: {
      backClick(){
        // this.$router.back();
        this.$router.go(-1);
      },
      itemClick(index){
        this.currentIndex=index;
        // 将点击事件传递给DetailVue中进行跳转主题的处理
        this.$emit('titleClick',index);
      },
    },
  }
</script>

<style scoped>
  .back img{
    padding-top: 12px;
  }
  
  .detailNav{
    display: flex;
  }
  .detailItem{
    flex: 1;
  }
  .active{
    color: red;
  }
</style>