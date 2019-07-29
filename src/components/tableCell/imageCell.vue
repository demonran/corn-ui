<style lang="less" scoped>
.imgacell{
    width: 76px;
    height: 76px;
    object-fit: cover;
}

</style>

<template>
    <img :src="config.text" alt="" class="imgacell">
</template>
<script>
export default {
  props: ['config']
};
</script>
