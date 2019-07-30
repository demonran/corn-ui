<style lang="less" scoped>
.upload-img-preview{
    width: 120px;
}

</style>

<template>
    <a-upload
        name="avatar"
        listType="picture-card"
        class="avatar-uploader"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
        accept=".png,.jpg"
    >
        <img v-if="value" :src="value" alt="avatar" class="upload-img-preview"/>
        <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">上传</div>
        </div>
  </a-upload>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  data () {
    return {
      loading: false
    };
  },
  props: ['config','value'],

  methods: {
    ...mapActions('comm', ['postImages']),

    beforeUpload (file, fileList) {
      this.loading = true;
      this.postImages(fileList).then((ret) => {
        this.loading = false;
        if (ret.length < 1) return;
        
        this.$emit('change', ret[0]);
      });
      return false;
    }
  }
};
</script>
