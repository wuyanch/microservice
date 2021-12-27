<template>
    <div>
        <!-- 核保百科 -->
        <el-container>
            <el-header>
                <!-- 搜索框 -->
                <div class="disease-search-box">
                    <el-autocomplete
                        class="inline-input"
                        clearable
                        v-model="diseaseName"
                        :fetch-suggestions="querySearch"
                        placeholder="疾病名称"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                    ></el-autocomplete><el-button>搜索</el-button>
                </div>
                <el-button @click="cancel" class="cancel">取消</el-button>
            </el-header>
            <el-main>
                <p class="select-entry" v-show="diseaseName != ''">搜索词条：<span class="entry">{{diseaseName}}</span><el-divider></el-divider></p>
                <div v-if="diseasesRes.length>0" class="diseasesRes-entry">
                    <span>搜索结果:</span>
                    <ul v-for="(value,index) in diseasesRes" :key="index">
                        <li @click="diseasesDe(deatail.id)">{{value.name}} <i class="el-icon-arrow-right"></i></li>
                    </ul>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'underwritingWiki',
    data(){
        return{
            diseases: [],
            diseaseName:'',
            timeout:null,
            diseasesRes:[
                {id:1201,name:'超重'},
                {id:1202,name:'太瘦'}
            ]
        }
    },
    methods:{
        querySearch(queryString, cb) {
            var disease = this.diseases;
            var results = queryString ? disease.filter(this.createFilter(queryString)) : disease;
            // 调用 callback 返回建议列表的数据
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                    cb(results);
            },  Math.random());
        },
        createFilter(queryString) {
            return (disease) => {
                return (disease.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
            };
        },
        loadAll() {
            return [
            { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
            { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
            { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
            { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
            { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
            { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
            { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
            { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
            { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
            { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
            { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
            { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
            { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
            { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
            { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
            { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
            { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
            { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
            { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
            { "value": "枪会山", "address": "上海市普陀区棕榈路" },
            { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
            { "value": "钱记", "address": "上海市长宁区天山西路" },
            { "value": "壹杯加", "address": "上海市长宁区通协路" },
            { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
            { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
            { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
            { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
            { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
            { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
            { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
            { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
            { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
            { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" }
            ];
        },
        //选择其中的疾病，item为object
        handleSelect(item) {
            console.log(item);
        },
        //返回上一页
        cancel: function(){
            this.$router.go(-1);
        },
        //词条的详情
        diseasesDe: function(){

        }
    },
    mounted() {
      this.diseases = this.loadAll();
    }
}
</script>

<style lang="scss" scoped>
.el-header{
    margin-top: 15px;
    .disease-search-box{
        border: 1px solid #DCDFE6;
        border-radius: 30px;
        position: relative;
        text-align: left;
        width: auto;
        display: inline-block;
        font-size: 13px;
        .el-autocomplete{
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
            border-right: 1px solid #DCDFE6;
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
        }
        .el-button{
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
            font-size: 13px;
            color: #fff;
            background: #528cfc;
            height: 100%;
            border: 2px solid #528cfc;
        }
    }
    .cancel{
        display: inline-block;
        width: 50px;
        margin-left: 4px;
        box-sizing: border-box;
        border: none;
        font-size: 13px;
        color: #528cfc;
    }
}
.el-main{
    padding-top: 0;
    text-align: left;
    .select-entry{
        margin: 0;
        .entry{
            background: #ececec;
            padding: 4px;
            border-radius: 5px;
            line-height: 20px;
            display: inline-block;
        }
    }
    
}
.diseasesRes-entry{
    ul{
        padding: 10px;
        li{
            padding: 5px;
            border-bottom: 1px solid #DCDFE6;
            font-size: 13px;
            .el-icon-arrow-right{
                float: right;
            }
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
.el-autocomplete{
    .el-input__inner{
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        border: none;
        font-size: 13px;
    }
}
</style>