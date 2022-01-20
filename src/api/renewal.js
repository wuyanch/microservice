/**
 * 回执模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/http/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

/**
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const renewal = {   
    // 查询续期数据截止时间
    renewalRenewTime () {        
        return new Promise((resolve, reject) =>{
            axios.get(`${base}/renewalservice/queryRenewTime`).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    },  
    // 生成通知
    renewalCreateNotify (params) {        
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/renewalservice/createNotify`,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    }, 
    // 获取续期投保单位下拉列表
    renewalInsuredUnitList (params) {
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/renewalservice/getInsuredUnitList`,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    },  
    // 获取投保单位下拉列表
    renewalAllPage (params) {        
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/renewalservice/queryInsuredUnitPage`,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    },   
    // 获取投保单的分页数据
    renewalDetailPage (params) {        
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/renewalservice/queryDetailPage`,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    },   
    // 首页——服务经理分布情况
    renewalAgentInfo (params) {        
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/renewalservice/queryIndexAgentInfo`,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    },   
    // 首页——项目整体统计信息
    renewalFullProjectInfo (params) {        
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/renewalservice/queryIndexFullProjectInfo`,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    },   
    // 首页——小组分布情况
    renewalTeamInfo (params) {        
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/renewalservice/queryIndexTeamInfo`,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    },  
    //获取不同状态下的交费人和件数统计信息
    renewalCount (params) {
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/renewalservice/queryPaymanNumberCount`,params,{'content-type': 'application/json' },
            ).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        })
    },

    //获取分类下的统计总数
    renewalTypeCount (params) {
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/renewalservice/queryTypeCount`,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        })
    }
    
}

export default renewal;