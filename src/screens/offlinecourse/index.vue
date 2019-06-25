<style lang="less" scoped>
.page-offline{
    background-color: white;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .nav-title{
        height: 0.66rem;
        border-bottom: 2px solid #F3F3F3;
        display: flex;
        color: #141414;
        font-size: 0.18rem;
        
        .pagename{
            width: 1.57rem;
            border-right: 1px solid #F3F3F3;
            text-align: center;
            line-height: 0.66rem;
            
        }
    }
    .content{
        flex-grow: 1;
        display: flex;

        .left{
            padding-top: 0.16rem;
            width: 1.57rem;
            border-right: 1px solid #F3F3F3;
            height: 100%;
            font-size: 0.16rem;

            .category-item{
                height: 0.4rem;
                margin: 0.17rem 0;
                text-align: center;
                line-height: 0.4rem;
                cursor: pointer;

                &.active{
                    background-color: #EFFAFF;
                }
            }


        }
        .right{
            flex-grow: 1;
        }
    }
}
</style>

<template>
    <div class="page-offline">
        <div class="nav-title">
            <div class="pagename">
                线下课程
            </div>
            <div class="categoryname">

            </div>
        </div>
        <div class="content">
            <div class="left">
                <div @click="clickCategory(index)" class="category-item" :class="{active:index == cateIndex}" v-for="(item,index) in menus" :key="item">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            menus:["全部","少儿类","中级类","高级类"],
            cateIndex:0
        }
    },
    methods:{
        clickCategory(index)
        {
            this.cateIndex = index;
        }
    }
}
</script>

