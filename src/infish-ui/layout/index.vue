<template>
    <div class="page">
        <slot></slot>
    </div>
</template>

<script>
export default {
  methods: {},
  mounted() {}
};

</script>

<style lang="less">
.page{
    height: 100%;
    .page-header{
        height: @layout-header-height;
    }
    .page-content{
        height: 100%;
    }
    .page-header + .page-content{
        height: calc(~'100% - '@layout-header-height);
    }
}
</style>