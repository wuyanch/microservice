<template>
    <div class="develop-page">
        <div class="develop">
            <div class="develop-content">
                <img :src="src" alt="">
                <p>{{ msg }}</p>
                <div class="button-zy"><el-button @click="colsePage"> 关闭页面 </el-button></div>
            </div>
          
        </div>
        
    </div>
</template>

<script>
import wx from "weixin-js-sdk";
import getQueryVariable from '@/js/getQueryValue'

export default {
    name:'error',
    data(){
        return{
            src: require('@/assets/comm/no-result.png'),
            msg:''
        }
    },
    created(){
        this.getQueryVal();
    },
    methods:{
        getQueryVal(){
            this.msg = decodeURI(getQueryVariable('message'))
        },
        colsePage(){
            wx.closeWindow()
        }
    }
}
</script>

<style lang="scss" scoped>
.develop{
    padding: 10px 15px;
    margin-top: 50px;
}
.develop-content{
    font-size: 12px;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    p{
        font-size: 14px;
        width: 80%;
        margin: 0 auto;
        margin-top: 10px;
        word-break: break-all;
    }
}
.button-zy{
    margin-top: 60px;
    width: 100%;
    .el-button{
        width: 150px;
        height: 38px;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        border: 1px solid #60b3ff;
        text-decoration: none;
        color:#60b3ff;
        padding: 10px 25px;
        font-size: 14px;
    }
}
</style>