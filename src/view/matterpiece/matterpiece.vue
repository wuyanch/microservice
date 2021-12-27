<template>
    <!-- 问题件 -->
    <div class="piece-page">
        <!-- 头部 -->
        <div class="top-piece">
            <span class="update-time">刷新时间：{{updateTime}}</span>
            <p class="brush-search"><el-button><i class="el-icon-brush"></i>清除未读</el-button><el-button @click="searchFor"><i class="el-icon-search"></i>搜索</el-button></p>
        </div>
        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="全部" name="first" class="all-piece" attr-num='12'>
                    <div class="top-statistics">
                        <p><span>12</span><span>问题件(个)</span></p>
                        <p><span>98245</span><span>合计标保(元)</span></p>
                        <p><span>34598</span><span>我的标保(元)</span></p>
                    </div>
                    <div class="piece-content">
                        <div class="per-piece">
                            <div class="piece-follow">
                                <el-button><i class="el-icon-star-off"></i> 关注</el-button>
                            </div>
                            <div class="per-piece-top">
                                <p class="per-piece-unit"><span>投保单位：</span><span>广州市荔湾区彩虹街社区卫生服务中心工会委员会</span></p>
                                <p>出单工号：彩虹-大组-林文文</p>
                                <p class="person-piece"><span>投保人：黄玉婷</span><span>被保人：黄玉婷</span></p>
                            </div>
                            <div class="per-piece-bottom">
                                <p class="piece-state"><span>核保状态：延期</span><span>扣费状态：扣款成功</span></p>
                                <el-divider></el-divider>
                                <p class="bottom-button"><el-button @click="lookDetail">查看详情<i class="el-icon-arrow-right"></i></el-button></p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="未读" name="second">

                </el-tab-pane>
                <el-tab-pane label="关注" name="third">

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name:'matterpiece',
    data(){
        return{
            activeName:'first',
            updateTime:'2021-04-01 14:38'
        }
    },
    methods:{
        handleClick:function(){},
        searchFor: function(){
            this.$router.push({path:'/view/mattersearch'})
        },
        lookDetail: function(){
            this.$router.push({path:'/view/matterdetail'})
        }
    }
}
</script>

<style lang="scss" scoped>

.top-piece{
    padding: 0 15px;
    font-size: 0;
    height: 40px;
    position: relative;
    .update-time{
        font-size: 12px;
        float: left;
        line-height: 40px;
        margin-right: 10px;
    }
    .brush-search{
        display: inline-block;
        .el-button{
            box-sizing: border-box;
            padding: 7px 10px;
            margin: 6px 5px;
            font-size: 12px;
            border: none;
            &:last-child{
                margin-left: 0;
                border-left: 1px solid #DCDFE6;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }
        }
    }
}
.top-statistics{
    display: flex;
    padding: 0 15px;
    p{
        display: inline-block;
        width: 33%;
        span{
            &:first-child{
                display: block;
                font-size: 14px;
                font-weight: 700;
                text-align: center;
            }
            &:last-child{
                display: block;
                font-size: 12px;
                margin-top: 3px;
            }
        }
    }
}
.all-piece::after{
    content: attr('attr-num');
    position: absolute;
    left: 0;
    top: 0;
    font-size: 12px;
    height: 25px;
    width: 25px;
    background: #f46c6c;
}
.piece-content{
    padding: 20px 20px;
}
.per-piece{
    text-align: left;
    // border: 1px solid #dcdfe6;
    border-radius: 5px;
    position: relative;
    .per-piece-top{
        background-image: linear-gradient(44deg, #edbf7a 40%,#f1c97c 60%, #dec188 100% );//edbf7a
        border: 1px solid #ffc875;
        padding: 15px 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        color: white;
        p{
            margin: 0;
            font-size: 13px;
            &:nth-child(2){
                padding: 6px 0;
            }
        }
        .per-piece-unit{
            span{
                display: inline-block;
                &:last-child{
                    width: 66%;
                }
                &:first-child{
                    width: 21%;
                    vertical-align: top;
                }
            }
        }
        .person-piece{
            span{
                display: inline-block;
                &:last-child{
                    width: 50%;
                }
                &:first-child{
                    width: 50%;
                }
            }
        }
    }
    .per-piece-bottom{
        padding: 10px 10px;
        padding-bottom: 0;
        border: 1px solid #dcdfe6;
        border-top: none;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        p{
            margin: 0;
        }
        .el-divider{
            background-color: inherit;
            border-bottom: 1px dotted #dcdfe6;
        }
        .el-divider--horizontal{
            margin: 0;
        }
        .piece-state{
            padding-bottom: 5px;
            span{
                display: inline-block;
                &:first-child{
                    width: 60%;
                }
                &:last-child{
                    width: 40%;
                }
            }
        }
        .bottom-button{
            text-align: right;
            .el-button{
                border: none;
                font-size: 13px;
                padding: 10px 20px;
            }
        }
    }
}
.piece-follow{
    position: absolute;
    right: 8px;
    top: -10px;
    .el-button{
        padding: 0;
        font-size: 12px;
        padding: 4px 8px;
        border: none;
        outline: none;
        background: #f7fcff;
        i{
            display: block;
            font-size: 18px;
            padding:0 5px 0;
        }
    }
}
</style>
<style lang="scss">
.piece-page{
    .el-tabs__nav-scroll,.el-tabs__nav-wrap{
        border-radius: 5px;
    }
    .el-tabs__header{
        margin: 0 15px;
        box-shadow: 1px 0px 2px 0px #dcdfe6, -1px 0px 2px 0px #dcdfe6;
        border-radius: 5px;
    }
    .el-tabs__nav{
        float: none;
        display: inline-block;
    }
    .el-tabs__nav-wrap::after{
        background-color: #fff;
    }
}

.el-icon-brush{
    transform: rotate(180deg);
}
</style>