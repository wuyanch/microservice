<template>
    <!-- 问题件搜索 -->
    <div class="matter-search">
        <div>
            <div class="h-input-select-box">
                <div class="h-input-select-left">
                     <el-select v-model="selectType"  placeholder="请选择" class="h-select">
                        <el-option v-for="(option,index) in selectOption" :key="index" :label=option.label :value=option.value></el-option>
                    </el-select>
                    <el-input v-show="selectType==2||selectType==3||selectType==5||selectType==''" placeholder="请输入内容" v-model="selectContent" class="h-select-input"></el-input>
                    <el-select v-show="selectType==1||selectType==4" v-model="selectContent" placeholder="请选择" class="h-select-input">
                        <el-option
                        v-for="item in selectContentOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button  icon="el-icon-search" class="h-select-button"></el-button>
                </div>
                <el-button class="h-input-select-right">取消</el-button>
            </div>
        </div>
        <div>
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
                        <p class="bottom-button"><el-button>查看详情<i class="el-icon-arrow-right"></i></el-button></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'mattersearch',
    data(){
        return{
            selectOption:[{value:1,label:'单位名称'},{value:2,label:'投保人'},{value:3,label:'被保人'},{value:4,label:'出单工号'},{value:5,label:'问题件类型'}],//搜索左边选择
            selectContent:'',//搜索的内容
            selectType:'',//搜索的类型
            selectContentOptions: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
            problemType:[{value:1,label:'核保问题件'},{value:2,label:'扣费问题件'}]
        }
    }
}
</script>

<style lang="scss" scoped>
.h-input-select-box{
    margin: 10px 7px;
    display: flex;
    .h-input-select-left{
        border: 1px solid #DCDFE6;
        border-radius: 5px;
    }
    .h-select{
        width: 31%;
        display: inline-block;
        padding-bottom: 1px solid #fff;
    }
    .h-select-input{
        width: 56%;
        display: inline-block;
        border-left: 1px solid #DCDFE6;
        border-right: 1px solid #DCDFE6;
    }
    .h-select-button{
        width: 12.4%;
        border: 1px solid #54a4fc;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        background: #54a4fc;
        padding-left: 0;
        padding-right: 0;
        vertical-align: top;
        color: white;
    }
    .h-input-select-right{
        margin-left: 4px;
        padding: 5px 3px;
        font-size: 12px;
        border:none;
        color: #54a4fc;
    }
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
        padding-bottom:0;
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
                padding: 10px 15px 15px;
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
        i{
            display: block;
            font-size: 18px;
            padding:0 5px 0;
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
</style>
<style lang="scss">
.matter-search{
    .el-input__inner{
        border: none;
        font-size: 12px;
        padding-left: 4px;
    }
}
</style>