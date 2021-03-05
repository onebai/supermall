 // 防抖函数debounce
 export function debounce(func,delay){
  let timer=null;
  return function(...args){
    if(timer) clearTimeout(timer);
    timer=setTimeout(() => {
      func.apply(this,args);
    }, delay);
  }
}

/* 手写时间戳转换正常字符串 */
export function formatDate(date,format) {  
  // 1 获取年并是使用年中的字符替换format
  if(/(y+)/.test(format)){
    format=format.replace(RegExp.$1, (date.getFullYear()+' ').substr(4-RegExp.$1.length));
  }
  // 2 获取
  let o ={
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  };
  for(let k in o){
    if(new RegExp(`(${k})`).test(format)){
      let str=o[k]+'';
      format=format.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return format;
}
function padLeftZero(str) {  
  // 1位数的前面补0，如2 补0为 02
  return ('00'+str).substr(str.length);
}