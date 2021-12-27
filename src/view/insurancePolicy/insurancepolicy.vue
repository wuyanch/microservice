<template>
    <!-- 预约保单 -->
    <div class="policy-all">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="可领保单" name="first">
                <div class="h-input-select-box-fixed">
                    <div class="h-input-select-box">
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
                </div>
                <div class="policy-can">
                    <el-checkbox-group v-model="checkedPolicys" @change="handleCheckedCitiesChange" class="h-checkbox-group">
                        <el-checkbox v-for="policy in policys" :label="policy.printNo" :key="policy.id" :disabled ="policy.policyState==4?true:false">
                            <div class="pre-policy" @click.prevent>
                                <!-- 保单的基础信息 -->
                                <div class="pre-policy-tophalf pre-policy-half">
                                    <p class="policy-label"><span :class="[policy.policyState == 4 ?'policy-ap':'policy-no','policy-ba']">{{policy.policyState == 4 ? '已预约('+policy.appointUser+')':'待预约'}}</span></p>
                                    <p>投保单位：{{policy.insuredUnit}}</p>
                                    <p v-show="policy.zjAgencyNames != ''">代理机构：{{policy.zjAgencyNames}}</p>
                                </div>
                                <!-- 保单的其他信息 -->
                                <div class="pre-policy-bottomhalf pre-policy-half">
                                    <p class="tb-block">投保人：{{policy.insurerName}}</p>
                                    <p class="tb-block">被保人：{{policy.insuredName}}</p>
                                    <p>业务信息：{{policy.chudanNo}}</p>
                                    <p class="policy-other"><el-button @click.stop="policyDialogVisible=true" class="look-logistics">查看物流</el-button></p>
                                </div>
                            </div>
                        </el-checkbox>
                    </el-checkbox-group>
                    
                    <div class="fix-footer-button">
                        <el-checkbox v-model="checkAll" @change="handleCheckAllChange" class="all-checkbox">全选</el-checkbox>
                        <el-button>预约领取</el-button>
                    </div>
                </div>
               
            </el-tab-pane>
            <el-tab-pane label="在途保单" name="second">
                <div class="h-input-select-box-fixed">
                    <div class="h-input-select-box">
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
                </div>
                <div class="policy-can policy-intransit">
                    <div class="pre-policy" v-for="policy in policys" :label="policy.printNo" :key="policy.id" :disabled ="policy.policyState==4?true:false">
                        <!-- 保单的基础信息 -->
                        <div class="pre-policy-tophalf pre-policy-half">
                            <p class="policy-label">
                                <span :class='[policyProcessStyle[policy.policyState-3],"policy-ba","policy-state"]'>
                                {{policyProcess[policy.policyState]}}
                                </span>
                            </p>
                            <p>投保单位：{{policy.insuredUnit}}</p>
                            <p v-show="policy.zjAgencyNames != ''">代理机构：{{policy.zjAgencyNames}}</p>
                        </div>
                        <!-- 保单的其他信息 -->
                        <div class="pre-policy-bottomhalf pre-policy-half">
                            <p class="tb-block">投保人：{{policy.insurerName}}</p>
                            <p class="tb-block">被保人：{{policy.insuredName}}</p>
                            <p>业务信息：{{policy.chudanNo}}</p>
                            <p class="policy-other"><el-button @click.stop="policyDialogVisible=true" class="look-logistics">查看物流</el-button></p>
                        </div>
                    </div>
                </div>
                <div class="paging">
                    <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="20"
                    :pager-count=5
                    :hide-on-single-page=true
                    :total="1000">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
        

        <!-- 物流弹框 -->
        <el-dialog
        title="物流情况"
        :visible.sync="policyDialogVisible"
        width="100%"
        center>
        <div>
            <p class="policy-order">
                <span>个单号：2053012377217366</span> 
                <span>第几次打印：1</span>
            </p>
            <p class="policy-order">寄往机构快递单号：12847382654</p>
            <el-divider></el-divider>
            <el-timeline>
                <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp">
                {{activity.content}}
                </el-timeline-item>
            </el-timeline>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="policyDialogVisible = false">关 闭</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'insurancepolicy',
    data(){
        return{
            activeName: 'first',//标签页
            selectOption:[{value:1,label:'单位名称'},{value:2,label:'投保人'},{value:3,label:'被保人'},{value:4,label:'出单工号'},{value:5,label:'全部'}],//搜索左边选择
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
            checkAll: false,
            checkedPolicys: [],//保单被选中的列表
            policys: [
                {
                    insuredUnit:'中国农业银行股份有限公司广东省分行营业部本部工会委员会',
                    printNo:'2053012345004366001',
                    zjAgencyNames:'',
                    insurerName:'无言',
                    insuredName:'大无言',
                    chudanNo:'广州农行2021-林文文',
                    policyState:3,//待领取
                    appointUser:'林文文'
                },
                {
                    insuredUnit:'中国人民银行广州分行工会工作委员会',
                    printNo:'2053012369170866001',
                    zjAgencyNames:'',
                    insurerName:'欧魏海',
                    insuredName:'欧魏海',
                    chudanNo:'广州农行2021-林文文',
                    policyState:4,//已预约
                    appointUser:'林文文'
                },
                {
                    insuredUnit:'中国工商银行股份有限公司广东省分行营业部',
                    printNo:'2053011063754066002',
                    zjAgencyNames:'中国工商银行',
                    insurerName:'叶加旺',
                    insuredName:'叶加旺',
                    chudanNo:'广州农行2021-林文文',
                    policyState:3,//待领取
                    appointUser:'林文文'
                },
                {
                    insuredUnit:'中国人民银行广州分行工会',
                    printNo:'2053012362099166001',
                    zjAgencyNames:'',
                    insurerName:'郭春燕',
                    insuredName:'赵玥',
                    chudanNo:'广州农行2021-林文文',
                    policyState:4,//已预约
                    appointUser:'林文文'
                }
            ],//所有的保单
            isIndeterminate: true,
            policyDialogVisible:false,//物流情况的弹框
            activities: [{//物流情况
                content: '制单寄出',
                timestamp: '2018-04-12 20:46'
                }, {
                content: '省公司质检',
                timestamp: '2018-04-03 20:46'
                }, {
                content: '寄往机构',
                timestamp: '2018-04-03 20:46:34'
                }, {
                content: '机构上架',
                color: '#409EFF',
                timestamp: ''
                },{
                content: '预约领取',
                timestamp: ''
                }, {
                content: '领取保单',
                timestamp: ''
                }
            ],
            policyProcess:['制单寄出','省公司质检','寄往机构','机构上架','预约领取','领取保单'],
            policyProcessStyle:['policy-state-1','policy-state-2','policy-state-3']
        }
    },
    methods:{
        //切换标签页
        handleClick(tab, event) {
            console.log(tab, event);
        },
        // ----------选择保单------
        handleCheckAllChange(val) {
            let arrids = [];
            console.log(val)
            this.checkedPolicys = val ? this.returnCities() : [];
            this.isIndeterminate = false;
            console.log(this.checkedPolicys);
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.policys.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.policys.length;
        },
        returnCities(){
            let arry = [];
            this.policys.forEach(element => {
                arry.push(element.policyState == 3? element.printNo:'')
            });
            return arry.filter(value => { return value != ''});
        },
        lookPolicy(){
            return
        }
    }
}
</script>

<style lang="scss" scoped>
.h-input-select-box-fixed{
    position: fixed;
    top: 50px;
    background: #fff;
    z-index: 99;
    padding-bottom: 10px;
}
.h-input-select-box{
    margin: 0 15px;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    display: flex;
    .h-select{
        width: 32%;
        display: inline-block;
        padding-bottom: 1px solid #fff;
    }
    .h-select-input{
        width: 55%;
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
    }
}
.el-checkbox{
    display: block;
    margin: 0;
    margin-top: 15px;
    &:first-child{
        margin-top: 0;
    }
}
.h-checkbox-group{
    padding: 15px;
    padding-bottom:60px;
    padding-top: 110px;
}
.pre-policy{
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    position: relative;
    p{
        padding: 4px 0;
        margin: 0;
        text-align: left;
    }
    .tb-block{
        display: inline-block;
        width: 50%;
        padding-right: 10px;
        box-sizing: border-box;
    }
    .policy-other{
        height: 40px;
        box-sizing: border-box;
        text-align: center;
        button{
            padding: 10px 20px;
            font-size: 12px;
        }
    }
    .pre-policy-tophalf {
        padding: 5px 10px;
        // background: linear-gradient(45deg, #cce4f4, #54a4fc);
        background: #54a4fc;
        border: 1px solid #b8daf0;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        position: relative;
        color: #fff;
    }
    .pre-policy-bottomhalf{
        padding: 5px 10px;
        border: 1px solid #DCDFE6;
        border-top: 0;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .policy-label{
        height: 12px;
        .policy-ap{
            background-color: #DCDFE6;
        }
        .policy-no{
            background-color: #f67374;
            color: white;
        }
        .policy-ba{
            padding: 2px 10px;
            font-size: 10px;
            position: absolute;
            left: -1px;
            top: -1px;
            border-top-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }
    }
    
    
    
}
.policy-intransit{
    padding: 0 24px;
    padding-top: 110px;
    padding-bottom: 30px;
    div.pre-policy:not(:first-child){
        margin-top: 15px;
    }
    .policy-label{
        .policy-state-1{
            background: #ffc875;
        }
        .policy-state-2{
            background: #1b5ca4;
        }
        .policy-state-3{
            background: #5f8bbd;
        }
    }
    
}
.paging{
    margin-top: 20px;
}
</style>
<style lang="scss">
.policy-all{
    .el-tabs__nav{
        float: none;
        display: inline-block;
    }
    .el-tabs__nav-wrap::after{
        background-color:#fff !important;
    }
    .h-input-select-box{
        .el-input__inner{
            border: none;
        }
        .h-select-button{
            i{
                color: white;
            }
        }
    }
    .el-tabs__header{
        position: fixed;
        width: 100%;
        top: 0;
        padding-bottom: 8px;
        background-color: #fff;
        z-index: 99;
    }
    .el-tabs__nav-scroll{
        padding: 5px 15px 0px 15px;
    }
    .el-dialog{
        position: absolute;
        bottom: 0;
        margin-bottom: 0;
        .el-timeline{
            padding-left: 0;
        }
        .policy-order{
            margin: 0;
            line-height: 24px;
            span:last-child{
                float: right;
            }
        }
        .el-divider{
            margin: 6px 0 15px 0;
        }
    }
    .el-pagination.is-background .btn-prev,.el-pagination.is-background .btn-next{
        padding-left: 5px;
        padding-right: 5px;
    }
    .el-pagination.is-background .el-pager li{
        background-color: #fff;
        border: 1px solid #DCDFE6;
    }
    .el-icon-arrow-left:before{
        content: '上一页';
    }
    .el-icon-arrow-right:before{
        content: '下一页';
    }
    .el-pagination{
        padding: 8px 5px;
    }
}
.policy-can{
    .fix-footer-button{
        padding: 0 15px;
        position: fixed;
        width: 100%;
        bottom: 0;
        background: #fff;
        box-sizing: border-box;
        z-index: 99;
        border-top: 1px solid #DCDFE6;
        .all-checkbox{
            display: inline-block;
            width: 40%;
            padding-left: 8px;
            box-sizing: border-box;
            border-radius: 40px;
            .el-checkbox__inner{
                border-radius: 40px;
            }
            .el-checkbox__label{
                padding-left: 20px;
                line-height: 45px;
            }  
        }
        .el-button{
            width: 60%;
            background: #54a4fc;
            color: white;
        }
    }
    
    .el-checkbox__label{
        width: 90%;
        white-space: pre-wrap;
        box-sizing: border-box;
        text-align: left;
    }
    .el-checkbox__input{
        width: 10%;
        vertical-align: top;
        margin-top: 10px;
        .el-checkbox__inner{
            width: 25px;
            height: 25px;
        }
    }
    .el-checkbox__inner::after{
        width: 6px;
        height: 16px;
        top: 0px;
        left: 9px;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label{
        color: #606266;
    }
    .el-checkbox__inner:hover{
        border-color: #DCDFE6;
    }
    .el-checkbox__input.is-disabled+span.el-checkbox__label{
        color: #606266;
    }
    
}

</style>