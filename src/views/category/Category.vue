<template>
  <div class="wrapper" ref="aaaa">
    <ul class="content">
      <button class="btn">按钮点击</button>
      <li>内容1</li>
      <li>内容2</li>
      <li>内容3</li>
      <li>内容4</li>
      <li>内容5</li>
      <li>内容6</li>
      <li>内容7</li>
      <li>内容8</li>
      <li>内容9</li>
      <li>内容10</li>
      <li>内容11</li>
      <li>内容12</li>
      <li>内容13</li>
      <li>内容14</li>
      <li>内容15</li>
      <li>内容16</li>
      <li>内容17</li>
      <li>内容18</li>
      <li>内容19</li>
      <li>内容20</li>
      <li>内容21</li>
      <li>内容22</li>
      <li>内容23</li>
      <li>内容24</li>
      <li>内容25</li>
      <li>内容26</li>
      <li>内容27</li>
      <li>内容28</li>
      <li>内容29</li>
      <li>内容30</li>
      <li>内容31</li>
      <li>内容32</li>
      <li>内容33</li>
      <li>内容34</li>
      <li>内容35</li>
      <li>内容36</li>
      <li>内容37</li>
      <li>内容38</li>
      <li>内容39</li>
      <li>内容40</li>
      <li>内容41</li>
      <li>内容42</li>
      <li>内容43</li>
      <li>内容44</li>
      <li>内容45</li>
      <li>内容46</li>
      <li>内容47</li>
      <li>内容48</li>
      <li>内容49</li>
      <li>内容50</li>
      <li>内容51</li>
      <li>内容52</li>
      <li>内容53</li>
      <li>内容54</li>
      <li>内容55</li>
      <li>内容56</li>
      <li>内容57</li>
      <li>内容58</li>
      <li>内容59</li>
      <li>内容60</li>
      <li>内容61</li>
      <li>内容62</li>
      <li>内容63</li>
      <li>内容64</li>
      <li>内容65</li>
      <li>内容66</li>
      <li>内容67</li>
      <li>内容68</li>
      <li>内容69</li>
      <li>内容70</li>
      <li>内容71</li>
      <li>内容72</li>
      <li>内容73</li>
      <li>内容74</li>
      <li>内容75</li>
      <li>内容76</li>
      <li>内容77</li>
      <li>内容78</li>
      <li>内容79</li>
      <li>内容80</li>
      <li>内容81</li>
      <li>内容82</li>
      <li>内容83</li>
      <li>内容84</li>
      <li>内容85</li>
      <li>内容86</li>
      <li>内容87</li>
      <li>内容88</li>
      <li>内容89</li>
      <li>内容90</li>
      <li>内容91</li>
      <li>内容92</li>
      <li>内容93</li>
      <li>内容94</li>
      <li>内容95</li>
      <li>内容96</li>
      <li>内容97</li>
      <li>内容98</li>
      <li>内容99</li>
    </ul>
    <p>可滚动内容的下面的内容不可以滚动但是可以正常显示</p>
  </div>

</template>

<script>
  // 用的版本是1.13.2
  import BScroll from 'better-scroll'
  export default {
    name:'Category',
    data(){
      return{
        scroll:null
      }
    },
    created() {
      // 在这里面拿不到dom元素
    },

    /**
     * dom挂载完成后在执行，否则在后面使用dom元素时候就会因为找不到而出错
    */
    mounted() {
      console.log(document.querySelector('.wrapper'));
      // this.scroll=new BScroll(document.querySelector('.wrapper'), {});
      // this.scroll=new BScroll('.wrapper', {});   // 这3个方法都能实现滑动

      this.scroll=new BScroll(this.$refs.aaaa,{
        probeType:3,
        pullUpLoad:true,
      });  

      this.scroll.on('scroll',(position)=>{
        // console.log(position);
      });
      this.scroll.on('pullingUp',()=>{
        console.log('下拉加载更多');
        this.scroll.finishPullUp();
      });
      document.querySelector('.btn').addEventListener('click',()=>{
        console.log('点击按钮');
      });
    },
  }
</script>

<style scoped>
/* scoped作用域，加了scoped后，只能在本组件中生效 */
  .wrapper{
    height: 200px;
    background-color: #cccccc;
    overflow: hidden;
  }
</style>