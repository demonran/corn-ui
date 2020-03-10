<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form" @submit="onsubmit">
      <a-form-item label="标题" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input
          v-decorator="['title', {rules: [{ required: true, message: '请输入标题' }]}]"
          placeholder="请输入标题"
        />
      </a-form-item>
      <a-form-item label="图片" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action
          accept=".jpg, .jpeg, .gif, .png, .bmp"
          :customRequest="uploadimg"
          :beforeUpload="beforeUpload"
          v-decorator="['image', {rules: [{ required: true, message: '请上传图片' }]}]"
        >
          <img class="imgshow" v-if="image" :src="image" alt="avatar" />
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
import BannerRequest from "@/services/banner";
import CommonRequest from "@/services/common";
import comm from "../../mix";
export default {
  mixins: [comm],
  data() {
    return {
      id: "",
      form: this.$form.createForm(this),
      loading: false,
      image: ""
    };
  },
  activated() {
    this.id = this.$route.query.id || "";
    if (this.id) {
      // 这是编辑
      BannerRequest.bannerItem(this.id)
        .then(res => {
          console.log("bannerItem:", res);
          const data = res.result;
          this.form.setFieldsValue({
            title: data.title,
            link: data.link,
            image: data.image
          });
          this.image = data.image;
        })
        .catch(e => {
          console.log("error:", e);
        });
    } else {
      this.form.setFieldsValue({
        title: "",
        link: "",
        image: ""
      });
      this.image = "";
    }
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
      this.loading = true;
      CommonRequest.uploadImg(formData)
        .then(res => {
          console.log("res:", res);
          this.image = res.result;
        })
        .catch(e => {
          console.log("something error");
        })
        .finally((this.loading = false));
    },
    onsubmit() {
      let that = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          var param = Object.assign(values);
          param.image = this.image;
          if (that.id) {
            //编辑
            param.id = this.id;
            BannerRequest.bannerEdtItem(param)
              .then(res => {
                that.toast("修改成功");
                that.goResult();
              })
              .catch(e => {
                console.log("error:", e);
              });
          } else {
            BannerRequest.add(param)
              .then(res => {
                that.toast("新增成功");
                that.goResult();
                // window.close();
              })
              .catch(e => {
                console.log("error:", e);
              });
          }
        }
      });
    },
    goResult() {
      this.$router.replace("/dynamic/banner");
    }
  }
};
</script>

<style scoped lang="less">
.avatar-uploader {
  width: 128px;
  height: 128px;
  .imgshow {
    width: 128px;
    height: 128px;
  }
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
