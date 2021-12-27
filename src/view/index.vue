<template>
    <div>
       <el-container>
           <!-- 头部 -->
            <el-header>
                <!-- 头像 -->
                <div class="head-img">
                    <el-avatar :size='50' src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
                <div class="personal-information">
                    <span>无言</span><span>TK99999914</span>
                </div>
            </el-header>
            <!-- 应用区 -->
            <el-main>
                <!-- 待办区域 -->
                <div class="dealt">
                    <el-row type="flex" class="row-bg" justify="space-between">
                        <el-col :span="6">
                            <div class="grid-content bg-wen db-content">
                                <span>个核问题件</span>
                                <div>
                                    <span>待阅</span>
                                    <span>18</span>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-bao db-content">
                                <span>保单</span>
                                <div>
                                    <span>待领</span>
                                    <span>18</span>
                                </div>   
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-li db-content">
                                <span>C理赔</span>
                                <div>
                                    <span>待阅</span>
                                    <span>5</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <!-- 报表入口 -->
                <div class="report">
                    <el-row>
                        <el-col :span="24">
                            <div class="grid-content bg-report report-contain">
                                <p>开启报表新时代,快来围观！</p>
                                <div class="report-button">
                                    <button>点我进入></button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <!-- 应用区 -->
                <div class="application-area">
                    <el-row type="flex" class="row-bg" justify="space-between" :gutter="20" v-for="(indexlist,index) in application" :key="index">
                        <el-col :span="12" v-for="(applicationIndex,id) in indexlist" :key="id">
                            <div class="grid-content" @click="hrefTo(applicationIndex.url)">
                              <img :src="applicationIndex.imgsrc"  alt="" srcset="">
                              <span>{{applicationIndex.name}}</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
        </el-container>
    </div>    
    
</template>

<script>

export default {
    name:'index',
    data(){
        return{
           application:[
               [
                {id:'101', name:'问题件处理', imgsrc:require('@a/indexVue/indexwen.png'), url:'/view/matterpiece'},
                {id:'102', name:'领取保单', imgsrc:require('@a/indexVue/indexwuliu.png'), url:'/view/insurancepolicy'}
               ],
               [
                {id:'103', name:'预约体检', imgsrc:require('@a/indexVue/indexyuyue.png'), url:'/view/appointment'},
                {id:'104', name:'个核问卷', imgsrc:require('@a/indexVue/indexwenjuan.png'), url:'/view/questionnaire'}
               ],
               [
                {id:'105', name:'核保百科', imgsrc:require('@a/indexVue/indexbaike.png'), url:'/view/underwritingWiki'}
               ]
            ]
        }
    },
    methods:{
       hrefTo:function(url){
            // this.$router.push({path:'/testDemo',query:{setid:123456}});
            // this.$router.push({name:'testDemo',params:{setid:111222}});
            this.$router.push({path:url})
        //    console.log(url);
       }
    }
}
</script>

<style lang="scss" scoped>
.el-header{
    background: url('../assets/indexVue/headbg.png') no-repeat;
    background-size: cover;
    color: #333;
    text-align: center;
    line-height: 60px;
    position: relative;
    .head-img{
        height:100%;
        span{
            position: absolute;
            left: 25px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .personal-information{
        color: white;
        position: absolute;
        left: 85Px;
        top: 55%;
        transform: translateY(-50%);
        text-align: left;
        font-family: 'qk';
        span{
            display: block;
            line-height: 20px;
            font-size: 12px;
            &:first-child{
                font-size: 14px;
            }
        }
    }
}
main{
    .el-col-6{
        width: 30%;
    }
    .dealt{
        .el-col {
            border-radius: 4px;
            .bg-wen{
                background: url('../assets/indexVue/wenbg.png') no-repeat;
                background-size: cover;
                background-position: right;
            }
            .bg-bao{
                background: url('../assets/indexVue/baobg.png') no-repeat;
                background-size: cover;
                background-position: right;
            }
            .bg-li{
                background: url('../assets/indexVue/libg.png') no-repeat;
                background-size: cover;
                background-position: right;
            }
            .db-content{
                color: white;
                span{
                    &:first-child{
                        display: block;
                        font-family: 'ps';
                        font-size: 14px;
                        text-align: left;
                        padding: 5px 8px 2px 8px;
                    }
                }
                div{
                    width: 100%;
                    box-sizing: border-box;
                    text-align: left;
                    span{
                        &:first-child{
                        display: inline-block;
                        font-size: 12px;
                        padding: 2px 8px 5px 8px;
                        }
                        &:last-child{
                            display: inline-block;
                            font-size: 25px;
                            padding: 2px 8px 5px 5px;
                        }
                    }
                    
                }
            }
        }
        .grid-content {
            border-radius: 4px;
            min-height: 56px;
        }
    }
    .report{
        margin-top: 20px;
        .bg-report{
            background: url('../assets/indexVue/reportbg.png') no-repeat;
            background-size: cover;
            background-position: right;
        }
        .grid-content {
            border-radius: 4px;
            min-height: 75px;
        }
        .report-contain{
            
            p{
                padding: 13px 0px 3px 10px;
                margin: 0;
                font-size: 15px;
                color: #2042ae;
                text-align: left;
                font-family: 'ps';
            }
            .report-button{
                padding: 3px 0px 5px 10px;
                text-align: left;
                button{
                    background: #2042ae;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 5px 10px;
                    font-family: 'ps';
                    font-size: 12px;
                }
            }
            
        }
    }
    .application-area{
        margin-top: 20px;
        .el-row{
            margin-top: 8px;
        }
        .grid-content {
            font-family: 'ps';
            font-size: 15px;
            border-radius: 4px;
            min-height: 54px;
            border:1px solid #ecf4fc;
            position: relative;
            line-height: 56px;
            padding-left: 20px;
            text-align: left;
            img{
                width: 34px;
                height: 34px;
                object-fit: contain;
                vertical-align: middle;
                margin-right: 10px;
            }  
        }
    }
}


</style>
<style lang="scss">
body,div,ul,li,p,span{
    font-family: 'ps',PingFang SC, arial, helvetica, STHeitiSC-Light, Heiti SC, droidsansfallback, dengxian, microsoft yahei;;
}
</style>