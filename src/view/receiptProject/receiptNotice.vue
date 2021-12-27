<template>
    <div class="receipt-notice">
        <el-page-header @back="goBack" content="客户回执通知"></el-page-header>
        
        <!-- 回执通知 -->
        <div class="receipt-per" >
            <!-- 头部 -->
            <div :data-index =dataIndex  class="infinite-list-top">
                <p class="insured-unit"><span>投保单位：</span><span>{{currentRreceipt.insuredUnit}}</span></p>
                <p>投保人：{{currentRreceipt.applicant}} </p>
                <p>未回执(<span v-show="ReceiptButtonFont[0][currentReceiptButton] != '全部'">{{ReceiptButtonFont[0][currentReceiptButton]}}/</span>总件数)：
                <span v-show="ReceiptButtonFont[0][currentReceiptButton] != '全部' ">{{currentRreceipt.amount}}/</span>{{currentRreceipt.quantum}}</p>
                <!-- <button class="star-button"><i :class="[policyData.sticky == '1'?'el-icon-star-on el-icon-star-off-style':'el-icon-star-off']"></i><br/>置顶</button> -->
            </div>
        <!-- 长按此按钮转发图片 -->
        <p class="save-pic-tip">
            <img src="~@/assets/receipt/point.png" alt="" srcset="">
            <span>长按图片</span>即可分享给客户或保存
            <el-button @click="textCopy(copyList,$event)" class="el-icon-c-scale-to-original copy-style">一键复制回执单号</el-button>
        </p>

        <el-skeleton v-show="!noticeborn">
            <template slot="template">
                <el-skeleton-item variant="image" />
            </template>
        </el-skeleton>

        <!-- 通知部分 -->
        <div id="toQRcode" v-show="!noticeborn">
            <!-- 内容 -->
            <div class="QR-code">
                <div class="QR-code-content">
                    <p>尊敬的{{currentRreceipt.applicant}}先生/女士：</p>
                    <p class="text-indent">感谢您参保泰康养老的保险产品！</p>
                    <p class="text-indent">您有{{currentRreceipt.quantum}}份保单回执待签收，为了保护您的合法权益，根据监管要求，请您配合按下列指引完成保单签收，预计用时2-3分钟。</p>
                    <p class="text-indent">如您还有疑问，请与您的客户经理{{currentRreceipt.realname}}（手机号:{{currentRreceipt.phone}}）联系，感谢您对泰康养老的支持！</p>
                    <p><span class="">微信回执列表：</span> <br/>
                        <span v-for="(item,index) in allReceiptList" :key="index">
                            <span v-if="index == allReceiptList.length-1">{{item.assured}}（{{item.policyNo}}）</span>    
                            <span v-else>{{item.assured}}（{{item.policyNo}}）、</span><br/>
                        </span>
                    </p>
                    <p><span class="">微信回执路径：</span>泰康养老官方微信→微服务→常用服务→保单回执→按页面提示操作。</p>
                    <!-- 二维码 -->
                    <div class="QR-code-img">
                        <img src="~@/assets/receipt/tkQR.png" alt="" srcset="">
                        <p>泰康养老官方微信</p>
                    </div>
                </div>
                <div class="box"></div>
            </div>
        </div>
        
        <div id="QRCodeBox" class="QR-code-box">
            <img :src=QRUrl alt="" srcset="">
        </div>
        
        </div>

    </div>
</template>

<script>
import html2canvas from 'html2canvas'
import receiptApi from '@/api/api'
import copyText from '@/js/clipboard'
export default {
    name: 'receiptNotice',
    data(){
        return{
            // 二维码图片
            QRUrl:'',
            currentReceiptButton:'',
            dataIndex:'',
            currentRreceipt:{},
            allReceiptList:[],
            copyList:'',
            ReceiptButtonFont:[{'future':'下月到期','now':'本月到期','past':'已超期','all':'全部'}],
            noticeborn:false
        }
    },
    created(){
        this.currentReceiptButton = this.$route.query.ReceiptButtonFont;
        this.currentRreceipt = JSON.parse(this.$route.query.allData);
        this.dataIndex = Number(this.$route.query.index)+1;
        console.log(JSON.parse(JSON.stringify(this.currentRreceipt)))
        this.pic();
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        getExpand(applicant,cardId,insuredUnit,pageNumber=1,pageSize=100){
            return new Promise((resolve,reject) => {
                let params = {applicant:applicant,cardId:cardId,insuredUnit:insuredUnit,pageNumber:pageNumber,pageSize:pageSize}
                receiptApi.receipt.receiptReceiptPolicyByPage(params).then(respone => {
                console.log(respone)
                if(respone.code == 200){ 
                    this.allReceiptList = respone.data.list;
                    respone.data.list.forEach(element => {
                        this.copyList+=element.assured+'('+element.policyNo+')'
                    });
                    resolve(true)
                }else{
                    reject(false)
                }
                
                }).catch(error => {
                     reject(false)
                })
            })
            
        },
        // 生成图片
        async pic(){
            let ifStart = await this.getExpand(this.currentRreceipt.applicant,this.currentRreceipt.cardId,this.currentRreceipt.insuredUnit)
            if(ifStart){
                html2canvas(document.querySelector("#toQRcode"), {
                // 设置放大倍数
                scale : window.devicePixelRatio,
                // 传入节点原始宽高
                width : document.querySelector("#toQRcode").offsetWidth,
                height : document.querySelector("#toQRcode").offsetHeight,
                useCORS: true,
                allowTaint: false
                }).then(canvas => {
                    this.QRUrl = canvas.toDataURL('image/png');
                    this.noticeborn = !this.noticeborn;
                });
            }else{
                this.$alert('信息丢失，无法生成通知。请返回上页重新生成');
            }
        },
        // 复制询价单号到粘贴板
        textCopy(text,event) {
            copyText(text,event,'回执单号复制成功')
        }
            
    }
}
</script>

<style lang="scss" scoped>
.receipt-notice {
    padding: 14px;
    .infinite-list-top{
        position: relative;
        line-height: 18px;
        padding: 5px 10px 0px 10px;
        text-align: left;
        font-size: 13px;
        background: linear-gradient(270deg,#f4bd87,#f47861);
        overflow: hidden;
        border-radius: 5px;
        &::before{
            content: '';
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 0;
            background-image: url('~@/assets/receipt/receipt-bg.png');
            background-repeat: no-repeat;
            background-size: 100% auto;
        }
        &::after{
            content: attr(data-index);
            position: absolute;
            font-size: 100px;
            right: 0px;
            top: 40px;
            z-index: 10;
            opacity: 0.17;
            color: #5a0202;
        }
        p{
            margin: 0;
            padding: 3px 5px;
            color: #fff;
            position: relative;
        }
        .star-button{
            border-top-right-radius: 8px;
            position: absolute;
            right: 0;
            top: 5px;
            font-size: 12px;
            border: none;
            background: none;
            z-index: 999;
            i{
                font-size: 14px;
            }
            .el-icon-star-off-style{
                font-size: 16px;
                color: #12286F;
                background: #fff;
                border-radius: 3px;
                padding: 2px;
            }
        }
        
        .insured-unit{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            width: 90%;
            span:first-child{
                flex-shrink: 0;
            }
        }
        
    }
    .save-pic-tip{
        font-size: 13px;
        img{
            transform: rotate(180deg);
            width: 30px;
            vertical-align: middle;
        }
        span{
            color:#f6c104;
            font-weight: 800;
        }
    }
    .QR-code {
        // background: url('~@/assets/receipt/QRbgm.png') top no-repeat;
        // background-size: 100% 100%;
        // background: #406cc4;
        background: #f4cc24;
        padding: 15px 15px 60px 15px;
        text-align: left;
        position: relative;
        &::after{
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 0;
            width: 100%;
            height: 110px;
            background: url('~@/assets/receipt/letter.png') bottom no-repeat;
            background-size: 100% 100%;
        }
        .QR-code-content {
            background: rgba(#fff,.8);
            border-radius: 8px;
            padding: 10px;
            font-size: 15px;
            p{
                margin: 0;
                padding: 3px 0;
                font-size: 13px;
                line-height: 22px;
            }
            p.text-indent{
                text-indent: 2em;
                word-spacing: 2px;
            }
        }
        .QR-code-img{
            width: 100%;
            height: auto;
            text-align: center;
            font-size: 12px;
            margin-top: 5px;
            padding-bottom: 4px;
            p{
                padding-top: 0;
            }
        }
        
    }
    .QR-code-box{
        width: 100%;
        height: auto;
        img{
            width: 100%;
        }
        position: relative;
        z-index: 999;
        opacity: 1;
        bottom: 0;
    }
    .copy-style {
        font-weight: 400;
        font-size: 12px;
        color: #65b5fc;
        border: 1px solid #65b5fc;
        padding: 5px;
    }
}
</style>

<style lang="scss">
.receipt-notice{
    .el-page-header{
        margin-bottom: 10px;
    }
    .el-page-header__content, .el-page-header__title{
        font-size: 13px;
    }
    .el-skeleton__image{
        position: absolute;
        left: 14px;
        z-index: 999;
        width: calc(100% - 27px);
        height: 100%;
    }
}
</style>