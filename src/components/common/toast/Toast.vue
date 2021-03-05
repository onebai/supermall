<template>
  <div class="toast" v-show="isshow">
    {{message}}
  </div>
</template>
<script>
export default {
  name:'Toast',
  /* props:{
    message:{
      type:String,
      default:''
    },
    show:{
      type:Boolean,
      default:false
    }
  } */
  data() {
    return {
      message:'',
      isshow:false
    }
  },
  methods: {
    show(message, time){
      console.log('组件中的大音');
      this.isshow=true;
      this.message=message;
      
      setTimeout(() => {
        this.isshow=false;
        this.message='';
      }, time);
    }
  },
}
</script>
<style scoped>
  .toast{
    background: rgba(0, 0, 0, 0.8);
    padding: 8px;
    border-radius: 5px;
    color: white;

    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%);
    z-index: 10;

  }
</style>