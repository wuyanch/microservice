<template>
    <div></div>
</template>

<script>
import receiptApi from '@/api/api'
import homeUrl from '@/api/goIndex'
import wx from "weixin-js-sdk";
export default {
    name: 'receiptindex',
    data(){
        return{

        }
    },
    created () {
        this.$ls.clear();
        this.loginToken();
    },
    methods:{
        async loginToken () {
            let params =await this.getParam();
            receiptApi.receipt.login(params).then(response => {
                 let fromUrl = this.getQueryVariable('fromUrl') || 'weixin';
                 let projectIdentity = this.getQueryVariable('role') || null;
                 let projectName = this.getQueryVariable('projectName') || null;
                 let backUrl = this.getQueryVariable('backUrl') || null;
                 this.$ls.set('from',fromUrl)
                 this.$ls.set('backUrl',decodeURIComponent(backUrl))
                if(response.code == 200){
                    console.log('我是跳转到renewalIndex')
                    if(fromUrl == 'OTO5G'){
                        this.$ls.set('projectName', decodeURI(projectName))
                        this.$ls.set('projectIdentity', projectIdentity)
                        this.$router.push({path:'/view/renewalService/renewalWhole'})
                    }else{
                        this.$ls.set('projectName',null)
                        this.$ls.set('projectIdentity',null)
                        this.$router.push({path:'/view/renewalService/renewal'})
                    }
                }else{
                    this.$alert('登录失败。3秒后自动跳转回首页', '登录失败', {
                        confirmButtonText: '返回首页',
                        showClose:false,
                        callback: action => {
                            setTimeout(() => {
                                if(fromUrl == 'weixin'){
                                    window.location.href = homeUrl;
                                }else{
                                    wx.closeWindow();
                                }
                            }, 3000);
                        }
                    });
                    
                }
            }).catch(error => {

            })
        },
        getParam(){
            return new Promise((resolve,reject) => {
                // tkNumber 密文  timestamp 明文   sign 密文
                let params = {}
                let tkNumber = this.getQueryVariable('tkNumber')
                let timestamp = this.getQueryVariable('timestamp')
                let sign = this.getQueryVariable('sign')
                params = {'tkNumber':tkNumber, 'timestamp':timestamp, 'sign':sign}
                resolve(params)
            })
        },
        // 获取连接参数
        getQueryVariable(variable){
            var query = (window.location.href).split('?')[1];
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
            }
            return(false);
        }
    },
    beforeRouteLeave(to,from,next) {
        let that = this
        console.log(from)
        next()
    }
}
</script>

<style lang="scss">
.el-message-box{
    width: 90%;
    box-sizing: border-box;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
</style>