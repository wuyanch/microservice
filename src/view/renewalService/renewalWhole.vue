<template>
    <div class="renewal-whole">
         <!-- 头部 -->
        <p class="renewal-deadline">数据截止时间：{{renewalDealineTime}}</p>
        <!-- 项目的整体情况 -->
        <div>
            <!-- 头部 -->
            <div class="whole-title"><img src="@a/renewal/wholeLeft.png" alt="" srcset=""><span>项目整体情况</span><img src="@a/renewal/wholeRight.png" alt="" srcset=""></div>
            <!-- 内容 -->
            <div class="whole-project">
                <p><span>{{Number.isNaN(allData.soonPayCount)?0:allData.soonPayCount}}</span><span>即将交费</span></p>
                <p><span>{{Number.isNaN(allData.duePayCount+allData.soonExpireCount)?0:(allData.duePayCount+allData.soonExpireCount)}}</span><span>到期交费</span></p>
                <p><span>{{Number.isNaN(allData.soonExpireCount)?0:allData.soonExpireCount}}</span><span>即将失效</span></p>
            </div>
        </div>
        <!-- 小组的分布情况 -->
        <div class="whole-part">
            <!-- 头部 -->
            <div class="whole-title"><img src="@a/renewal/wholeLeft.png" alt="" srcset=""><span>小组分布情况</span><img src="@a/renewal/wholeRight.png" alt="" srcset=""></div>
            <!-- 内容 -->
            <div class="group-content">
                <el-table
                :data="teamData"
                style="width: 100%;"
                max-height="200"
                >
                    <el-table-column
                    prop="otoTeamName"
                    label="小组"
                    align="left"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="soonPayCount"
                    label="即将交费"
                    width="78">
                    </el-table-column>
                    <el-table-column
                    prop="duePayCount"
                    label="到期交费"
                    width="78">
                    </el-table-column>
                    <el-table-column
                    prop="soonExpireCount"
                    label="即将失效"
                    width="78">
                    </el-table-column>
                </el-table>
                <p class="show-number">共 {{teamData.length}} 组</p>
            </div>
        </div>
        <!-- 服务经理的情况 -->
        <div class="whole-part">
            <!-- 头部 -->
            <div class="whole-title whole-title-three">
                <img src="@a/renewal/wholeLeft.png" alt="" srcset=""><span>服务经理分布情况</span><img src="@a/renewal/wholeRight.png" alt="" srcset="">
                <el-button @click="lookMine()">看我的客户<i class="el-icon-arrow-right"></i> </el-button>
            </div>
            <!-- 内容 -->
            <div class="sevice-manager">
                <el-table
                :data="agentData"
                style="width: 100%;"
                max-height="200"
                >
                    <el-table-column
                    prop="agentName"
                    label="服务经理"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="soonPayCount"
                    label="即将交费"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="duePayCount"
                    label="到期交费"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="soonExpireCount"
                    label="即将失效"
                    >
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="50"  v-if="projectIdentity == 'main_attacker' || projectIdentity == 'assistant_main_attacker'">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleDetail(scope.$index, scope.row)">详情<i class="el-icon-arrow-right"></i></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <p class="show-number">共 {{agentData.length}} 位服务经理</p>
            </div>
        </div>

        <!-- 看我的客户 -->
        <!-- <div class="look-mine">
            
        </div> -->
        <!-- 返回首页 -->
        <back-home></back-home>
    </div>
</template>

<script>
import renewalApi from '@/api/api'
import BackHome from '../../components/BackHome'
export default {
    name:'renewalWhole',
    components: { BackHome },
    data(){
        return{
            projectName: '', // 当前项目
            projectIdentity: '', // 当前用户项目身份
            renewalDealineTime: null,
            allData:{},
            teamData: [],
            agentData:[]
        }
    },
    mounted(){
        this.projectName = this.$ls.get('projectName'), // 当前项目
        this.projectIdentity = this.$ls.get('projectIdentity'), // 当前用户项目身份
        this.selectRenewalTime()
        this.TeamInfo()
        this.renewalFullProjectInfo()
        this.agentInfo()
    },
    
    methods:{
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
        // 如果是主攻手
        handleDetail(index, row){
            console.log('详情')
            console.log(index)
            console.log(row)
            this.$router.push({path:'/view/renewalService/renewal',query:{agentName:row.agentName,tknumber: row.tknumber,projectName: this.projectName}})
        },
        // 看自己的客户
        lookMine(){
            this.$router.push({path:'/view/renewalService/renewal'})
        },
        // 获取整体情况
        renewalFullProjectInfo(){
            let params = {
                "projectName": this.projectName,
                "tknumber": ''
            }
            renewalApi.renewal.renewalFullProjectInfo(params).then(response => {
                console.log(response)
                if(response.code == 200){
                    if(response.data != null &&  response.data.length != 0 ){
                        this.allData = response.data;
                    }else{
                        this.allData ={
                            soonPayCount:0,
                            duePayCount:0,
                            soonExpireCount:0
                        }
                    }
                    
                }else{
                    // 提示语response.msg
                    this.$confirm(respone.msg, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {}).catch(() => {});
                }
                
            }).catch(error => {
                this.$confirm(error, '错误', {
                    confirmButtonText: '确定',
                    type: 'error'
                }).then(() => {}).catch(() => {});
            })
        },
        // 获取小组数据
        TeamInfo(){
            let params = {
                "projectName": this.projectName,
                "tknumber": '',
            }
            renewalApi.renewal.renewalTeamInfo(params).then(response => {
                console.log(response)
                if(response.code == 200){
                    if(response.data != null &&  response.data.length != 0){
                        this.teamData = this.addPolicy(response.data)
                        console.log(this.teamData)
                    }else{
                        this.teamData = []
                    }
                    
                }else{
                    // 提示语response.msg
                    this.$confirm(respone.msg, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {}).catch(() => {});
                }
                
            }).catch(error => {
                this.$confirm(error, '错误', {
                    confirmButtonText: '确定',
                    type: 'error'
                }).then(() => {}).catch(() => {});
            })
        },
        // 获取服务经理renewalAgentInfo
        agentInfo(){
            let params = {
                "projectName": this.projectName,
                "tknumber": '',
            }
            renewalApi.renewal.renewalAgentInfo(params).then(response => {
                console.log(response)
                if(response.code == 200){
                    if(response.data != null && response.data.length != 0){
                        this.agentData = this.addPolicy(response.data)
                        console.log(this.agentData)
                    }else{
                        this.agentData = []
                    }
                }else{
                    // 提示语response.msg
                    this.$confirm(respone.msg, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {}).catch(() => {});
                }
                
            }).catch(error => {
                this.$confirm(error, '错误', {
                    confirmButtonText: '确定',
                    type: 'error'
                }).then(() => {}).catch(() => {});
            })
        },
        // 到期保单和即将失效保单相加函数
        addPolicy(policyData){
            policyData.forEach(element => {
                element.otoTeamName = element.otoTeamName == null || element.otoTeamName == ""?'无归属':element.otoTeamName
                element.duePayCount = Number(element.duePayCount) + Number(element.soonExpireCount)
            });
            return policyData
        }
    }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar{
    width: 0;
}
.renewal-whole{
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
.renewal-deadline{
    margin: 0;
    text-align: right;
    padding-bottom: 5px;
}
.whole-title{
    text-align: left;
    margin-bottom: 10px;
    position: relative;
    img{
        width: 20px;
        &:first-child{
            margin-right: 5px;
        }
        &:last-child{
            margin-left: 5px;
        }
    }
    span{
        font-size: 16px;
        font-weight: 700;
        vertical-align: bottom;
    }
    .el-button{
        font-size: 12px;
        padding: 9px 18px;
        position: absolute;
        right: 0;
        top: -7px;
        background: linear-gradient(270deg, #4484fc, #a4c1f8);
        color: white;
        border-radius: 30px;
        border: none;
        box-shadow: 1PX 0PX 1px 0px #e4ebf9, -1px 3PX 6PX 0px #cfdffd, -1px 0px 10PX 0px #e4ebf9, 1px 0px 0px 0px #e4ebf9;
    }
}
.whole-title-three{
    margin-top: 20px;
}
.whole-project{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px 0;
    p{
        margin: 0;
        span{
            display: block;
            &:first-child{
                font-size: 14px;
                font-weight: 700;
            }
        }
    }
}
.whole-part{
    margin-top: 15px;
}
.look-mine{
    margin-top: 15px;
    
}
.show-number{
    text-align: right;
    margin-top: 5px;
}
</style>
<style lang="scss">
.el-table thead{
    color: #232323;
    font-size: 13px;
    font-weight: 400;
}
.el-table .el-table__cell{
    text-align: center;
    padding: 5px 0;
    color: #232323;
    font-size: 13px;
}
.el-table__body-wrapper, .el-table__body, 
.el-table, .el-table tr,.el-table th.el-table__cell{
    background: inherit;
}
.el-table tr:nth-child(even){
    background: rgba(237,237,236, .6);
}
// .group-content{
//     .el-table__body-wrapper,.el-table__body,tbody,colgroup{
//         max-height: 180PX;
//         overflow-y: scroll;
//     }
//     .el-table__body td.el-table__cell{
//         padding: 2px 0;
//     }
// }
.sevice-manager{
    .el-table__body-wrapper,.el-table__body,tbody,colgroup{
        max-height: 180PX;
        overflow-y: scroll;
    }
    .el-table th.el-table__cell>.cell{
        padding-left: 1px;
        padding-right: 1px;
    }
    .cell button{
        padding: 0;
        border: none;
        background: inherit;
    }
}
.el-table__row{
    td{
        &:first-child{
            text-align: left;
        }
    }
}
.el-table .cell{
    text-overflow: initial;
}
.el-table__fixed-right{
    background: rgb(254 247 242);
    box-shadow: 1px 1px 4px 0px black;
}
</style>