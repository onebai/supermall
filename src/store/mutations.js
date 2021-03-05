/* vuex状态中的store中的mutation */

export default {
  addCounter(state,payload){
    payload.count++;  // 方便跟踪
  },
  addToCart(state,payload){
    // 给商品添加一个是否选中的状态:假设默认为选中
    payload.checked=true;
    state.cartList.push(payload);
  }
  
};