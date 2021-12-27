<template>
    <div>
        <!-- 核保百科 -->
        <el-container>
            <el-header>
                <!-- 搜索框+收藏夹 -->
                <div class="header-search">
                    <el-button icon="el-icon-search" @click="switchTab">请输入疾病名称</el-button>
                </div>
                <div class="header-collection">
                    <el-button @click="drawer = true"><img src="../../assets/comm/shoucang.png" alt=""><span>收藏夹</span></el-button>
                </div>
                <div class="diseaseUl">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="体检异常" name="first">
                            <div class="deatail-disease">
                                <el-tabs tab-position="left">
                                    <el-tab-pane v-for="(value,index) in physicalExamination" :key="index" :label=value.physical>
                                        <ul v-for="(detailDisease,id) in value.physicalDetail" :key="id">
                                            <li @click="particulars(detailDisease.id)">{{detailDisease.name}} <i class="el-icon-arrow-right"></i></li>
                                        </ul>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="健康告知异常" name="second">

                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-header>
            <el-drawer
                title="收藏夹"
                :visible.sync="drawer"
                direction='rtl'
                size='70%'
            >
               <div class="drawer-ul">
                   <ul>
                       <li>超重</li>
                       <li>近视</li>
                       <li>远视</li>
                   </ul>
               </div>
            </el-drawer>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'underwritingWiki',
    data(){
        return{
            drawer: false,
            activeName: 'first',
            physicalExamination:[
               {
                 physical:'BMI(BMI=体重kg/身高cm/身高cm）',
                 physicalDetail:[
                    {id:12010,name:'超重'},
                    {id:12011,name:'偏瘦'}
                 ]
               },
               {
                 physical:'视力/眼科/近视',
                 physicalDetail:[
                    {id:13010,name:'远视'},
                    {id:13011,name:'近视'}
                 ]
               },
               {
                 physical:'血压',
                 physicalDetail:[
                    {id:13010,name:'血压1'},
                    {id:13011,name:'血压2'}
                 ]
               },
               {
                 physical:'BMI(BMI=体重kg/身高cm/身高cm）',
                 physicalDetail:[
                    {id:12010,name:'超重'},
                    {id:12011,name:'偏瘦'}
                 ]
               },
               {
                 physical:'视力/眼科/近视',
                 physicalDetail:[
                    {id:13010,name:'远视'},
                    {id:13011,name:'近视'}
                 ]
               },
               {
                 physical:'血压',
                 physicalDetail:[
                    {id:13010,name:'血压1'},
                    {id:13011,name:'血压2'}
                 ]
               },
               {
                 physical:'BMI(BMI=体重kg/身高cm/身高cm）',
                 physicalDetail:[
                    {id:12010,name:'超重'},
                    {id:12011,name:'偏瘦'}
                 ]
               },
               {
                 physical:'视力/眼科/近视',
                 physicalDetail:[
                    {id:13010,name:'远视'},
                    {id:13011,name:'近视'}
                 ]
               },
               {
                 physical:'血压',
                 physicalDetail:[
                    {id:13010,name:'血压1'},
                    {id:13011,name:'血压2'}
                 ]
               },
               {
                 physical:'血压',
                 physicalDetail:[
                    {id:13010,name:'血压1'},
                    {id:13011,name:'血压2'}
                 ]
               }
           ]
        }
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //切换搜索
        switchTab(){
            this.$router.push({'path':'/view/diseaseSearch',query:{}})
        },
        //跳转到详情
        particulars(id){
            this.$router.push({'name':'diseaseDetail',params:{'detail_id':12301}})
        }
    }
}
</script>

<style lang="scss" scoped>
.el-header{
    padding: 0px;
    .header-search{
        width: 75%;
        display: inline-block;
        height: 40px;
        padding: 15px 0 15px 15px;
        box-sizing: border-box;
        .el-button{
            width: 100%;
            border-radius: 20px;
            font-size: 12px;
        }
    }
    .header-collection{
        width: 20%;
        margin-left: 5%;
        display: inline-block;
        padding: 15px 15px 15px 0;
        box-sizing: border-box;
        .el-button{
            width: 100%;
            padding: 0;
            border: none;
            img{
                width: 40%;
                vertical-align: sub;
            }
            span{
                display: block;
                font-size: 11px;
            }
        }
    }
}
.deatail-disease{
    .el-tabs__content{
        width: 64%;
        ul{
            width: 100%;
            box-sizing: border-box;
            padding-left: 5px;
            li{
                list-style: none;
                padding: 15px 10px 5px 10px;
                text-align: left;
                border-bottom: 1px solid #dcecfc;
                &:first-child{
                    padding-top: 5px;
                }
                i{
                    float: right;
                    padding-top: 3px;
                }
            }
        }
    }
    
}
.drawer-ul{
    ul{
        padding:10px;
        text-align: center;
        li{
            padding: 10px;
            border-bottom: 1px solid #DCDFE6;
            text-align: left;
        }
    }
}
ul{
    li{
        list-style: none;
    }
}

</style>
<style lang="scss">

.diseaseUl>.el-tabs>.el-tabs__header{
    margin-bottom: 4px;
    .el-tabs__nav-scroll:first-child{
        padding: 0 15px;
    }
}
.el-button{
    outline: none;
}
.el-button:focus{
    color: #606266;
}
.deatail-disease{
    .el-tabs__header{
        width: 36%;
    }
    .el-tabs--left .el-tabs__nav-wrap.is-left{
        width: 100%;
    }
    .el-tabs__nav,.el-tabs__nav-scroll{
        width: 100%;
        height: auto;
    }
    .el-tabs__item{
        height: auto;
        padding: 15px 5px 15px 6px;
        line-height: 20px;
        font-size: 13px;
        box-shadow: 0px 1px 0px 0px #dcecfc;
    }
    .is-left .el-tabs__item:nth-child(2),
    .el-tabs__item .is-left .is-active{
        padding-left: 6px !important;
    }
    .el-tabs__item.is-active{
        background: #dcecfc;
    }
    .el-tabs__header .el-tabs__item:last-child{
        padding: 10px 5px 10px 6px;
        border-bottom: 0;
    }
    .el-tabs--left .el-tabs__item.is-left{
        text-align: left;
    }
    .el-tabs__nav{
        white-space: break-spaces;
    }
}

</style>