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
const receipt = {   
    // 分页查询回执投保单
    receiptReceiptPolicyByPage (params) {        
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/receipt/queryPolicyByPage`,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    }, 
    // 分页查询回执数据
    receiptReceiptByPag (params) {        
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/receipt/queryReceiptByPage`,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    },  
    // 查询回执数据截止时间    
    receiptReceiptTime () {        
        return new Promise((resolve, reject) =>{
            axios.get(`${base}/receipt/queryReceiptTime`).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    },   
    // 获取统计的回执单数据
    receiptReceiptCount (params) {        
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/receipt/selecCount`,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    },   
    // 查询投保单位下拉列表    
    receiptInsuredUnit () {
        return new Promise((resolve, reject) =>{
            axios.get(`${base}/receipt/queryInsuredUnit`)
            .then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        })
    },
    // 查询出单工号下拉列表
    receiptChudanName () {
        return new Promise((resolve, reject) =>{
            axios.get(`${base}/receipt/queryChudanName`)
            .then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        })
    },
     // 查询产品类型下拉列表
    receiptRiskType () {        
        return new Promise((resolve, reject) =>{
            axios.get(`${base}/receipt/queryRiskType`).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data) 
            })
        }) 
    },   
    // 设置置顶/取消置顶
    receiptReceiptTopOrCancel (params) {        
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/receipt/setTopOrCancel`,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        }) 
    }, 

    //回执login token
    login (params) {
        return new Promise((resolve, reject) =>{
            axios.post(`${base}/thirdLogin/hz`,qs.stringify(params)).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        })
    }
    // 其他接口…………
}

export default receipt;