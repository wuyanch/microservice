<template>
    <div class="renewal-page">
        <p v-if="fromUrl == 'OTO5G'" class="serve-name">
            <el-button @click="goPre" class="go-pre"><i class="el-icon-back"></i> 返回上一页</el-button>
            {{serveName}} 的续期待办
        </p> 
        <!-- 头部 -->
        <p class="renewal-deadline">数据截止时间：{{renewalDealineTime}} <button class="rule" @click="commonProblem = true"><i class="el-icon-question"></i> 常见问题</button></p>
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
                <el-option label="交费人" value="1"></el-option>
                <el-option label="被保险人" value="2"></el-option>
                <el-option label="投保单位" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchOption"></el-button>
        </el-autocomplete> 
        <div class="renewal-classification">
            <button @click="switchRenewalTpye(0)" :class="[currentRenewalButton== 0?'active':'']">即将交费<span>{{renewalCalc.soonPayCount}}</span></button>
            <button @click="switchRenewalTpye(1)" :class="[currentRenewalButton== 1?'active':'']">到期交费<span>{{renewalCalc.duePayCount+renewalCalc.soonExpireCount}}</span></button>
            <button @click="switchRenewalTpye(2)" :class="[currentRenewalButton== 2?'active':'']">即将失效<span>{{renewalCalc.soonExpireCount}}</span></button>
            <button :class="[selectStart?'el-icon-close select-close':'el-icon-search']" @click="findRenewal">{{selectStart?'取消筛选':'筛选'}}</button>
        </div>
        <!-- 数据展示区 -->
         <!-- 提示框 -->
        <!-- <div class="renewal-tip" v-if="currentRenewalButton != 3 && !selectStart">
            <p>
               <span v-html=promptContent[currentRenewalButton].content></span>
            </p>
        </div> -->
        <div class="renewal-show" v-if="dataTopList.flag">
            <span><b>{{dataTopList.paymanCount}}</b><br>缴费人(人)</span>
            <span><b>{{dataTopList.totalNumberCount}}</b><br>总件数(件)</span>
        </div>
        <!-- 内容展示 -->
        <!-- :class="[selectStart?'infinite-list-three':'infinite-list' -->
        <div
        :class="[fromUrl == 'OTO5G'?'infinite-serve':'infinite-list-three']"
        id="infiniteList"
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="busy" 
        infinite-scroll-distance="150" 
        style="overflow-y:auto;" 
        infinite-scroll-immediate="false"
        v-loading="waitLoading"
        v-show="data.policyData.length > 0"
        >
           <div class="renewal-per" v-for="(item,index) in data.policyData" :key="index">
               <div class="renewal-per-box" v-if="item.pageVo != null">
                   <!-- 生成通知 -->
                   <div class="notice-button">
                       <el-button class="create-notice" @click="goReceiptNotice(index)"><span><img src="@a/renewal/notice.png" alt="" srcset=""> 生成通知</span></el-button>
                   </div>
                   <div :data-index=index+1 class="infinite-list-top renewal-per-card-top">
                        <p class="insured-unit renewal-reative"><span>投保单位</span>：<span>{{item.insuredunit}}</span></p>
                        <p class="renewal-reative"><span>投保人：<b>{{item.payman}}</b></span><span>部门：{{item.department}}</span></p>
                        <p class="renewal-reative"><span>保单件数(件)：{{item.policyCount}}</span><span class="mony-show">保费合计(元)：<b>{{Number(item.paypremiumCount).toFixed(2)}}</b></span></p>
                    </div>
                    <div>
                        <div class="renewal-per-card-all" v-show="!dataExpandList[index]">
                            <div class="renewal-per-card-content">
                                <p><span>被保险人：<b>{{item.pageVo[0].insuredName}}</b></span><span class="mony-show">应交金额：<b>{{Number(item.pageVo[0].paypremium).toFixed(2)}}</b></span></p>
                                <p><span>应交日期：{{item.pageVo[0].paydate | calcTime}} </span><span v-if="item.pageVo[0].paytype != 1">扣费结果：{{item.pageVo[0].transferresult == null || item.pageVo[0].transferresult == ''?'暂无':item.pageVo[0].transferresult}} </span></p>
                                <p v-if="showTime(item.pageVo[0].paydate)">最后交费日：{{item.pageVo[0].lastpaydate | calcTime}}</p>
                            </div>
                        </div>
                        <div class="renewal-per-card-all" v-show="dataExpandList[index]">
                            <div class="renewal-per-card-content" v-for="(itemPageVo,indexPageVo) in item.pageVo" :key="indexPageVo">
                                <p><span>被保险人：<b>{{itemPageVo.insuredName}}</b></span><span class="mony-show">应交金额：<b>{{Number(itemPageVo.paypremium).toFixed(2)}}</b></span></p>
                                <p><span>应交日期：{{ itemPageVo.paydate | calcTime}} </span><span v-if="itemPageVo.paytype != 1">扣费结果：{{itemPageVo.transferresult == null || itemPageVo.transferresult == ''?'暂无':itemPageVo.transferresult}} </span></p>
                                <p v-if="showTime(itemPageVo.paydate)">最后交费日：{{itemPageVo.lastpaydate | calcTime}}</p>
                                <p>缴费账户：{{itemPageVo.payaccount}}</p>
                                <p>保单号：{{itemPageVo.personPolicyNo}}  </p>
                                <p>保障生效日期：{{itemPageVo.mstartdate | calcTime}} </p>
                                <p>主险名称：{{itemPageVo.mriskname}} </p>
                                <p>主险保额：{{itemPageVo.minsureAmount}}</p>
                                <p :class="[itemPageVo.paytype=='3'?'policy-past':(itemPageVo.paytype=='2'?'policy-this':'policy-next'),'policy']">{{promptContent[itemPageVo.paytype-1].type}}</p>
                            </div>
                        </div>
                        <div class="renewal-per-card-show">
                            <el-button @click='lookAll(index)'>{{dataExpandList[index]?'收起列表':'展开列表'}}  <i :class="dataExpandList[index]?'el-icon-arrow-up':'el-icon-arrow-down'"></i> </el-button>
                        </div>
                    </div>
               </div>
           </div>
           <p v-if="!data.isNextPage" class="end-tip">----------------数据就到这里了----------------</p>
           <div 
            v-loading="dataLoading"
            element-loading-text="数据正在加载中..."
            class="data-loading loading-css"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255,255,255, 0.8)"
            style="width: 100%"
            v-if="data.isNextPage && isLoadingSuccess"
            >
           </div>
        </div>
        <!-- 没有结果 -->
        <div v-if="data.policyData.length == 0 && isLoadingSuccess">
            <el-empty :image-size="200"></el-empty>
        </div>
        <!-- 在加载中 -->
        <div v-loading.fullscreen.lock="!isLoadingSuccess" class="full-screen"></div>

        <!-- 生成通知弹窗 -->
        <el-dialog
        title="通知"
        :visible.sync="centerDialogVisible"
        width="100%"
        center>
        <span v-html=copyContent></span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="textCopy(copyContentBR,$event),centerDialogVisible = false">一 键 复 制</el-button>
        </span>
        </el-dialog>

        <!-- 常见问题弹框 -->
        <el-dialog
        title="常见问题"
        :visible.sync="commonProblem"
        width="100%"
        center>
        <div class="common-problem">
            <div>
                <p class="common-problem-part-title">1、名词释义：</p>
                即将交费：距离应交日期小于等于15天的保单客户。
                <br>到期交费：已到应交期，在60天宽限期内尚未交费成功的保单客户（说明：含“即将失效”的数据。）
                <br>即将失效：距离【最后缴费日】小于等于15天的保单客户。
            </div>
            <div>
                <p class="common-problem-part-title">2、数据更新规则：</p>
                客户所属服务经理：T+2更新
                <br>（即：在5G系统变更客户所属“服务经理”后，【续期待办】清单会在第3天进行同步“服务经理”信息。）
                <br>续收状态：T+1更新
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="commonProblem = false">关 闭</el-button>
        </span>
        </el-dialog>
        <!-- 返回首页 -->
        <back-home></back-home>
    </div>
</template>

<script>
import BackHome from '../../components/BackHome'
import renewalApi from '@/api/api'
import copyText from '@/js/clipboard'
export default {
    name:'renewal',
    components: { BackHome },
    data(){
        return{
            commonProblem:false,// 常见问题显示
            centerDialogVisible:false,//控制生成通知显示
            renewalDealineTime:null, // 截止时间
            currentRenewalButton:0,//当前所处的选项卡
            renewalButtonFontGet:[1,2,3],
            renewalCalc:{},//统计数
            selectStartLastButton:0,//是否筛选前的选项卡
            searchContent: null, // 筛选
            selectLabel:"1", //筛选下拉
            unitArray:[], //投保单位下来
            results:[],//模糊搜索数组
            selectStart:false,//是否筛选中。。。
            triggerfocus:true, // 是否需要提示
             // 提示框内容
            promptContent:[
                {type:'即将交费', content:'距离应交日期小于等于15天的保单客户。'},
                {type:'到期交费', content:'已到应交期，在60天宽限期内尚未交费成功的保单客户（说明：含“即将失效”的数据。）'},
                {type:'即将失效', content:'距离【最后缴费日】小于等于15天的保单客户。'}
            ],
            waitLoading:false,//等待加载
            isLoadingSuccess:false,//是否已加载成功
            dataTopList:{
                flag: false
            },
            data:{
                currentPage:1, // 当前页
                isNextPage: false, // 是否有下一页
                policyData:[]
            },
            // 数据加载时的动画
            dataLoading: true,
            // 无限滚动
            busy: false, // 无限加载是否禁用
            dataExpandList:[], //展开列表的数组
            dataExpandNumber:null, // 展开列表的number数
            tkNumber:'', // TK工号
            projectName:null, // 5G项目
            projectIdentity:null,// 当前登录人的身份
            pageSizePer:20, // 每次请求的条数
            fromUrl:null,
            serveName:null || this.$route.query.agentName || '我',
            copyContent:null,// 通知文档复制
            copyContentBR: null,// 通知文档复制<br>->\r\n
        }
    },
    created(){
        this.tkNumber = this.$route.query.tknumber ?? ''; // 空值合并运算
        this.projectName = this.$ls.get('projectName'), // 当前项目
        this.projectIdentity = this.$ls.get('projectIdentity'), // 当前用户项目身份
        this.fromUrl = this.$ls.get('from')
        this.selectRenewalTime() // 截止时间
        this.selectCount() // 统计
        this.selectUnit() // 投保单位
        this.calcTypeNumber() //统计所有分类的数目
        this.selectPolicyList() //首次获取保单列表
    },
    methods:{
         // 查询当前选项卡的投保列表
        selectPolicyList (pageNumber=1,params) {
            let _this = this;
            params = params ||  {payman:null,insuredName:null,insuredunit:null,tknumber:this.tkNumber,userIdentity:this.projectIdentity,projectName: this.projectName}
            params.payType = this.renewalButtonFontGet[this.currentRenewalButton];
            params.pageSize = _this.pageSizePer;
            params.pageNumber = pageNumber;
             console.log('查询当前选项卡的投保列表'+ JSON.stringify(params))
            renewalApi.renewal.renewalAllPage(params).then(respone => {
               _this.busy = false;
               console.log(respone)
               _this.waitLoading = false;
               _this.isLoadingSuccess = true;
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
               this.isLoadingSuccess = true,//是否已加载成功
               this.$alert(error||'已超时，请刷新页面', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {}).catch(() => {});
           })
        },
        // 查询当前选项卡的续期-统计数据
        selectCount (params){
            // payType 状态: 1:即将交费,2:到期交费,3:即将失效 payman 交费人  insuredName 投保人姓名
            // userIdentity 用户身份,main_attacker主攻手、assistant_main_attacker助理主攻手
            // insuredunit 投保单位  tknumber
            params = params || {payman:null,insuredName:null,insuredunit:null,tknumber:this.tkNumber,userIdentity:this.projectIdentity,projectName: this.projectName}
            console.log('查询当前选项卡的续期-统计数据'+ JSON.stringify(params))
            params.payType = Number(this.renewalButtonFontGet[this.currentRenewalButton]);
            console.log(params)
            renewalApi.renewal.renewalCount(params).then(respone => {
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
        // 查询数据截止日期--已对
        selectRenewalTime(){
            renewalApi.renewal.renewalRenewTime().then(respone => {
               console.log(respone)
               if(respone.code == 200){
                   this.renewalDealineTime = respone.data;
               }else{
                   this.renewalDealineTime = '暂无数据'
               }
           }).catch(error => {
               console.log(error)
           })
        },
        // 添加数据
        addData (dataList) {
            console.log('加载中数据。。。')
            let _this = this;
            (JSON.parse(JSON.stringify(dataList.list))).forEach(element => {
                _this.data.policyData.push(element)
            });
            for (let i = 0; i < dataList.list.length; i++) {
                this.dataExpandList.push(false);
            }
            console.log(_this.data)
        },
        // 筛选--非筛选
        findRenewal(){
            this.searchContent = '';
            this.selectStart = !this.selectStart;
            if(!this.selectStart){ // 非搜索的情况下
            // 1-即将缴费 2-到期扣费  3-即将失效  
                this.waitLoading = true;
                this.data.policyData = [];
                this.data.currentPage = 1;
                this.dataExpandList = [];
                this.busy = true;
                this.isLoadingSuccess = !this.isLoadingSuccess;
                this.selectPolicyList();
                this.selectCount ();
                this.calcTypeNumber ();
            }
        },
        //   切换按钮
        switchRenewalTpye(needRenewal){
            this.currentRenewalButton = needRenewal;
            // 0-即将交费 1-到期交费  2-即将失效  
            this.data.policyData = [];
            this.data.currentPage = 1;
            this.dataExpandList = [];
            // 在搜索的情况下切换TAB
            let params = {}
            this.busy = true;
            if(this.selectStart){ // 搜索
                if(this.selectLabel == 1){
                    params = {payman: this.searchContent}
                }else if(this.selectLabel == 2){
                    params = {insuredName: this.searchContent}
                }else if(this.selectLabel == 3){
                    params = {insuredunit: this.searchContent}
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
            document.getElementById('infiniteList').scrollTop =  0;
        },
        // 展开列表
        lookAll(index,pageNumber=1,pageSize=50){
            console.log(index)
            let params = {
                    "insuredName": null,
                    "insuredunit": this.data.policyData[index].insuredunit,
                    "pageNumber": pageNumber,
                    "pageSize": pageSize,
                    "payType":this.renewalButtonFontGet[this.currentRenewalButton],
                    "payman": this.data.policyData[index].payman,
                    "tknumber": this.tkNumber,
                    "projectName": this.projectName,
                    "userIdentity":this.projectIdentity,
                    "paymanno":this.data.policyData[index].paymanno
                }
            renewalApi.renewal.renewalDetailPage(params).then(respone => {
               console.log(respone)
               if(respone.code == 200){ 
                  this.data.policyData[index].pageVo = respone.data.list;
               }else{
                    this.$alert(respone.msg, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {}).catch(() => {});
               }
               if(this.dataExpandList[index]){
                    this.dataExpandList.splice(index,1,false)
                    this.dataExpandNumber = null
                }else{
                    if(this.dataExpandNumber != null ){
                        this.dataExpandList.splice(this.dataExpandNumber,1,false)
                    }
                    this.dataExpandNumber = index;
                    this.dataExpandList.splice(index,1,true);
                }
            }).catch(error => {
                 this.$alert(error, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {}).catch(() => {});
            })
            
            console.log(this.data);
        },
        // 无限加载
        loadMore(){
            console.log("我在这")
            console.log('this.data.isNextPage:'+this.data.isNextPage)
            if(this.data.isNextPage){
                this.busy = true;
                // payType 状态: 1:即将交费,2:到期交费,3:即将失效 payman 交费人  insuredName 投保人姓名
                // userIdentity 用户身份,main_attacker主攻手、assistant_main_attacker助理主攻手
                // insuredunit 投保单位  tknumber
                let params = {}
                console.log(this.data.currentPage)
                if(this.selectStart){ // 搜索
                    if(this.selectLabel == 1){
                        params = {payman: this.searchContent}
                    }else if(this.selectLabel == 2){
                        params = {insuredName: this.searchContent}
                    }else if(this.selectLabel == 3){
                        params = {insuredunit: this.searchContent}
                    }
                    this.selectPolicyList(this.data.currentPage,params);
                }else{
                    console.log("我啥都没做就执行了")
                    this.selectPolicyList(this.data.currentPage);
                }
            }
        },
        // 去生成通知
        goReceiptNotice(index,event){
            // 请求通知内容
            let params = {
                "insuredName": "",
                "insuredunit": this.data.policyData[index].insuredunit,
                "payType": this.renewalButtonFontGet[this.currentRenewalButton],
                "payman": this.data.policyData[index].payman,
                "paymanno": this.data.policyData[index].paymanno,
                "projectName": this.projectName,
                "tknumber":this.tkNumber,
                "userIdentity": this.projectIdentity
            }
            renewalApi.renewal.renewalCreateNotify(params).then(respone => {
               console.log(respone)
               if(respone.code == 200){ 
                let policyList = this.rankPolicy(respone.data);
                let content = `尊敬的${this.data.policyData[index].payman}先生/女士：<br>感谢您对泰康养老的信赖与支持！<br>温馨提醒：您为自己或家人投保的保单又到一年一度的交费时间了，为保障您的权益，请您及时存足保费，以供扣款。具体保单信息如下，请您知悉。<br>如需协助，请及时与我联系。感谢您的支持，祝您生活愉快！
                <br><br>${policyList}`
                this.copyContent = content;
                this.copyContentBR = (content.replace(new RegExp("<br>",("gm")),"\n"))
                this.centerDialogVisible= true
               }else{
                     this.$alert(respone.msg, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {}).catch(() => {});
               }
              
            }).catch(error => {
                this.$alert(error||'已超时，请刷新页面', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {}).catch(() => {});
            })
        },
        // 复制询价单号到粘贴板
        textCopy(text,event) {
            copyText(text,event,'复制成功')
        },
        // 排好保单号
        rankPolicy(dataA){
            let policy1 ='', policy2 ='', policy3 ='';
            dataA.forEach((element) => {
                if(element.paytype == 1){
                    policy1+=`保单号：${element.personPolicyNo}<br>被保险人：${element.insuredName}<br>应交日期：${(new Date(element.paydate)).toLocaleString().split(' ')[0]}<br>应交保费：${element.paypremium}元<br>缴费账户：${element.payaccount}<br><br>`
                }
                // ${element.transferresult}，
                if(element.paytype == 2){
                    policy2+=`保单号：${element.personPolicyNo}<br>被保险人：${element.insuredName}<br>应交日期：${(new Date(element.paydate)).toLocaleString().split(' ')[0]}<br>应交保费：${element.paypremium}元<br>缴费账户：${element.payaccount}<br>
                    当前扣费结果：${element.transferwords == null || element.transferwords == ''?'暂无':element.transferwords}<br><br>`
                }
                // ${element.transferresult}，
                if(element.paytype == 3){
                    policy3+=`保单号：${element.personPolicyNo}<br>被保险人：${element.insuredName}<br>应交日期：${(new Date(element.paydate)).toLocaleString().split(' ')[0]}<br>应交保费：${element.paypremium}元<br>缴费账户：${element.payaccount}<br>
                    当前扣费结果：${element.transferwords == null || element.transferwords == ''?'暂无':element.transferwords}<br>最后缴费日为：${(new Date(element.lastpaydate)).toLocaleString().split(' ')[0]}<br>
                    逾期未缴费，保单将失效。为保障您的权益，请及时处理。<br><br>`
                }
            })
            return policy1+policy2+policy3
        },
        // -------------获取分类下的统计数---------
        calcTypeNumber(params){
            let paramsA = {
                tknumber:this.tkNumber,
                userIdentity:this.projectIdentity,
                projectName: this.projectName,
                payType:0
            }
            params = params || paramsA;
            renewalApi.renewal.renewalTypeCount(params).then(respone => {
                console.log(respone)
                if(respone.code == 200){
                    this.renewalCalc = respone.data
                }else{
                    // respone.msg
                     this.$alert(respone.msg, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {}).catch(() => {});
                }
                
            }).catch(error => {
                 this.$alert(error||'已超时，请刷新页面', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {}).catch(() => {});
            })
        },

        // ----------搜索必须的部分---------
        // searchOption 触发搜索
        searchOption(){
            // 在搜索的情况下切换TAB
            // payType 状态: 1:即将交费,2:到期交费,3:即将失效 payman 交费人  insuredName 投保人姓名
            // userIdentity 用户身份,main_attacker主攻手、assistant_main_attacker助理主攻手
            // insuredunit 投保单位  tknumber
            let params = {}
            if(this.selectStart){ // 搜索
                if(this.selectLabel == 1){
                    params = {payman: this.searchContent}
                }else if(this.selectLabel == 2){
                    params = {insuredName: this.searchContent}
                }else if(this.selectLabel == 3){
                    params = {insuredunit: this.searchContent}
                }
                if(this.searchContent != ''){
                    this.waitLoading = true;
                    //payType 状态: 1:即将交费,2:到期交费,3:即将失效 
                    this.data.policyData = [];
                    this.dataExpandList = [];
                    this.isLoadingSuccess = !this.isLoadingSuccess;
                    this.selectPolicyList(1,params);
                    this.selectCount(params);
                    this.calcTypeNumber(params)
                }else{
                    this.$message.error('搜索值不能为空哦~');
                }
            }else{
                this.selectCount()
            }
            console.log('搜索按钮。。。')
        },
        // 改变搜索范围
        changeOption(string){
            this.results = [];
            this.searchContent = '';
            console.log("下拉")
            if(string == 3){ // 投保单位
                this.results = this.unitArray;
            }
        },
        // 选择了value
        handleSelect(item) {
            this.searchOption()
        },
        // 投保单位下拉 -- 已对接
        selectUnit(){
            this.unitArray = [];
            let params = {
                "projectName": this.projectName,
	            "tknumber": this.tkNumber,
                "userIdentity":this.projectIdentity
            }
            renewalApi.renewal.renewalInsuredUnitList(params).then(respone => {
               console.log(respone)
               if(respone.code == 200){
                   if(respone.data.length > 0){
                       respone.data.forEach(element => {
                            element != null? this.unitArray.push({"value": element.insuredunit}):''
                       });
                   }else{
                       this.unitArray = [];
                   }
                
               }else{

               }
               console.log(this.unitArray)
           }).catch(error => {
               console.log(error)
           })
        },
        // 下拉选择
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
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
            };
        },
        showTime(paydate){
            let sixDate = 61*24*60*60*1000, fortFive = 45*24*60*60*1000, nowDate = new Date().getTime(); //sixDate-60天,fortFive-45天
            if(nowDate-paydate  >= fortFive && nowDate-paydate <= sixDate){
                return true
            }else{
                return false
            }
        },
        // 返回上一页
        goPre(){
            this.$router.go(-1)
        }
    },
    filters:{
        calcTime(date){
            return (new Date(date)).toLocaleString().split(' ')[0]
        },
        numFilterAfter(value) {
            // 截取当前数据到小数点后两位
            let realValAfter = (value.toString().split('.'))[1] == undefined ? '00' :((value.toString().split('.'))[1].length> 1?(value.toString().split('.'))[1]:(value.toString().split('.'))[1]+'0') ;
            return realValAfter
        },
        numFilterBefore(value) {
            // 截取当前数据到小数点前两位
            let realValBefore = (value.toString().split('.'))[0] == undefined ? 0 : (value.toString().split('.'))[0];
            return realValBefore
        },
    }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar{
    width: 0;
}
.renewal-page{
    padding: 5px 15px 10px 15px;
    &::before{
        content: "";
        position: fixed;
        left: 0;
        top: 50%;
        transform: translateY(-40%);
        width: 100vw;
        height: 100vh;
        background: url('../../assets/renewal/allBg.png') no-repeat;
        background-size: contain;
        z-index: -1;
    }
    &::after{
        content: "";
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #fffbf9;
        z-index: -2;
    }
}
.renewal-classification{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    justify-content: space-between;
    margin-top: 12px;
    button{
        line-height: 1;
        font-size: 13px;
        border: none;
        padding: 10px 10px;
        box-sizing: border-box;
        background: #fff;
        font-weight: 700;
        position: relative;
        border-radius: 5px;
        border: 1px solid #eaecf0;
        span{
            position: absolute;
            top: -25%;
            right: -10%;
            padding: 1px 6px;
            font-size: 12px;
            border-radius: 10px;
            color: #fea318;
            border: 1px solid #fea318;
            background: #fff;
            font-weight: 400;
            line-height: 1;
        }
        &:last-child{
            border: none;
            background: inherit;
        }
    }
    .el-icon-close.select-close{
        background: #fecb18;
        color: white;
        border-radius: 50px;
    }
    .active{
        border: 1px solid #fecb18;
        background: #fecb18;
        border-radius: 5px;
        color: white;
    }
}
.renewal-deadline{
    margin: 0;
    text-align: right;
    padding-bottom: 5px;
}
.renewal-tip{
    padding: 2px 15px;
    border: 1px dotted #FF9800;
    border-radius: 8px;
    margin-top: 10px;
    p{
        padding: 2px;
        text-align: left;
        margin: 0;
    }
}
.rule{
    color:#007eff;
    background: none;
    border:none;
    font-size: 12px;
}
.renewal-per{
    position: relative;
    &:not(:first-child){
        margin-top: 5px;
    }
    .renewal-per-card-top{
        background: url('../../assets/renewal/cardBg.png') no-repeat;
        background-size: cover;
        padding: 5px 10px;
    }
    p{
        margin: 0;
        text-align: left;
        margin-top: 2px;
        &:first-child{
            margin-top: 0;
        }
        span{
            display: inline-block;
            width: 50%;
        }
    }
    .renewal-per-card-content{
        padding: 10px 10px;
        background: #fff;
        .policy{
            position: absolute;
            right: 0;
            top: 50px;
            padding: 2px 5px;
            color: #fff;
            width: 10px;
            font-size: 12px;
            border-top-left-radius: 5px;
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
    .renewal-per-card-show{
        background: #fff;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        border-top:1px solid #e4e4e4;
        .el-button{
            border: none;
            color: #4484fc;
        }
    }
}
.renewal-per-card-all{
    overflow-x: hidden;
        div{
            position: relative;
            &:not(:last-child){
                border-bottom: 1px dotted #d4d3d3;
                &::before{
                    content: '';
                    position: absolute;
                    left: -5PX;
                    bottom: -5PX;
                    width: 10PX;
                    height: 10PX;
                    border-radius: 20PX;
                    background: #fffbf9;
                    z-index: 1;
                }
                &::after{
                    content: '';
                    position: absolute;
                    right: -5PX;
                    bottom: -5PX;
                    width: 10PX;
                    height: 10PX;
                    border-radius: 20PX;
                    background: #fffbf9;
                    z-index: 1;
                }
            }
        }
    }
.infinite-serve{
    font-size: 13px;
    margin-top: 2vh;
    height: calc(100vh - 25vh);
}
.infinite-list-three{
    font-size: 13px;
    margin-top: 2vh;
    height: calc(100vh - 21vh);
}
.infinite-list{
    font-size: 13px;
    margin-top: 2vh;
    height: calc(100vh - 26vh);
}
.notice-button{
    text-align: right;
    .el-button{
        padding:0;
        background: url('../../assets/renewal/noticeBg.png') no-repeat;
        background-size: cover;
        border: none;
        color: white;
        font-size: 13px;
        margin-bottom: -4px;
        span{
            display: block;
            width: 90px;
            height: 22px;
            line-height: 22px;
            margin: 5px 12px 5px 20px;
            box-sizing: border-box;
            background: #fff;
            border-radius: 30px;
            color: #4484fc;
        }
    }
    img{
        width: 15px;
        vertical-align: text-bottom;
    }
}
.renewal-show{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 6px;
    span{
        b{
            font-size: 14px;
        }
    }
}
.infinite-list-top{
     &::after{
            content: attr(data-index);
            position: absolute;
            font-size: 65px;
            right: 0;
            top: 38px;
            z-index: 10;
            opacity: 0.17;
            color: #5a0202;
        }
}
.el-button:hover{
    background: inherit;
}
.mony-show{
    b{
        font-size: 14px;
    }
    i{
        font-size: 12px;
        font-style: normal;
    }
}
.serve-name{
    margin: 0;
    padding: 2px;
    font-style: 14px;
}
.go-pre{
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px 10px;
    border: none;
    background: inherit;
    font-size: 12px;
    color: #4484fc;
}
.loading-css{
    height: 30px;
}
.common-problem-part-title{
    color: #FF9800;
    margin-bottom: 2px;
}
.insured-unit{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    span{
        &:first-child{
            width: 4em;
        }
        &:last-child{
            width: auto;
        }
    }
}

</style>

<style lang="scss">
.renewal-page{
    .el-autocomplete{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        margin: 8px 0;
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
    .el-loading-text{
        display: inline-block;
    }
    .el-button:active{
        border: none;
    }
    .el-button:hover{
        border: none;
    }
    .el-button:visited{
        border: none;
    }
}
.el-message-box{
    width: 90vw;
}
.el-dialog__body{
    height: 60vh;
    overflow: scroll;
    padding: 10px;
    line-height: 24px;
}
.el-dialog{
    margin-bottom: 0;
}
.el-dialog__footer{
    .el-button--primary{
        color: white;
    }
}
</style>