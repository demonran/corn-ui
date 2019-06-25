<template>
    <div class="page-header">
        <div class="header-left">
            <icon type="left" v-if="withBack" @click.native="back"/>
        </div>
        <div class="header-content">
            {{title}}
        </div>
        <div class="header-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
import icon from "../icon"


export default {
    components: {
        icon
    },
    props: {
        withBack: {
            type: Boolean,
            default: true
        },
        title: String
    },
    methods: {
        back(){
            Infish.popWind();
        }
    },
    mounted() {}
};

</script>

<style lang="less">
.page-header{
    display: flex;

    .header-left,.header-right{
        width: @layout-header-height;
        height: @layout-header-height;
    }

    .header-content{
        flex: 1;
        text-align: center;
        font-weight: bold;
        height: @layout-header-height;
        line-height: @layout-header-height;
        color: @layout-header-content-color;
        font-size: @layout-header-content-size;
    }

    .header-left{
        text-align: center;
        line-height: @layout-header-height;
        font-size: .5rem
    }
    .header-right{
        text-align: center;
        line-height: @layout-header-height;
        font-size: .5rem
    }
}
</style>