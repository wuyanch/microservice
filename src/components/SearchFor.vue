<template>
    <div class="selectData">
        <!-- 搜索的组件 -->
        <el-select v-model="value" clearable placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <slot>
            
        </slot>
    </div>
</template>

<script>
export default {
    name:'SearchFor',
    props:['selectData'],
    data(){
        return{

        }
    },
    methods:{

    },
    computed:{

    }
}
</script>