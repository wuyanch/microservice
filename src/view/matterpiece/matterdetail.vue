<template>
    <!-- 每一个问题件的详情 -->
    <div class="matter-detail">
        <el-page-header @back="goBack" content="详情"></el-page-header>
        <!-- 保单详情 -->
        <div class="detail-imp-part">
            <div class="detail-part-piece">
                <p class="detail-part-title">保单详情</p>
                <div class="detail-part detail-part-orange">
                    <p class="detail-part-who"><span>投保人：黄玉婷</span><span>被保人：黄玉婷</span></p>
                    <div v-if="downUp" class="h-span-span">
                        <p><span>代理机构：</span><span>我是代理机构</span></p>
                        <p><span>投保单位：</span><span>我是投保单位</span></p>
                        <p><span>出单工号：</span><span>我是出单工号</span></p>
                        <p><span>个单号：</span><span>975667897</span></p>
                        <p><span>提交日期：</span><span>我是提交日期</span></p>
                        <p><span>合计保费：</span><span>我是合计保费</span></p>
                        <p><span>我的标保：</span><span>我是标保哦</span></p>
                        <p><span>主险保额：</span><span>我是保额啦啦啦</span></p>
                        <p><span>险种名称：</span><span>我是险种我是险种我是险种我是险种我是险种我是险种（代码：9875）</span></p>
                    </div>
                    <!-- el-icon-d-arrow-left -->
                    <el-button class="h-arrow-top" @click="downUpChange"><span v-if="downUp">收起</span><span v-else>展开</span><i :class="[downUp?'el-icon-d-arrow-left':'el-icon-d-arrow-right']"></i></el-button>
                </div>
            </div>
            <!-- 核保详情 -->
            <div class="detail-part-piece">
                <p class="detail-part-title">核保详情<span>更新时间：2020-01-02 11:57:43</span></p>
                <div class="detail-part detail-part-blue h-span-span">
                    <p><span>核保意见：</span><span>我是核保意见，我是核保意见，我是核保意见，我是核保意见，我是核保意见</span></p>
                    <el-divider class="h-divider"></el-divider>
                    <div class="agree-result">
                        <el-button @click="conclusion = true">接受核保结论</el-button>
                    </div>
                </div>
            </div>
            <!-- 扣费详情 -->
            <div class="detail-part-piece">
                <p class="detail-part-title">扣费详情<span>更新时间：2020-01-02 11:57:43</span></p>
                <div class="detail-part detail-part-green">
                    <p><span>付款方：</span><span></span></p>
                    <p><span>付款账号：</span><span></span></p>
                    <p><span>支付金额：</span><span></span></p>
                    <p><span>扣费结果：</span><span></span></p>
                </div>
            </div>
        </div>
        <!-- 底部固定的四个按钮 -->
        <div class="foot-button">
            <el-button @click="submitPhoto">提交核保资料</el-button><el-button @click="supplementary = true">补充说明</el-button><el-button @click="allow"><i :class="[isAllow?'el-icon-star-off':'el-icon-star-on']"></i>关注</el-button>
        </div>

        <!-- 补充说明 -->
        <el-dialog
        title="补充说明"
        :visible.sync="supplementary"
        width="90%"
        class=""
        >
        <div>
            <el-input
            type="textarea"
            :rows="12"
            placeholder="在此写下您需要补充的说明"
            v-model="supplementaryTextarea"
            maxlength="1000"
            resize="none"
            show-word-limit>
            </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="supplementary = false">取 消</el-button>
            <el-button type="primary" @click="supplementary = false">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 接受核保结论 -->
        <el-dialog
        title="接受核保结论"
        :visible.sync="conclusion"
        width="90%"
        >
        <div class="conclusion-content">
           <el-divider></el-divider>
           <p><span>个单号：</span><span>987654345678909</span></p>
           <p><span>被保险人：</span><span>无言</span></p>
           <p>核保人员将把结论推送至商城（弹性平台），推送后，结论将无法修改</p>
           <p>请务必先与客户沟通好。</p>
           <el-divider></el-divider>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="conclusion = false">取 消</el-button>
            <el-button type="primary" @click="conclusion = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'matterdetail',
    data(){
        return{
            downUp:false,
            isAllow:false,//是否关注，false-没有关注, true-关注
            pieceData:[],
            supplementary: false,//补充说明
            supplementaryTextarea:'',//补充说明
            conclusion:false,//接受核保结论
        }
    },
    methods:{
        goBack: function(){
            this.$router.go(-1);
        },
        //控制是否展示内容
        downUpChange: function(){
            this.downUp = !this.downUp
        },
        //关注
        allow: function(){
            this.isAllow = !this.isAllow;
        },
        submitPhoto: function(){
            this.$router.push({path:'/view/mattersubphoto'})
        }
    }
    
}
</script>

<style lang="scss" scoped>
p{
    margin: 0;
    text-align: left;
}
.detail-imp-part{
    padding-bottom: 45px;
}
.detail-part-piece{
    margin: 10px 15px;
    &:not(:first-child){
        margin-top: 20px;
    }
    &:nth-child(2){
        margin-top: 30px;
    }
}
.detail-part-title{
    font-size: 13px;
    font-weight: 700;
    padding: 5px 15px;
    span{
        &:last-child{
            float: right;
            font-weight: normal;
            font-size: 12px;
        }
    }
}
.detail-part{
    padding: 6px 15px;
    border: 1px solid #dcdfe6;
    border-left: 5px solid #ec6c04;
    border-radius: 5px;
    position: relative;
    p{
        padding: 3px 0;
    }
    .h-arrow-top{
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        padding: 6px 20px;
        font-size: 12px;
    }
}
.detail-part-orange{
    border-left: 5px solid #ec6c04;
    padding-bottom: 20px;
}
.detail-part-blue{
    border-left: 5px solid #0cb4ac;
}
.detail-part-green{
    border-left: 5px solid #07c4fb;
}
.agree-result{
    font-size: 12px;
    text-align: right;
    .el-button{
        padding:8px 15px;
        font-size: 12px;
        background: #f9eab2;
        border: 1px solid #f9eab2;
    }
}
.detail-part-who{
    span{
        display: inline-block;
        width: 50%;
    }
}
.el-icon-d-arrow-left,
.el-icon-d-arrow-right{
    transform: rotate(90deg);
}
.foot-button{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 38px;
    display: flex;
    .el-button{
        width: 34%;
        font-size: 12px;
        margin: 0;
        border: none;
        border-top: 1px solid #dcdfe6;
        border-radius: 0;
        &:nth-child(2){
            border-left: 1px solid #dcdfe6;
            border-right: 1px solid #dcdfe6;
        }
    }
}
.h-divider{
    margin: 5px 0;
}
.h-span-span{
    p{
        display: flex;
        span{
            &:first-child{
                width: 20%;
            }
            &:last-child{
                width: 80%;
                line-height: 18px;
            }
        }
    }
}
.el-icon-star-off,
.el-icon-star-on{
    vertical-align: middle;
    margin-right: 3px;
    line-height: 10px;
}
.el-icon-star-off{
    font-size: 14px;
}
.el-icon-star-on{
    font-size: 18px;
}
.el-icon-star-on{
  color: #4484fc;  
}
.conclusion-content{
    p{
        padding: 4px 0;
        font-size: 13px;
    }
    .el-divider{
        margin:5px 0;
    }
}
</style>
<style lang="scss">
.matter-detail{
    .el-page-header{ 
        padding: 10px 15px;
        .el-page-header__left{
            .el-icon-back,
            .el-page-header__title{
                font-size: 13px;
                color: #4484fc;
            }
        }
        .el-page-header__content{
            font-size: 12px;
        }
    }
    .el-dialog__header{
        text-align: left;
    }
    .el-dialog__body{
        padding: 5px 10px;
    }
    .el-dialog__title{
        font-size: 14px;
    }
}
 
</style>