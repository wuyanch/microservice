<template>
    <!-- 卡片式的同一样式组件 -->
    <div class="card-type">
        <ul>
            <li v-for="todo in todosList" :key="todo.id">
                <slot name="todo" v-bind:todo="todo">
                    <!-- 后备内容 -->
                    <b>{{ todo.content }}</b>
                </slot>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'CardType',
    props:['filteredAll'],
    data(){
        return{

        }
    }
}
</script>

<style lang="scss" scoped>

</style>