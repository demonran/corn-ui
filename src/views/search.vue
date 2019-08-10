<style lang="less" scoped>
.search-pannel{
    display: flex;
    align-items: center;

    .btn-search{
        margin-left: 10px;
        margin-right: 4px;
    }
}
</style>

<template>
    <div class="search-pannel">
        <div v-for="(item,index) in config" :key="index">
            <component v-bind:is="item.ui.name" :config="item" v-model="item.value" ></component>
        </div>
        <a-button type="primary" class="btn-search"  @click="clickSearch">搜索</a-button>
        <a-button type="primary"  @click="reset">重置</a-button>
    </div>
</template>
<script>
export default {
    props:['config'],
    
    data() {
        return {

        }
    },

    methods:{
        clickSearch(){
            let value = {};
            this.config.forEach(el => {
                value[el.name] = el.value;
            });

            this.$emit('search', value);
        },

        reset() {  
            this.$emit('reset');
        }
    }
}
</script>
