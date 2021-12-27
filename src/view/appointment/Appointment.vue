<template>
    <!-- 体检预约 -->
    <div class="appointment-page">
        <header>
            <h1 class="text-align bt">体检预约登记表</h1>
            <p class="fill_bt"><span style="color: red;">*</span>【温馨提示】</p>
            <p>仅供泰康养老内部员工预约登记使用，切勿转发客户填写！</p>
            <p><span style="color: red;">为提高预约成功率，请提前两天进行预约登记。</span>预约登记完成非预约成功，预约结果请以核保人员通知为准。</p>
            <p>[接收报告]体检报告会在体检完成后五个工作日内由核保人员接收。如客户有领取电子版体检报告的需求，请客户拨打客服热线02038796521。</p>
            <p>[需空腹项目]验血、腹部B超</p>
            <p>[乳腺B超] 仅爱康环市东分院、爱康南天分院、珠海中西医结合医院提供乳腺分级服务。</p>
            <p>[淋巴结B超] 仅爱康环市东分院提供该项服务，体检时需持体检通知书明确检查部位。</p>
            <p>[胸部CT] 广州仅慈铭体育中心分院提供该项服务。</p>
            <p>[乙肝五项] 爱康国宾需主动向前台提出要做乙肝五项，否则默认为放弃；慈铭需签字同意做乙肝五项检查。</p>
	    </header>
        <main>
            <el-form label-position="top" label-width="80px" :model="ruleForm">
                <el-form-item label="受检人姓名（如与被保险人姓名不一致，请同时写上被保险人姓名）" required>
                    <el-input v-model="ruleForm.subjectName"></el-input>
                </el-form-item>
                <el-form-item label="受检人联系电话" required>
                    <el-input v-model="ruleForm.subjectTel"></el-input>
                </el-form-item>
                <el-form-item label="城市" required>
                    <el-select v-model.number="ruleForm.city" placeholder="请选择体检城市" @change="chageCity">
                        <div  v-for="(val,index) in MedicalInstitutionsCity" :key="index">
                            <el-option :label=val.label  :value=val.id ></el-option>
                        </div>
                    </el-select>
                </el-form-item>
                <el-form-item label="体检机构" required :class="addressBlock.length > 0 ? 'appoint-pop-m':''">
                    <el-select v-model.number="ruleForm.medicalInstitutions" placeholder="请选择体检机构" @change="chageInstitutions">
                        <div v-for="(val,index) in MedicalInstitutionsList[ruleForm.city]" :key="index">
                            <el-option :label=val.label  :value=val.id ></el-option>
                        </div>
                    </el-select>
                </el-form-item>
                <div v-if="addressBlock.length > 0" class="appoint-pop">
                    <p>体检时间：{{addressBlock[0].time}}</p>
                    <p>体检机构：{{addressBlock[0].hospital}}</p>
                    <p>体检地址：{{addressBlock[0].address}}</p>
                </div>
                <el-form-item label="预约日期" required>
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.appointmentDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="所属业务经理" required>
                    <el-input v-model="ruleForm.businessName"></el-input>
                </el-form-item>
                <el-form-item label="业务经理联系电话" required>
                    <el-input v-model="ruleForm.businessTel" type="tel"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">立即预约</el-button>
                </el-form-item> 
            </el-form>
        </main>
    </div>
</template>

<script>
export default {
    name:'Appointment',
    data(){
        return{
            //表单
            ruleForm: {
                subjectName: '',
                subjectTel: '',
                city: '',
                medicalInstitutions: '',
                appointmentDate:'',
                businessName:'',
                businessTel:''
            },
            addressBlock:[],
            //表单校验规则
            rules: {
                region: [
                    { required: true, message: '请选择体检城市', trigger: 'change' }
                ],
            },
            //体检城市
            MedicalInstitutionsCity:[
                {id:0, value:'广州',label:'广州'},
                {id:1, value:'珠海',label:'珠海'},
                {id:2, value:'江门',label:'江门'},
                {id:3, value:'肇庆',label:'肇庆'},
                {id:4, value:'东莞',label:'东莞'},
                {id:5, value:'深圳',label:'深圳'},
                {id:6, value:'佛山',label:'佛山'}
            ],
            //体检机构
            MedicalInstitutionsList: [
                // 广州体检机构
                [
                    {id:0, value: '爱康-环市东分院', label:'爱康-环市东分院 周日休息'},
                    {id:1, value: '爱康-华港花园分院', label:'爱康-华港花园分院 周日休息'},
                    {id:2, value: '爱康-南天广场分院', label:'爱康-南天广场分院 周日休息'},
                    {id:3, value: '慈铭-体育中心分院', label:'慈铭-体育中心分院 周一休息'},
                    {id:4, value: '慈铭-解放南路分院', label:'慈铭-解放南路分院 周四休息'}
                ],
                // 珠海体检机构
                [
                    {id:0, value: '美年大健康-珠海分院', label:'美年大健康-珠海分院（周一到周日）'},
                    {id:1, value: '珠海中西医结合医院（周日及节假日休息）', label:'珠海中西医结合医院（周日及节假日休息）'}
                ],
                // 江门体检机构
                [
                    {id:0, value: '美年大健康-江门分院', label:'美年大健康-江门分院（周一到周日）'}
                ],
                // 肇庆体检机构
                [
                    {id:0, value: '慈铭-肇庆分院', label:'慈铭-肇庆分院（周一到周日）'}
                ],
                // 东莞体检机构
                [
                    {id:0, value: '东莞南城财富广场分院（周六休息）', label:'东莞南城财富广场分院（周六休息）'},
                    {id:1, value: '东莞松山湖中国电子产业园分院（周日休息）', label:'东莞松山湖中国电子产业园分院（周日休息）'}
                ],
                // 深圳体检机构
                [
                    {id:0, value: '深圳科技园科兴分院（周一休息）', label:'深圳科技园科兴分院（周一休息）'},
                    {id:1, value: '深圳福田分院（周一休息）', label:'深圳福田分院（周一休息）'},
                    {id:2, value: '深圳罗湖分院（周一休息）', label:'深圳罗湖分院（周一休息）'},
                    {id:3, value: '深圳华强分院（周一休息）', label:'深圳华强分院（周一休息）'}
                ],
                // 佛山体检机构
                [
                    {id:0, value: '爱康-佛山千灯湖分院', label:'爱康-佛山千灯湖分院'},
                    {id:1, value: '爱康-佛山禅城分院', label:'爱康-佛山禅城分院'},
                    {id:2, value: '慈铭奥亚（美年）-禅城分院（星星华园国际）', label:'慈铭奥亚（美年）-禅城分院（星星华园国际）（周二休息）'},
                    {id:3, value: '慈铭奥亚（美年）-禅城分院（绿地金融中心）', label:'慈铭奥亚（美年）-禅城分院（绿地金融中心）【暂停】'},
                    {id:4, value: '慈铭奥亚（美年）-南海分院', label:'慈铭奥亚（美年）-南海分院（周一休息）'},
                    {id:5, value: '慈铭奥亚（美年）-顺德分院', label:'慈铭奥亚（美年）-顺德分院（周一休息）'}
                ]
            ],
            //体检机构地址
            MedicalInstitutionsAddressList:[
                //广州地区
                [
                    {time:'8:00～10:30',organization:'爱康国宾',hospital:'广州环市东分院 （周日休息）',address:'越秀区环市东路496号广发花园大厦3、4层'},
                    {time:'8:00～10:30',organization:'爱康国宾',hospital:'广州天河华港花园分院（周日休息）',address:'天河区中山大道东方一路20-24号华港花园3层'},
                    {time:'8:00～10:30',organization:'爱康国宾',hospital:'广州花城大道南天广场分院 （周日休息）',address:'天河区珠江新城花城大道7号南天国际商务中心5层'},
                    {time:'8:00～10:00',organization:'慈铭',hospital:'体育中心分院（周一休息）',address:'天河路351号广东省外经贸大厦三楼'},
                    {time:'8:00～10:00',organization:'慈铭',hospital:'解放南路分院 （周四休息）',address:'解放南路123号金汇大厦3楼'}
                ],
                //珠海地区
                [
                    {time:'8:00～10:00',organization:'t',hospital:'美年大健康—珠海分院',address:'珠海市香洲区湾仔南湾南路3007号二楼'},
                    {time:'8:00～11:00',organization:'t',hospital:'珠海中西医结合医院（周日及节假日休息）',address:'珠海市拱北粤华路208号'}
                ],
                //江门地区
                [
                    {time:'8:00～10:00',organization:'t',hospital:'美年大健康—江门分院',address:'江门市北新区万达广场A座4-5层'}
                ],
                //肇庆地区
                [
                    {time:'8:00～10:00',organization:'t',hospital:'慈铭-肇庆分院',address:'肇庆市端州区太和北路12号第B1区'}
                ],
                //东莞地区
                [
                    {time:'8:00～10:30',organization:'爱康国宾',hospital:'东莞南城财富广场分院（周六休息）',address:'东莞市南城区元美路2号财富广场2楼'},
                    {time:'8:00～10:30',organization:'爱康国宾',hospital:'东莞松山湖中国电子产业园分院（周日休息）',address:'东莞市松山湖高新技术开发区科技二路5号中国电子产业园3号楼201'}
                ],
                //深圳地区
                [
                    {time:'8:00～10:30',organization:'爱康国宾',hospital:'深圳科技园科兴分院（周一休息）',address:'深圳市南山区高新科技园中区科苑路科兴科学园东门B座3单元3A层（荣粤酒家正门左侧电梯上）'},
                    {time:'8:00～10:30',organization:'爱康国宾',hospital:'深圳福田分院（周一休息）',address:'深圳市福田区滨河路北彩田路东交汇处联合广场裙楼B座201、203'},
                    {time:'8:00～10:30',organization:'爱康国宾',hospital:'深圳罗湖分院（周一休息）',address:'深圳市罗湖区宝安南路3044号天地大厦1层3层'},
                    {time:'8:00～10:00',organization:'慈铭',hospital:'深圳华强分院（周一休息）',address:'深圳市福田区福田街道深圳国际文化大厦4层'}
                ],
                //佛山地区
                [
                    {time:'8:00～10:30',organization:'爱康国宾',hospital:'爱康卓悦佛山千灯湖分院 （周日休息）',address:'佛山市南海区桂城灯湖东路1号友邦中心1座25楼'},
                    {time:'8:00～10:30',organization:'爱康国宾',hospital:'爱康佛山禅城分院（周一休息）',address:'广东省佛山市禅城区季华四路115号B座宏宇国金大厦二至三层'},
                    {time:'8:00～10:30',organization:'慈铭奥亚、美年',hospital:'禅城分院（星星华园国际） （周二休息）',address:'佛山市禅城区汾江南路6号星星华园国际商场4楼'},
                    {time:'8:00～10:30',organization:'慈铭奥亚、美年',hospital:'禅城分院（绿地金融中心） 【暂停】',address:'佛山市禅城区季华六路15号绿地金融中心三座3-4楼'},
                    {time:'8:00～10:30',organization:'慈铭奥亚、美年',hospital:'南海分院 （周一休息）',address:'佛山市南海区桂澜北路4号中盛大厦4楼'},
                    {time:'8:00～10:30',organization:'慈铭奥亚、美年',hospital:'顺德分院 （周一休息）',address:'佛山市顺德区大良新城区观绿路4号置业广场3号楼3楼'}
                ],
            ]
        }
    },
    methods:{
        //更改体检机构
        chageCity: function(){
            this.ruleForm.medicalInstitutions = '';
            // console.log(this.MedicalInstitutionsAddressList[this.ruleForm.city][0])
        },
        //更改体检医院
        chageInstitutions: function(){
            this.addressBlock = [];
             console.log(this.ruleForm.city)
            if(this.ruleForm.city == 0 || this.ruleForm.city != ''){
                this.addressBlock.push(this.MedicalInstitutionsAddressList[this.ruleForm.city][this.ruleForm.medicalInstitutions]);
                console.log("更改体检医院 "+this.addressBlock)
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>

header{
    padding:10px 15px;
    p:not(.fill_bt){
        margin:0;
        text-align: left;
        padding-top: 5px;
        font-size: 12px;
        text-indent: 2em;
    }
    .fill_bt{
        text-align: left;
        margin:0;
    }
}
.el-form{
    padding: 10px 15px;
    text-align: left;
}
.appoint-pop-m{
    margin-bottom: 5px;
}
.appoint-pop{
    margin-bottom: 20px;
    p{
        margin: 4px;
    }
}
</style>
<style lang="scss">
.appointment-page{
    .el-form--label-top .el-form-item__label{
       padding-bottom: 10px;
    }
    .el-form-item__label{
        line-height: 16px;
        font-size: 13px;
    }
    .el-select{
        width: 100%;
    }
    .el-form-item__content{
        text-align: center;
        .el-button{
            width: 100%;
        }
    }
}
</style>