<template>
    <a-upload
        listType="picture-card"
        class="avatar-uploader"
        :showUploadList="false"
        :customRequest="uploadImg"
        accept=".png,.jpg,.mp4"
    >
        <img v-if="image" :src="image" alt="image" class="upload-img-preview"/>
        <img v-else-if="value" :src="value" alt="image" class="upload-img-preview"/>
        <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">上传</div>
        </div>
  </a-upload>
</template>
<script>
import {mapActions} from 'vuex';
import CommonRequest from "@/services/common";
import comm from "@/pages/mix";
export default {
  mixins: [comm],
  data () {
    return {
      loading: false,
      image: undefined
    };
  },

  props: {
    value: String
  },
  methods: {
    ...mapActions('comm', ['postImages']),


    // 上传图片
    uploadImg(option) {
      const formData = new FormData();
      formData.append("file", option.file);
      this.loading = true;
      this.showLoading();
      CommonRequest.uploadImg(formData)
        .then(res => {
          console.log("res:", res);
          this.image = res.result;
          this.$emit("success", this.image);
        })
        .catch(e => {
          console.log("something error");
        })
        .finally(e => {
          this.loading = false;
          this.hideLoading();
        });
    },

  }
};
</script>
<style lang="less" scoped>
  .upload-img-preview{
    width: 120px;
  }

</style>
