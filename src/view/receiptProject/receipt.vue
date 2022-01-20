<template>
    <div class="receipt-page">
        <div>
        <!-- 按钮和截止日期 -->
            <p class="receipt-deadline">回执状态截止：{{receiptDealineTime}} 24:00 <button class="rule" @click="centerDialogVisible = true"><i class="el-icon-question"></i>回执规则</button></p>
            <p class="receipt-classification">
                <button @click="switchReceipt(0)" :class="[currentReceiptButton== 0?'active':'']">下月到期</button>
                <button @click="switchReceipt(1)" :class="[currentReceiptButton== 1?'active':'']">本月到期</button>
                <button @click="switchReceipt(2)" :class="[currentReceiptButton== 2?'active':'']">已超期</button>
                <button @click="switchReceipt(3)" :class="[currentReceiptButton== 3?'active':'']">全部</button>
                <button :class="[selectStart?'el-icon-close':'el-icon-search']" @click="findReceipt">{{selectStart?'取消筛选':'筛选'}}</button>
            </p>
            <!-- 搜索部分 -->
            <el-autocomplete
                class="inline-input"
                v-model="searchContent"
                :fetch-suggestions="querySearch"
                :trigger-on-focus = "triggerfocus"
                placeholder="请输入内容"
                @select="handleSelect"
                ref="elautocomplete"
                v-if="selectStart"
                >
                <el-select v-model="selectLabel" @change="changeOption" slot="prepend" placeholder="请选择">
                    <el-option label="投保人" value="1"></el-option>
                    <el-option label="被保险人" value="2"></el-option>
                    <el-option label="出单工号" value="3"></el-option>
                    <el-option label="投保单位" value="4"></el-option>
                    <el-option label="个单号" value="5"></el-option>
                    <el-option label="产品类别" value="6"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchOption"></el-button>
            </el-autocomplete> 
        </div>
        <!-- 提示框 -->
        <!-- <div class="receipt-tip" v-if="currentReceiptButton != 3 && !selectStart">
            <p>
               <span v-html=promptContent[currentReceiptButton].content></span>
            </p>
        </div> -->
        <!-- 当前条件下的回执数 -->
        <div class="receipt-show" v-if="dataTopList.flag">
            <span><b>{{dataTopList[insureReceiptGetData[currentReceiptButton]]}}</b><br/>投保人(人)</span>
            <span><b>{{dataTopList.policyTotal}}</b><br/>总件数(件)</span>
            <span v-if="currentReceiptButton != 3"><b>{{dataTopList[ReceiptButtonFontGetData[currentReceiptButton]]}}</b>
                <br/>{{ReceiptButtonFont[currentReceiptButton]}}(件)
            </span>
        </div>
        <!-- 内容展示 -->
        <div :class="[currentReceiptButton == 3?'infinite-list-three':'infinite-list']"
        id="infiniteList"
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="busy" 
        infinite-scroll-distance="100" 
        style="overflow-y:auto;" 
        infinite-scroll-immediate="false"
        v-loading="waitLoading"
        v-show="data.policyData.length > 0"
        >
           <div class="receipt-per" v-for="(item,index) in data.policyData" :key="index">
               <div :data-index=index+1 :class="['infinite-list-top', dataExpandList[index]?'':'infinite-list-top-radius']">
                <p class="insured-unit receipt-reative"><span>投保单位：</span><span>{{item.insuredUnit}}</span></p>
                <p class="receipt-reative">投保人：{{item.applicant}} </p>
                <p class="receipt-reative">未回执(<span v-show="currentReceiptButton !=3">{{ReceiptButtonFont[currentReceiptButton]}}/</span>总件数)：<span v-show="currentReceiptButton !=3 ">{{item.amount}}/</span>{{item.quantum}}</p>
                <button class="star-button" @click="topping(index,item.cardId,item.insuredUnit,item.applicant,item.jobno)"><i :class="[item.sticky == '1'?'el-icon-star-on el-icon-star-off-style':'el-icon-star-off']"></i><br/>{{item.sticky == '1'?'已置顶':'置顶'}}</button>
                <div class="add-button-box">
                    <p class="generate-notification"><button @click="goReceiptNotice(item.sourceFlag,index)">生成通知 <i class="el-icon-arrow-right"></i></button></p> 
                    <p class="expandList"><button @click="dataExpandButton(index,item.applicant,item.cardId,item.insuredUnit)">{{dataExpandList[index]?'收起':'展开'}}回执列表</button></p>
                </div>
               </div>
               <div v-if="dataExpandList[index]" class="infinite-expand-list">
                   <el-timeline>
                        <el-timeline-item v-for="(itemList,listIndex) in item.policyList" :key="listIndex" 
                        :timestamp=itemList.writeOffPeriod
                        placement="top">
                            <el-card>
                                <p>承保日期：{{itemList.underwritingDate}}</p>
                                <p>回销期限：{{itemList.writeOffPeriod}}</p>
                                <p>被保险人：{{itemList.assured}}</p>
                                <p>个单保单号：{{itemList.policyNo}}</p>
                                <p>主险名称：{{itemList.mainInsurance}}</p>
                                <p>出单工号：{{itemList.workOrderNo}}</p>
                                <p>代理机构：{{itemList.agency == "NULL" || itemList.agency == null?'':itemList.agency}}</p>
                                <p :class="[itemList.policyState=='已超期'?'policy-past':(itemList.policyState=='本月到期'?'policy-this':'policy-next'),'policy']">{{itemList.policyState}}</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>
           </div>
           <p v-if="!data.isNextPage" class="end-tip">----------------数据就到这里了----------------</p>
           <div 
            v-loading="dataLoading"
            element-loading-text="数据正在加载中..."
            :element-loading-spinner="svg"
            class="data-loading"
            element-loading-svg-view-box="-10, -10, 20, 20"
            style="width: 100%"
            v-if="data.isNextPage && isLoadingSuccess">
           </div>
        </div>
        <!-- 没有结果 -->
        <div v-if="data.policyData.length == 0 && isLoadingSuccess">
            <el-empty :image-size="200"></el-empty>
        </div>
        <!-- 在加载中 -->
        <div v-loading.fullscreen.lock="!isLoadingSuccess" class="full-screen"></div>
        <!-- 回执规则弹框 -->
        <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        width="100%"
        class="centerDialog-visible">
        <span>回执回销规则（T月承保）：<br/>T月或T+1月回执回销：正常发放提奖；<br/>T+2月回执回销：不发提奖，不做扣罚；<br/>T+3月及以上回执回销：不发提奖，需扣罚50元/单。</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="centerDialogVisible = false">已 了 解</el-button>
        </span>
        </el-dialog>
        <!-- 返回首页 -->
        <BackHome />
    </div>
</template>

<script>
// import infiniteScroll from 'vue-infinite-scroll'
import receiptApi from '@/api/api'
import BackHome from '@/components/BackHome.vue'
export default {
    name: 'receipt',
    components: { BackHome },
    // directives: {infiniteScroll},
    data(){
        return{
            // 弹窗
            centerDialogVisible: false,
            // 是否加载完成
            isLoadingSuccess: false,
            homeTop : 0,
            // 当前的按钮所处的
            currentReceiptButton:1,
            ReceiptButtonFont:['下月到期','本月到期','已超期'],
            // 状态: all:全部,past:已超期,now:本月到期,future:下月到期
            ReceiptButtonFontGet:['future','now','past','all'],
            // 当前选项卡统计数据
            ReceiptButtonFontGetData:['policyNextMonthTotal','policyThisMonthTotal','policyPastTotal','policyTotal'],
            // 投保人统计数据
            insureReceiptGetData:['insureNextMonthTotal','insureThisMonthTotal','insurePastTotal','insureTotal'],
            // 截止日期
            receiptDealineTime:'',
            // 提示框内容
            promptContent:[
                {icon:'', content:'近期承保的业务，请于下月底前完成回执回销。'},
                {icon:'', content:'请于本月底前完成回执回销。<br/>逾期未回销的，业务提奖将不再发放，并按《基本法》进行每月扣罚。'},
                {icon:'', content:'回执期限已过，业务提奖将不再发放，并按《基本法》进行每月扣罚，完成回执回销即可停止扣罚。'}
            ],
            dataTopList:{
                flag: false
            },
            data:{
                currentPage:1, // 当前页
                isNextPage: false, // 是否有下一页
                policyData:[]
            },
            // 无限滚动
            busy: false, // 无限加载是否禁用
            dataExpandList:[], //展开列表的数组
            dataExpandNumber:null, // 展开列表的number数

            // 搜索部分需要的
            selectStart:false,// 是否开始搜索
            triggerfocus:true, // 是否需要提示
            searchContent:'', // 搜索填写的内容
            selectLabel:'1',// 当前搜索的范围
            results: [],
            // 投保单位
            unitArray:[],
            // 出单工号
            ChudanNameArray:[],
            //产品类型
            RiskTypeArray:[],
            // 数据界面的loading
            waitLoading: false,

            // 页面一次加载的条数
            pageSizePer: 10,

            // 数据加载时的动画
            dataLoading: true,
            svg: `
                <path class="path" d="
                M 30 15
                L 28 17
                M 25.61 25.61
                A 15 15, 0, 0, 1, 15 30
                A 15 15, 0, 1, 1, 27.99 7.5
                L 15 15
                "style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
            `,
        }
    },
    created () {
        console.log('我是created')
    },
    mounted () {
        console.log('我是mounted');
        this.selectReceiptTime();// 查询数据截止日期
        this.selectCount();// 查询当前选项卡的回执单数据
        this.selectPolicyList();// 查询当前选项卡的投保列表
        this.selectUnit(); // 搜索系列-搜索单位
        this.selectChudanName(); // 搜索系列-出单工号
        this.selectRiskType(); // 搜索系列-出单工号
    },
    methods: {
        // 查询当前选项卡的投保列表
        selectPolicyList (pageNumber=1,params) {
            // chudanName 出单工号 
            // insuredName 被保人姓名  insurerName 投保人姓名
            // insuredUnit 投保单位 personPolicyNo 个单号
            let _this = this;
            params = params || {}
            console.log('查询当前选项卡的投保列表'+ JSON.stringify(params))
            params.policyState = this.ReceiptButtonFontGet[this.currentReceiptButton];
            params.pageSize = _this.pageSizePer;
            params.pageNumber = pageNumber;
            console.log(params)
            receiptApi.receipt.receiptReceiptByPag(params).then(respone => {
                this.busy = false;
               console.log(respone)
               this.waitLoading = false;
               this.isLoadingSuccess = true;
               if(respone.code == 200){ 
                    if(respone.data.hasNextPage){//还有下一页
                        _this.data.currentPage = Number(respone.data.pageNum) + 1;
                    }
                    _this.data.isNextPage = respone.data.hasNextPage;
                    _this.addData(respone.data)
                    console.log('_this.data.isNextPage: '+ _this.data.isNextPage + _this.data.currentPage)
               }else{

               }
           }).catch(error => {
               this.busy = false;
               this.waitLoading = false;
               console.log(error)
           })
        },
        // 查询当前选项卡的回执单数据-统计数据
        selectCount (params){
            // chudanName 出单工号 
            // insuredName 被保人姓名  insurerName 投保人姓名
            // insuredUnit 投保单位 personPolicyNo 个单号
            params = params || {}
            console.log('查询当前选项卡的回执单数据-统计数据'+ JSON.stringify(params))
            params.policyState = this.ReceiptButtonFontGet[this.currentReceiptButton];
            console.log(params)
            receiptApi.receipt.receiptReceiptCount(params).then(respone => {
               console.log(respone)
               if(respone.code == 200){
                this.dataTopList = respone.data
               }else{

               }
               this.dataTopList.flag = true
           }).catch(error => {
               console.log(error)
           })
        },
        // 查询数据截止日期
        selectReceiptTime(){
           receiptApi.receipt.receiptReceiptTime().then(respone => {
               console.log(respone)
               if(respone.code == 200){
                   this.receiptDealineTime = ((respone.data).split(' '))[0];
               }else{
                   this.receiptDealineTime = '暂无数据'
               }
           }).catch(error => {
               console.log(error)
           })
        },
        // 添加数据
        addData (dataList) {
            console.log('加载中数据。。。')
            // this.data.policyData.push((JSON.parse(JSON.stringify(dataList.list))));
            let _this = this;
            (JSON.parse(JSON.stringify(dataList.list))).forEach(element => {
                _this.data.policyData.push(element)
            });
            for (let i = 0; i < dataList.list.length; i++) {
                this.dataExpandList.push(false);
            }
            console.log(_this.data)
        },
        //   切换按钮
        switchReceipt(receipt){
            this.currentReceiptButton = receipt;
            // 0-下月到期 1-本月到期  2-已超期  3-全部
            this.data.policyData = [];
            this.data.currentPage = 1;
            this.dataExpandList = [];
            // 在搜索的情况下切换TAB
            let params = {}
            this.busy = true;
            if(this.selectStart){ // 搜索
                if(this.selectLabel == 1){
                    params = {insurerName: this.searchContent}
                }else if(this.selectLabel == 2){
                    params = {insuredName: this.searchContent}
                }else if(this.selectLabel == 3){
                    params = {chudanName: this.searchContent}
                }else if(this.selectLabel == 4){
                    params = {insuredUnit: this.searchContent}
                }else if(this.selectLabel == 5){
                    params = {personPolicyNo: this.searchContent}
                }else if(this.selectLabel == 6){
                    params = {riskType: this.searchContent}
                }
                this.isLoadingSuccess = !this.isLoadingSuccess;
                this.selectPolicyList(1,params);
                this.selectCount(params);
            }else{
                this.isLoadingSuccess = !this.isLoadingSuccess;
                this.selectPolicyList();
                this.selectCount();
            }
            console.log('切换按钮。。。')
            // document.getElementById('infiniteList').scrollTop =  0;
        },
        // 展开列表
        dataExpandButton(expandNumber,applicant,cardId,insuredUnit,pageNumber=1,pageSize=50){
            console.log(expandNumber)
            let params = {applicant:applicant,cardId:cardId,insuredUnit:insuredUnit,pageNumber:pageNumber,pageSize:pageSize}
            receiptApi.receipt.receiptReceiptPolicyByPage(params).then(respone => {
               console.log(respone)
               if(respone.code == 200){ 
                  this.data.policyData[expandNumber].policyList = respone.data.list;
               }else{

               }
               if(this.dataExpandList[expandNumber]){
                    this.dataExpandList.splice(expandNumber,1,false)
                    this.dataExpandNumber = null
                }else{
                    if(this.dataExpandNumber != null ){
                        this.dataExpandList.splice(this.dataExpandNumber,1,false)
                    }
                    this.dataExpandNumber = expandNumber;
                    this.dataExpandList.splice(expandNumber,1,true);
                }
            }).catch(error => {

            })
            
            console.log(this.data);
        },
        // 显示搜索页
        findReceipt(){
            // this.$router.push({path:'/view/receiptFind'})
            this.searchContent = '';
            this.selectStart = !this.selectStart;
            if(!this.selectStart){ // 非搜索的情况下
            // 0-下月到期 1-本月到期  2-已超期  3-全部
                this.waitLoading = true;
                this.data.policyData = [];
                this.data.currentPage = 1;
                this.dataExpandList = [];
                this.busy = true;
                this.isLoadingSuccess = !this.isLoadingSuccess;
                this.selectPolicyList();
                this.selectCount ()
            }
        },
        // 置顶
        topping(ToppingNumber,cardId,insuredUnit,applicant,jobno){
            console.log(ToppingNumber)
            // 置顶请求
            // "flag": 0,
	        // "insureId": "",
	        // "insuredUnit": "",
	        // "insurerName": "",
	        // "jobno": ""
            let params = {
                flag:this.data.policyData[ToppingNumber].sticky=="1"?"0":"1",
                insureId:cardId,
                insuredUnit:insuredUnit,
                insurerName:applicant,
                jobno:jobno
            }
            console.log(params)
            receiptApi.receipt.receiptReceiptTopOrCancel(params).then(respone => {
                console.log("我就是置顶的，纠纠结结")
                console.log(respone)
                if(respone.code == 200){
                    this.data.policyData[ToppingNumber].sticky = this.data.policyData[ToppingNumber].sticky=="1"?"0":"1";
                    // 假装已经置顶了
                   if(this.data.policyData[ToppingNumber].sticky == 1){
                       let temp = JSON.parse(JSON.stringify(this.data.policyData[ToppingNumber]))
                        console.log(temp)
                        this.data.policyData.splice(ToppingNumber,1);
                        this.data.policyData.unshift(temp);
                   }
                }else{
                    // 报错了
                }
            }).catch(error => {
                console.log("我就是置顶的，纠纠结结")
                console.log(error)
            })
            
            
        },
        // 无限加载
        loadMore(){
            console.log("我在这")
            console.log('this.data.isNextPage:'+this.data.isNextPage)
            if(this.data.isNextPage){
                this.busy = true;
                // 投保人-insurerName- 1 被保险人-insuredName-2  出单工号-chudanName-3
                // 投保单位-insuredUnit-4  个单号-personPolicyNo-5
                let params = {}
                console.log(this.data.currentPage)
                if(this.selectStart){ // 搜索
                    if(this.selectLabel == 1){
                        params = {insurerName: this.searchContent}
                    }else if(this.selectLabel == 2){
                        params = {insuredName: this.searchContent}
                    }else if(this.selectLabel == 3){
                        params = {chudanName: this.searchContent}
                    }else if(this.selectLabel == 4){
                        params = {insuredUnit: this.searchContent}
                    }else if(this.selectLabel == 5){
                        params = {personPolicyNo: this.searchContent}
                    }else if(this.selectLabel == 6){
                         params = {riskType: this.searchContent}
                    }
                    this.selectPolicyList(this.data.currentPage,params);
                }else{
                    console.log("我啥都没做就执行了")
                    this.selectPolicyList(this.data.currentPage);
                }
            }
        },
        // 去生成通知
        goReceiptNotice(sourceFlag,index){
            if(sourceFlag == 1){ //仅商城
                this.$router.push({path:'/view/receiptNotice',query:{
                    index: index,
                    allData: JSON.stringify(this.data.policyData[index]),
                    ReceiptButtonFont: this.ReceiptButtonFontGet[this.currentReceiptButton]
                    }
                })
            }else if(sourceFlag == 2){ // 仅弹性平台
                this.$alert('以上均为弹性平台保单（不支持微回执，建议纸质回执/邮箱回执），无法生成微回执通知。', '温馨提示', {
                    confirmButtonText: '好的，我知道了',
                    callback: action => {}
                });
            }else if(sourceFlag == 3){ // 混搭
                this.$confirm('包含弹性平台保单（不支持微回执，建议纸质回执/邮箱回执），是否继续针对商城保单生成微回执通知？', '提示', {
                    confirmButtonText: '是，继续生成',
                    cancelButtonText: '否，返回',
                    }).then(() => {
                        this.$router.push({path:'/view/receiptNotice',query:{
                            index: index,
                            allData: JSON.stringify(this.data.policyData[index]),
                            ReceiptButtonFont: this.ReceiptButtonFontGet[this.currentReceiptButton]
                            }
                        })
                    }).catch(() => {
                            
                    });
            }
            
        },

        // ----------搜索必须的部分---------
        // searchOption 触发搜索
        searchOption(){
            // 在搜索的情况下切换TAB
            let params = {}
            this.busy = true;
            if(this.selectStart){ // 搜索
                if(this.selectLabel == 1){
                    params = {insurerName: this.searchContent}
                }else if(this.selectLabel == 2){
                    params = {insuredName: this.searchContent}
                }else if(this.selectLabel == 3){
                    params = {chudanName: this.searchContent}
                }else if(this.selectLabel == 4){
                    params = {insuredUnit: this.searchContent}
                }else if(this.selectLabel == 5){
                    params = {personPolicyNo: this.searchContent}
                }else if(this.selectLabel == 6){
                    params = {riskType: this.searchContent}
                }
                if(this.searchContent != ''){
                    this.waitLoading = true;
                     // 0-下月到期 1-本月到期  2-已超期  3-全部
                    this.data.policyData = [];
                    this.dataExpandList = [];
                    this.isLoadingSuccess = !this.isLoadingSuccess;
                    this.selectPolicyList(1,params);
                    this.selectCount(params);
                }else{
                    this.$message.error('搜索值不能为空哦~');
                }
            }else{
                this.waitLoading = true;
                this.isLoadingSuccess = !this.isLoadingSuccess;
                this.selectPolicyList();
                this.selectCount();
            }
            console.log('搜索按钮。。。')
            // document.getElementById('infiniteList').scrollTop =  0;
        },
        // 改变搜索范围
        changeOption(string){
            this.results = [];
            this.searchContent = '';
            if(string == 4){ // 投保单位
                this.results = this.unitArray;
            } else if(string == 3){ // 出单工号
                this.results = this.ChudanNameArray;
            }else if(string == 6){ // 产品类型
                this.results = this.RiskTypeArray;
            }
        },
        // 选择了value
        handleSelect(item) {
            // this.$refs.elautocomplete.handleBlur()
            console.log(item);
            this.searchOption()
        },
        // 投保单位下拉
        selectUnit(){
            receiptApi.receipt.receiptInsuredUnit().then(respone => {
               console.log(respone)
               if(respone.code == 200){
                respone.data.forEach(element => {
                   this.unitArray.push({"value": element})
                });
               }else{

               }
               console.log(this.unitArray)
           }).catch(error => {
               console.log(error)
           })
        },
        // 出单工号下拉
        selectChudanName(){
            receiptApi.receipt.receiptChudanName().then(respone => {
               console.log(respone)
               if(respone.code == 200){
                respone.data.forEach(element => {
                   this.ChudanNameArray.push({"value": element})
                });
               }else{

               }
               console.log(this.ChudanNameArray)
            }).catch(error => {
               console.log(error)
            })
        },
        // 产品类型下拉
        selectRiskType(){
            receiptApi.receipt.receiptRiskType().then(respone => {
               console.log(respone)
               if(respone.code == 200){
                respone.data.forEach(element => {
                   this.RiskTypeArray.push({"value": element})
                });
               }else{

               }
               console.log(this.RiskTypeArray)
            }).catch(error => {
               console.log(error)
            })
        },
        querySearch(queryString, cb) {
            var results = this.results;
            console.log(results)
            var results = queryString ? results.filter(this.createFilter(queryString)) : results;
            // 调用 callback 返回建议列表的数据
            cb(results);
            // this.$refs.elautocomplete.handleFocus()
        },
        createFilter(queryString) {
            return (restaurant) => {
                // return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                return (restaurant.value != null?restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1:'');
            };
        },
    },
    activated(){
        // do something
        console.log('我是activated');
        console.log(document.getElementById('infiniteList')?document.getElementById('infiniteList').scrollTop = this.homeTop || 0 : '')
        document.getElementById('infiniteList')?document.getElementById('infiniteList').scrollTop = this.homeTop || 0 : '';
    },
    beforeRouteLeave(to,from,next) {
        let that = this
        if(to.name == 'receiptNotice') {//跳去搜索页面
            from.meta.keepAlive = true;
            let app = document.getElementById('infiniteList')
            that.homeTop = app.scrollTop || 0
            console.log(that.homeTop)
        }else{
            from.meta.keepAlive = false;
        }
        console.log(from)
        next()
    }
}
</script>

<style lang="scss" scoped>
.receipt-page {
    font-size: 12px;
    padding: 5px 15px 10px 15px;
    p{
         margin: 0;
    }
    .receipt-classification{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        justify-content: space-between;
        margin-top: 5px;
        button{
            font-size: 13px;
            border: none;
            // padding: 5px 4px;
            padding: 5px 8px;
            // margin-left: 4px;
            box-sizing: border-box;
            background: #fff;
            font-weight: 700;
            position: relative;
            border-radius: 50px;
            &:last-child{
                border-radius: 50px;
                background-color: rgb(239, 239, 239);
                font-weight: 400;
                min-width: 70px;
            }
        }
        .active{
            // -webkit-line-clamp: 2;
            // background-image: -webkit-linear-gradient(right, rgb(252, 174, 7),rgb(250, 217, 110));
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
            background: #fcae07;
            border-radius: 50px;
            color: white;
            &::after{
                /*半圆弧*/
                // content: '';
                position: absolute;
                right: -5px;
                bottom: 2px;
                width: 12px;
                height: 4px;
                background-color: transparent;
                border-bottom-right-radius: 50px;
                border-bottom-left-radius: 50px;/*增加了边框，圆角半径也要变化*/
                border-left: 2px solid #fcd572;/*边框左边线*/
                border-right: 2px solid #fcd572;/*边框右边线*/
                border-bottom: 3px solid #fcd572;/*边框底边线*/
                transform: rotate(315deg);
            }
        }
    }
    .receipt-deadline{
        text-align: right;
        padding-bottom: 5px;
    }
    .receipt-tip{
        padding: 2px 15px;
        border: 1px dotted #FF9800;
        border-radius: 8px;
        margin-top: 10px;
        p{
            padding: 5px;
            text-align: left;
        }
    }
    .receipt-show{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 8px;
        span{
            b{
                font-size: 16px;
            }
        }
    }
    .receipt-per{
        text-align: left;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        position: relative;
        // background: linear-gradient(0deg, #fff, #fcc13e);
        height: auto;
        &:not(:first-child){
            margin-top: 18px;
        }
        .generate-notification{
            text-align: right;
            // position: relative;
            // display: inline-block;
            float: right;
            &::before{
                content: '';
                // width: 122px;
                width: 90px;
                height: 26px;
                background: #fff;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                // transform: perspective(10px) rotateX(6deg);
                transform: perspective(10px) rotateX(7deg);
                position: absolute;
                // right: -60px;
                right: 0px;
                bottom: -1px;
                box-shadow: 1px 1px 0px 1px #f2e6dd inset;
                z-index: 99;
            }
            button{
                position: relative;
                border: none;
                background: none;
                color: #FF9800;
                z-index: 99;
                line-height: 30px;
                font-size: 12px;
                height: 30px;
            }
        }
    }
    .infinite-list{
        font-size: 13px;
        margin-top: 2vh;
        height: calc(100vh - 22vh);
    }
    .infinite-list-three{
        font-size: 13px;
        margin-top: 2vh;
        height: calc(100vh - 20vh);
    }
    .infinite-expand-list{
        box-shadow: 0px 1px 5px 0px #f5f5f5, -1px 0px 5px 0px #f5f5f5;
        margin: 0 2px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    
    .infinite-list-top{
        position: relative;
        // background: lavender;
        line-height: 18px;
        padding: 5px 10px 0px 10px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        // background: linear-gradient(0deg, #f3e3c1, #fcc13e);
        background: linear-gradient(270deg,#f4bd87,#f47861);
        overflow: hidden;
        .add-button-box{
            height: 4vh;
            position: relative;
        }
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
            font-size: 65px;
            right: 25px;
            top: 40px;
            z-index: 10;
            opacity: 0.17;
            color: #5a0202;
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
                padding: 2px;
            }
            .el-icon-star-off-style{
                font-size: 16px;
                color: #12286F;
                background: #fff;
                border-radius: 3px;
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
        .receipt-reative{
            position: relative;
            color: #fff;
        }
    }
    .infinite-list-top-radius{
        border-radius: 8px;
    }
    .infinite-list-top>p{
        line-height: 21px;
    }
    .expandList{
        // text-align: center;
        // position: absolute;
        // left: 53%;
        // bottom: -1px;
        // z-index: 999;
        // font-size: 12px;
        // transform: translateX(-50%);
        // border: none;
        // line-height: 40px;
        float: right;
        &::before{
            content: '';
            width: 100px;
            height: 26px;
            background: #fff;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            transform: perspective(10px) rotateX(6deg);
            position: absolute;
            right: 110px;
            bottom: -1px;
            box-shadow: 1px 1px 0px 1px #f2e6dd inset;
            z-index: 0;
        }
        button{
            height: 30px;
            line-height: 30px;
            border: none;
            padding: 3px 0;
            border-radius: 30px;
            font-size: 12px;
            width: 90px;
            background:inherit;
            color: #FF9800;
            position: absolute;
            right: 115px;
        
        }
    }
    .el-card__body{
        p{
            line-height: 18px;
            font-size: 13px;
        }
    }
    .end-tip{
        text-align: center;
        padding: 15px 0 5px 0;
        color: #9b9b9b;
    }
    .rule{
        color:#007eff;
        background: none;
        border:none;
        font-size: 12px;
    }
}
</style>

<style lang="scss">
.receipt-page{
    .el-input__inner,.el-input-group__prepend div.el-select .el-input__inner{
        height: 37px;
        line-height:37px;
        overflow: hidden;
    }
    .el-timeline{
        padding: 8px 5px;
    }
    .el-timeline-item{
        padding-bottom: 12px
    }
    .el-card__body{
        padding: 5px 8px;
        position: relative;
        .policy{
            position: absolute;
            right: 0;
            top: 0;
            padding: 2px 5px;
            color: #fff;
            border-bottom-left-radius: 5px;
        }
        .policy-past{
            background: red;
        }
        .policy-next{
            background: rgb(0, 119, 255);
        }
        .policy-this{
            background: rgb(255, 196, 0);
        }
    }
    .el-card.is-always-shadow{
        box-shadow: none;
        -webkit-box-shadow:none
    }
    .el-timeline-item__wrapper{
        padding-left: 20px;
    }

    .el-autocomplete{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        margin-top: 15px;
        overflow: hidden;
    }
    .el-input-group__prepend{
        width: 30%;
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
    }
    .el-input-group__append {
        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;
    }
    .centerDialog-visible{
        .el-dialog{
            position: fixed;
            bottom: 0;
            margin-bottom: 0;
        }
        
    }
    .el-dialog__body{
        height: 20vh;
        text-align: left;
        line-height: 25px;
    }
}
.data-loading{
    height: 2vh;
    .el-loading-spinner{
        margin-top: 0px;
    }
    .el-loading-text{
        display: inline-block;
        vertical-align: top;
        margin-left: 20px;
    }
    .el-loading-spinner .circular{
        width: 30px;
        height: 30px;
        display: inline-block;
    }
}
.el-message-box{
    width: 90%;
    box-sizing: border-box;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.el-loading-mask.is-fullscreen{
    background-color: rgba(255,255,255,0) !important;
}
</style>