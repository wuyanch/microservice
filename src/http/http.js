/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
import { Message, MessageBox  } from 'element-ui';
import homeUrl from '@/api/goIndex'
/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {    
    Message({        
        message: msg,        
        duration: 0, //显示时间, 毫秒。设为 0 则不会自动关闭       
        showClose: true    
    });
}

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
//     router.replace({
//         path: '/login',        
//         query: {
//             redirect: router.currentRoute.fullPath
//         }
//     });
// }

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            // toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            // tip('登录过期，请重新登录');
            // localStorage.removeItem('token');
            // store.commit('loginSuccess', null);
            // setTimeout(() => {
            //     toLogin();
            // }, 1000);
            break;
        // 404请求不存在
        case 404:
            tip('请求的资源不存在'); 
            break;
        case 500:
            if(other.indexOf('Token') > -1){
                // token 失效
                MessageBox.alert('登录超时，请重新进入页面。3秒后自动跳转回首页', '登录超时', {
                    confirmButtonText: '返回首页',
                    showClose:false,
                    callback: action => {
                        window.location.href = homeUrl;
                    }
                });
                setTimeout(() => {
                    window.location.href = homeUrl;
                }, 3000);
            }
            break;
        default:
            console.log(other);  
            MessageBox.alert(other, '报错', {
                confirmButtonText: '返回首页',
                showClose:false,
                callback: action => {
                    window.location.href = homeUrl;
                }
            });
        }}

// 创建axios实例
var instance = axios.create({timeout: 1000 * 60 * 2});

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 
instance.interceptors.request.use(    
    config => {        
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        if(!config.url.indexOf('thirdLogin') > -1){
            const token = window.localStorage.getItem("token");        
            token && (config.headers.Authorization = token);
            console.log(config)        
            return config;
        }        
    },    
    error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(    
    // 请求成功
    res => {
        if (res.status === 200) {
            if(res.headers.hasOwnProperty("authorization")){
              localStorage.setItem('token',res.headers.authorization);
            }
            return Promise.resolve(res);
          } else {
            return Promise.reject(res);
          }
    },
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            // if (!window.navigator.onLine) {
            //    store.commit('changeNetwork', false);
            // } else {
            //     return Promise.reject(error);
            // }
        }
    });

export default instance;