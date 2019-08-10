<style lang="less" scoped>
.actions-pannel{
    display: flex;
    align-items: center;

    .action-btn {
        margin-left: 4px;
        margin-right: 4px;
    }
}
</style>

<template>
    <div class="actions-pannel">
        <div v-for="item in config" :key="item.name">
            <a-button type="primary" class="action-btn"  @click="clickBtn(item)">{{item.name}}</a-button>
        </div>
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
        clickBtn(item) {
            if( item.click ) {
                item.click();
            }
            this.$emit('clickAction', item);
        },
    }
}
</script>
