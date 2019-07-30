<style lang="less" scoped>
.upload-img-preview{
    width: 120px;
    height: 120px;
    object-fit: cover;
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
import Oss from '../../services/oss';

export default {
  data () {
    return {
      loading: false
    };
  },
  props: ['config','value'],

  methods: {
     beforeUpload (file, fileList) {
        this.loading = true;
        Oss.uploadAvatar(file).then(ret=>{
            this.loading = false;
            if( ret.errorNo == 200) {
              console.log( ret );
              this.$emit('change', ret.result);
              return false;
            }
            this.toast(ret.errorDesc);
        })
        return false;
    }
  }
};
</script>
