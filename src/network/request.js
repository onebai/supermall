import axios from 'axios';

export function request(config){
  // 1 创建axios实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout: 5000
  })
  
 //  /home/data

  // 2 请求拦截
  instance.interceptors.request.use(
    (config)=>{return config;},
    
    (err)=>{console.log(err);
    });
  // 3 响应拦截
  instance.interceptors.response.use(
    (res)=>{return res;},
    (err)=>{console.log(err);}
  );
  
  // 3 发送真正的网络请求
  return instance(config);
}

/* 新建另外的axios实例 */
export function request2(config) {  
  // 1 创建实例
  const instance2=axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:4000
  });
  // 2 请求拦截和响应拦截
  instance2.interceptors.request.use(
    (config)=>{return config},
    (err)=>{console.log(err);}
  );
  
  instance2.interceptors.response.use(
    (res)=>{return res},
    (err)=>{console.log(err);}
  );
  
  // 3 发送真正的axios请求
  return instance2(config);
}