<template>
  <a-modal
    :title="crud.status.title"
    :visible="crud.status.cu > 0"
    :confirm-loading="crud.status.cu == 2"
    @cancel="crud.cancelCU"
    @ok="crud.submitCU">

    <a-form-model ref="form" :rules="rules" :label-col="{span:4}" :wrapper-col="{span:20}" :model="form">
      <a-form-model-item label="标题" >
        <a-input placeholder="请输入标题" v-model="form.title"/>
      </a-form-model-item>
      <a-form-model-item label="图片" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          accept=".jpg, .jpeg, .gif, .png, .bmp"
          :customRequest="uploadimg"
          :beforeUpload="beforeUpload"
        >
          <img class="imgshow" v-if="form.image" :src="form.image" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
          </div>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item label="跳转链接">
        <a-input v-model="form.link" placeholder="请输入跳转链接" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import CommonRequest from "@/services/common";
import comm from "../../mix";
import CRUD, {form} from "@/components/Crud/curd";

const defaultForm = {title: '', image: '', link: ''}
export default {
  mixins: [comm, form(defaultForm)],
  data() {
    return {
      id: "",
      loading: false,
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        permission: [
          {required: true, message: '请输入权限', trigger: 'blur'}
        ]
      }
    };
  },

  methods: {
    [CRUD.HOOK.beforeToCU](crud){
    },
    beforeUpload(file) {
      //   const isJPG = file.type === "image/jpeg";
      //   if (!isJPG) {
      //     this.$message.error("You can only upload JPG file!");
      //   }
      // 暂时只判断图片大小不超过10M
      // const isLt10M = file.size / 1024 / 1024 < 10;
      // if (!isLt10M) {
      //   this.$message.error("图片不要超过10M哟");
      // }
      // return isLt10M;
      return true
    },
    // 上传图片
    uploadimg(option) {
      const formData = new FormData();
      formData.append("file", option.file);
      this.loading = true;
      CommonRequest.uploadImg(formData)
        .then(res => {
          console.log("res:", res);
          this.form.image = res.result;
        })
        .catch(e => {
          console.log("something error");
        })
        .finally((this.loading = false));
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
