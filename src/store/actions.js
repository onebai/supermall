// 剪出来的actions，异步请求和复杂逻辑判断

export default {
  addCart(context,payload){
    // 结合promise实现操作成功的提示信息
    return new Promise((resolve, reject)=>{
      // 判断新增加的商品payload在cartList中是否已经存在，存在则将count+1.不存在则将payload加入，并将商品count+1
      // corderwhy的写法let oldProduct=state.cartList.find((item)=>{item.iid === payload.iid});

      // 1 查找里面是否有该商品
      let oldProduct=null;
      for(let item of context.state.cartList){
        if(item.iid  === payload.iid){
          oldProduct=item;
        }
      } 
      // 2 判断oldProduct
      if(oldProduct){ // 该商品数量+1
        // oldProduct.count+=1;
        context.commit('addCounter',oldProduct);
        resolve('该商品数量+1');
      }else{
        payload.count=1;  //  该商品添加购物车成功
        // context.state.cartList.push(payload);
        context.commit('addToCart',payload);
        resolve('该商品添加购物车成功');
      }
    })
  }
}