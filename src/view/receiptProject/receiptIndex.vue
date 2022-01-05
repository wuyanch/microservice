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
                 let fromUrl = this.getQueryVariable('fromUrl') || 0;
                 console.log('fromUrl')
                 console.log('fromUrl' + fromUrl)
                 this.$ls.set('from',fromUrl)
                if(response.code == 200){
                    console.log('我是跳转到receipt')
                    this.$router.push({path:'/view/receipt'})
                }else{
                    this.$alert('登录失败。3秒后自动跳转回首页', '登录失败', {
                        confirmButtonText: '返回首页',
                        showClose:false,
                        callback: action => {
                            if(fromUrl == 'weixin'){
                                window.location.href = homeUrl;
                            }else{
                                wx.closeWindow();
                            }
                        }
                    });
                    setTimeout(() => {
                        if(fromUrl == 'weixin'){
                            window.location.href = homeUrl;
                        }else{
                            wx.closeWindow();
                        }
                    }, 3000);
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
        if(to.name == 'receipt') {//跳去搜索页面
            from.meta.keepAlive = false;
        }
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