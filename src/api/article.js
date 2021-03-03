/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const article = {    
    // 新闻列表    
    articleList () {        
        return axios.get(`${base}/topics`);    
    },    
    // 新闻详情,演示    
    articleDetail (id, params) {        
        return axios.get(`${base}/topic/${id}`, {            
            params: params        
        });    
    },
    // post提交    
    login (params) {        
        return axios.post(`${base}/accesstoken`, qs.stringify(params));    
    }
    // 其他接口…………
}

export default article;