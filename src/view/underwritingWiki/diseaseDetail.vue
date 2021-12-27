<template>
    <div>
        <!-- 疾病详情 -->
        <el-container>
            <el-header>
                <div class="current-site">
                    <span>当前位置：</span>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-for="(value,index) in fathNameList" :key="index">
                        <el-breadcrumb-item :to="{ path: '/view/underwritingWiki' }">{{value.firdirname}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{value.secdirname}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{value.trddirname}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-divider></el-divider>
            </el-header>
            <el-main>
                <div class="title-colle">
                    <div class="dise-title">心脏瓣膜疾病</div>
                    <div class="dise-colle">
                        <el-button>
                            <i class="el-icon-star-off"></i><span>收藏</span>
                        </el-button>
                    </div>
                </div>
                <!-- 目录 -->
                <div class="disease-summary">
                    <p class="mulu">目录</p>
                    <ul>
                        <li v-for="(catalogVlaue,index) in catalog" :key="index"><a :href="'#'+catalogVlaue.id">※{{catalogVlaue.name}}</a></li>
                    </ul>
                </div>
                <div class="disease-content">
                    <div v-for="(catalogAll,index) in catalog" :key="index"  :id=catalogAll.id>
                        <p class="summary-title">{{catalogAll.name}}</p>
                        <el-divider></el-divider>
                        <div v-for="(catalogAllContent,idContent) in catalogAll.contentAll" :key="idContent">
                            <p class="orange reference-tiltle">{{catalogAllContent.title}}</p>
                            <div class="referenceBlock">
                                <p v-for="(contentDetail,detailId) in catalogAllContent.content" :key="detailId">
                                    <span class="orange" v-if="contentDetail.indexOf('：') > 0 || contentDetail.indexOf(':') > 0">{{contentDetail|firstHalf}}</span>
                                    <span v-if="contentDetail.indexOf('：') > 0 || contentDetail.indexOf(':') > 0">{{contentDetail|lastHalf}}</span>
                                    <span v-else  :class="catalogAll.id == '402'?'':'pre-content'">{{contentDetail}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'diseaseDetail',
    data(){
        return{
            num : ['一','二','三','四','五','六','七','八','九','十'],
            fathNameList: [{firdirname: "体检异常", trddirname: "近视/眼科检查异常", secdirname: "视力/眼科/近视"}],
            catalog:[],//目录
            survey:'',//概述
            reference: '',//核保参考
            QA:'',//问答
            documentation:'',//案例
            detailList: [
                {
                    detailsPageTwo: {
                        dataLast: [
                            {
                                fordir_oneNo: "101",
                                fordir_onecontent: "①近视是眼在调节松弛状态下，平行光线经眼的屈光系统的折射后焦点落在视网膜之前。其中，当裸眼视力≤0.1或≥800度时，核保需要进行考量。 \n②屈光不正是指眼在不使用调节时，平行光线通过眼的屈光作用后，不能在视网膜上形成清晰的物像，而在视网膜前或后方成像。它包括远视、近视及散光。 \n③眼科检查异常，包括青光眼，白内障，视杯盘比异常，近视等情况。",
                                fordir_twoNo: "",
                                fordir_twocontent: "",
                            }
                        ],
                        fordirNo: "401",
                        fordirname: "概述",
                    },
                    trddirNo: "1202301",
                    trddirname: "近视/眼科检查异常",
                },
                {
                    detailsPageTwo: {
                        dataLast: [
                            {
                                fordir_oneNo: "101",
                                fordir_onecontent: "单侧视力≥800度或者单侧视力＜0.1",
                                fordir_twoNo: "201",
                                fordir_twocontent: "重疾险：视力受损相关责免。\n 高度近视或视力已受损较大，视力相关责任风险较高，故需责任免除。\n  防癌险：标准体可能性大。\n  最终以投保后系统出具的核保结论为准。\n"
                            },
                            {
                                fordir_oneNo: "102",
                                fordir_onecontent: "视杯盘异常，且已排除青光眼",
                                fordir_twoNo: "202",
                                fordir_twocontent: "重疾险：请提供相关病历资料、近期眼科检查（含视功能、眼压、眼底镜）。\n标准体可能性大，不排除责免等。\n  防癌险：标准体可能性大。\n  最终以投保后系统出具的核保结论为准。\n"
                            },
                            {
                                fordir_oneNo: "103",
                                fordir_onecontent: "视杯盘异常，未专科就诊排除青光眼",
                                fordir_twoNo: "203",
                                fordir_twocontent: "重疾险：视力受损相关责免。\n 视杯盘异常，若未排除青光眼，视力相关责任风险较高，故需责任免除。\n  防癌险：标准体可能性大。\n  最终以投保后系统出具的核保结论为准。\n"
                            },
                            {
                                fordir_oneNo: "104",
                                fordir_onecontent: "青光眼现症",
                                fordir_twoNo: "204",
                                fordir_twocontent: "重疾险：视力受损相关责免。\n 青光眼，视力相关责任风险较高，故需责任免除。\n  防癌险：标准体可能性大。\n  最终以投保后系统出具的核保结论为准。\n"
                            },
                        ],
                        fordirNo: "402",
                        fordirname: "核保参考"
                    },
                    trddirNo: "1202301",
                    trddirname: "近视/眼科检查异常",
                },
                {
                    detailsPageTwo:{
                        dataLast:[
                            {
                                fordir_oneNo: "101",
                                fordir_onecontent: "一、为什么高度近视会被除外视力相关责任？",
                                fordir_twoNo: "201",
                                fordir_twocontent: "高度近视可能导致永久性视力损害，甚至失明。单纯性高度近视成年后病情稳定，病理性近视会进行性加重，同时易伴有视网膜、眼底病变，严重者致盲。故结合险种责任，重疾予以视力受损相关责任除外。"
                            },
                            {
                                fordir_oneNo: "102",
                                fordir_onecontent: "二、客户视力0.1被责免，但是客户只有三四百度的视力，可以不责免吗？",
                                fordir_twoNo: "202",
                                fordir_twocontent: "裸眼视力和近视度数是不同的概念。裸眼视力是由眼睛的晶状体的屈光程度，透明度和眼轴长度决定的；近视度数又称视力，是视网膜分辨影像的能力，视力的好坏由视网膜分辨影像能力的大小来判定。三四百度只是说明客户佩镜的度数，不代表客户的裸眼视力。视力只有0.1，说明已经是高度近视，高度近视日后会有失明的风险。我司重疾产品含有失明相关责任，如投保重疾险，需要通过除外视力受损相关责任来承保。"
                            },
                            {
                                fordir_oneNo: "103",
                                fordir_onecontent: "三、体检发现的视杯盘比增大，为什么要责免？",
                                fordir_twoNo: "203",
                                fordir_twocontent: "视杯盘比增大很多情况下是病理性的,比方说青光眼,青光眼引起视神经萎缩,表现在杯盘比的增大。视杯盘比增大也可以是生理性的。如果是体检发现视杯盘比增大，因无进一步检查措施，无法排除病理性的可能，结合险种责任，重疾予以视力受损相关责任除外。"
                            }
                        ],
                        fordirNo: "404",
                        fordirname: "问答"
                    },
                    trddirNo: "1202301",
                    trddirname: "近视/眼科检查异常"
                }
            ]
        }
    },
    created(){
        this.preSeparation();
    },
    methods:{
        // 对获得的数据进行分类
        preSeparation(){
            let that = this;
            for(let i = 0; i < this.detailList.length; i++){
                let teamp = [];
                if(this.detailList[i].detailsPageTwo.fordirNo == '401'){//概述
                    teamp.push({'title':'','content':(this.detailList[i].detailsPageTwo.dataLast[0].fordir_onecontent).split('\n')});
                }
                else{//核保参考、问答、案例
                    this.detailList[i].detailsPageTwo.dataLast.forEach((element,index) => {
                        let tranf = element.fordir_twocontent.split('\n');
                        let result = [];
                        for(let i = 0; i < tranf.length; i++){
                            if(tranf[i] != ''){
                                result.push(tranf[i]);
                            }
                        }
                        if(this.detailList[i].detailsPageTwo.fordirNo == '402'){
                            teamp.push({'title':that.num[index]+'、'+element.fordir_onecontent,'content':result});
                        }else{
                            teamp.push({'title':element.fordir_onecontent,'content':result});
                        }
                        
                    });
                    console.log(teamp);
                    // if(this.detailList[i].detailsPageTwo.fordirNo == '402'){
                    //     this.reference = teamp;
                    // }else if(this.detailList[i].detailsPageTwo.fordirNo == '404'){
                    //     this.QA = teamp;
                    // }else{
                    //     this.documentation = teamp;
                    // }
                    
                }
                
                this.catalog.push({id:this.detailList[i].detailsPageTwo.fordirNo,name:this.detailList[i].detailsPageTwo.fordirname,contentAll:teamp})
            }
            console.log(this.catalog)
        }
    },
    filters:{
        firstHalf(value){
            let temp = value.indexOf('：') > 0 ? value.split('：'):value.split(':');
            return temp[0]+'：';
        },
        lastHalf(value){
            let temp = value.indexOf('：') > 0 ? value.split('：'):value.split(':');
            return temp[1];
        }
    }
}
</script>

<style lang="scss" scoped>
p{
    margin: 0;
}
.el-header{
    padding: 0;
    height: auto;
}
.current-site{
    text-align: left;
    padding: 10px 15px;
    .el-breadcrumb{
        font-size: 12px;
        display: block;
        line-height: 20px;
        margin-top: 5px;
    }
}
.el-divider{
    margin: 5px 0;
}
.title-colle{
    .dise-title{
        display: inline-block;
        width: 86%;
        text-align: left;
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
    }
     .dise-colle{
        display: inline-block;
        width: 14%;
        font-size: 12px;
        vertical-align: top;
        .el-button{
            padding: 5px;
            border: none;
            text-align: center;
            :focus{
                background: #fff;
                color: #606266;
            }
        }
        i{
            font-size: 16px;
        }
        span{
            display: inline-block;
            font-size: 12px;
            margin: 0;
            vertical-align: text-top;
        }
    }
}
.disease-summary{
    text-align: left;
    ul{
        padding: 0;
        li{
            list-style: none;
            padding: 5px 0;
            font-size: 13px;
        }
    }
}
.summary-title{
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 5px;
    margin-top: 25px;
}
.mulu{
    font-size: 16px;
    font-weight: 700;
    margin-top: 15px;
}
.disease-content{
    text-align: left;
}
.pre-content{
    text-indent: 2em;
    line-height: 24px;
    margin: 0;
    display: inline-block;
}
.orange{
    color: #FB8405;
}
.referenceBlock{
    padding: 5px 0;
    line-height: 24px;
}
.reference-tiltle{
    margin-top: 10px;
    line-height: 20px;
}
.el-main{
    padding-top: 10px;
}
</style>
<style lang="scss">
body,div,ul,li,p,span{
    font-family: 'PingFang SC', arial, helvetica, STHeitiSC-Light, Heiti SC, droidsansfallback, dengxian, microsoft yahei;
}
</style>