/**
 * 详情页数据请求
 * 面向axios包装一层，所有详情页数据请求相关的都面向这个文件
 */

import { request2 } from './request'

// 1 获取商品的iid数据：根据iid展示不同商品的详情
export function getDetail(iid) { 
 return request2({
   url:'/detail',
   params:{
     iid
   }
 });
}

// 2 获取详情商品的推荐部分数据
export function getRecommened() {  
  return request2({
    url:'/recommend',
  });
}

// 3 整合出来的数据，以类的形式展示
// 获取商品信息
export class Goods{
  constructor(itemInfo,columns,services){
    this.title=itemInfo.title;
    this.desc=itemInfo.desc;
    this.newPrice=itemInfo.price;
    this.oldPrice=itemInfo.oldPrice;
    this.discount=itemInfo.discountDesc;
    this.columns=columns;
    this.services=services;
    this.realPrice=itemInfo.lowNowPrice;
    this.cartNum=itemInfo.cartNum;
  }
}

// 4 整合店铺信息的数据，导出，供使用
export class ShopInfo{
  constructor(shopInfo){
    this.logo=shopInfo.shopLogo;
    this.name=shopInfo.name;
    this.fans=shopInfo.cFans;
    this.sells=shopInfo.cSells;
    this.score=shopInfo.score;
    this.goodCount=shopInfo.cGoods;
  }
}


// 5 整合详情中的商品参数数据
export class GoodsParams{
  constructor(info, rule){
    // image的数据可能不存在，因此需要判断后在展示
    this.img=info.images ? info.images[0]:'';
    this.infos=info.set;
    this.sizes=rule.tables;
  }
}