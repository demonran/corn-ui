<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form" @submit="onsubmit">
      <a-form-item label="标题" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input
          v-decorator="['name', {rules: [{ required: true, message: '请输入标题' }]}]"
          placeholder="请输入标题"
        />
      </a-form-item>
      <a-form-item label="图片" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :customRequest="uploadimg"
          :beforeUpload="beforeUpload"
          @change="handleChange"
          v-decorator="['image', {rules: [{ required: true, message: '请上传图片' }]}]"
        >
          <img v-if="image" :src="image" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="跳转链接" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input v-decorator="['link']" placeholder="请输入跳转链接" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary" @click="onsubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import Category from "@/services/category";
import Common from "@/services/common"
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
      image: ""
    };
  },
  methods: {
    beforeUpload(file) {
      //   const isJPG = file.type === "image/jpeg";
      //   if (!isJPG) {
      //     this.$message.error("You can only upload JPG file!");
      //   }
      // 暂时只判断图片大小不超过10M
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("图片不要超过10M哟");
      }
      return isLt10M;
    },
    // 上传图片
    uploadimg(option) {
      const formData = new FormData();
      formData.append("file", option.file);
      Common.uploadimg(formData)
    },
    onsubmit() {
      this.$message.info("先不提交");
      //   let that = this;
      //   this.form.validateFields((err, values) => {
      //     if (!err) {
      //       Category.add(values);
      //       that.goResult();
      //       window.open("", self);
      //       window.close();
      //     }
      //   });
    },
    goResult() {
      this.$router.replace("/settings/category/result");
    }
  }
};
</script>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
