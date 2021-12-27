<template>
    <!-- 问卷下载 -->
    <div class="naire-down">
        <el-row type="flex" class="row-bg" justify="space-between" :gutter="20" v-for="(indexlist,index) in naire" :key="index">
            <el-col :span="8" v-for="(naire,id) in indexlist" :key="id">
                <div class="grid-content" >
                    <p  v-if="naire.imgsrc != ''">
                        <img :src="naire.imgsrc"  alt="" srcset="">
                    </p>
                    <p v-else>
                        <img src='../../assets/naireDownPh/noImage.png'  alt="" srcset="" class="no-image">
                    </p>
                   
                    <p class="name-p">{{naire.name}}</p>
                    <el-button><img src="../../assets/naireDownPh/down.png" alt="" srcset="" class="button-img">下载问卷</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:'NaireDown',
    data(){
        return{
            naire:[
               [
                {id:'101', name:'血压异常', nameId:'血压异常问卷', imgsrc:require('@a/naireDownPh/gxy.png'), url:''},
                {id:'102', name:'特别健康', nameId:'特别健康问卷', imgsrc:'', url:''},
                {id:'103', name:'肝脏', nameId:'肝脏疾病问卷', imgsrc:require('@a/naireDownPh/gbhyg.png'), url:''}
               ],
               [
                {id:'104', name:'甲状腺', nameId:'甲状腺疾病问卷', imgsrc:require('@a/naireDownPh/jzx.png'), url:''},
                {id:'106', name:'医保卡外借', nameId:'就诊情况问卷', imgsrc:'', url:'/view/questionnaire'},
                {id:'107', name:'呼吸系统', nameId:'呼吸系统疾病问卷', imgsrc:require('@a/naireDownPh/qx.png'), url:''}
               ],
               [
                {id:'108', name:'身高体重', nameId:'身高体重问卷', imgsrc:require('@a/naireDownPh/sgtz.png'), url:''},
                {id:'109', name:'心脏疾病', nameId:'心电图心脏超声问卷', imgsrc:'', url:'/view/questionnaire'},
                {id:'110', name:'泌尿系统', nameId:'泌尿系统疾病问卷', imgsrc:'', url:''}
               ],
               [
                {id:'111', name:'消化系统', nameId:'消化系统疾病问卷', imgsrc:require('@a/naireDownPh/xhxt.png'), url:''},
                {id:'112', name:'骨骼系统', nameId:'骨骼系统问卷', imgsrc:'', url:'/view/questionnaire'},
                {id:'113', name:'结核',  nameId:'结核问卷', imgsrc:'', url:''}
               ],
               [
                {id:'114', name:'哮喘', nameId:'哮喘问卷', imgsrc:'', url:''},
                {id:'115', name:'受伤', nameId:'受伤问卷', imgsrc:'', url:'/view/questionnaire'},
                {id:'116', name:'饮酒', nameId:'饮酒问卷', imgsrc:require('@a/naireDownPh/yj.png'), url:''}
               ],
               [
                {id:'117', name:'血糖异常', nameId:'血糖异常问卷', imgsrc:'', url:''},
                {id:'118', name:'高保额', nameId:'个人高保额财务问卷', imgsrc:'', url:'/view/questionnaire'},
                {id:'119', name:'婴幼儿健康', nameId:'婴幼儿健康问卷', imgsrc:'', url:''}
               ],
               [
                {id:'120', name:'出国', nameId:'出国问卷', imgsrc:'', url:''},
                {id:'121', name:'残疾', nameId:'残疾问卷', imgsrc:'', url:'/view/questionnaire'},
                {id:'122', name:'外籍人士', nameId:'外籍人士问卷', imgsrc:'', url:''}
               ],
               [
                {id:'123', name:'乳腺', nameId:'乳腺疾病问卷', imgsrc:'', url:''},
                {id:'124', name:'颈椎疾病', nameId:'颈椎疾病问卷', imgsrc:'', url:'/view/questionnaire'},
                {id:'125', name:'女性健康', nameId:'女性健康问卷', imgsrc:'', url:''}
               ],
               [
                {id:'126', name:'神经系统', nameId:'神经系统疾病问卷', imgsrc:'', url:''},
                {id:'127', name:'胸痛', nameId:'胸痛问卷', imgsrc:'', url:'/view/questionnaire'},
                {id:'128', name:'血液系统', nameId:'血液系统问卷', imgsrc:'', url:''}
               ],
               [
                {id:'129', name:'腰椎疾病', nameId:'腰椎疾病问卷', imgsrc:'', url:''},
                {id:'130', name:'肿瘤', nameId:'肿瘤问卷', imgsrc:'', url:'/view/questionnaire'},
                {id:'131', name:'理赔就诊', nameId:'补充医疗金理赔问卷', imgsrc:'', url:''}
               ],
               [
                {id:'132', name:'危险运动', nameId:'危险运动问卷', imgsrc:require('@a/naireDownPh/wxyd.png'), url:''},
                {id:'133', name:'职业', nameId:'职业问卷', imgsrc:'', url:'/view/questionnaire'},
                {id:'134', name:'健康告知书', nameId:'个人健康告知书', imgsrc:require('@a/naireDownPh/jwjb.png'), url:''}
               ],
               [
                {id:'135', name:'癫痫', nameId:'癫痫病问卷', imgsrc:'', url:''}
               ]
            ]
        }
    },
    methods:{
        // 下载需要参数 openID
    }
}
</script>

<style lang="scss" scoped>
.naire-down{
    padding: 10px 15px;
    .name-p{
        margin: 5px 0;
        font-family: 'ps';
    }
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
    border: 1px solid #ecf4fc;
    font-size: 14px;
    padding-top: 5px;
    img{
        width: 42px;
        height: 42px;
        object-fit: contain;
    }
    img.no-image{
        object-fit: cover;
        padding-left: 10px;
        width: 90px;
    }
    .el-button{
        font-size: 12px;
        font-family: 'ps';
        width: 100%;
        border: none;
        border-top: 1px solid #ecf4fc;
        color: #44b5ab;
        outline: none;
    }
    .button-img{
        width: 18px;
        height: 18px;
        vertical-align: middle;
    }
}
</style>