<template>
  <div>
    <a-form :form="form" style="max-width: 750px; margin: 40px auto 0;">
      <a-form-item label="图片地址" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action
          accept=".jpg, .jpeg, .gif, .png, .bmp"
          :customRequest="uploadimg"
          :beforeUpload="beforeUpload"
          v-decorator="['imageUrl', {rules: [{ required: true, message: '请上传图片' }]}]"
        >
          <img class="imgshow" v-if="imageUrl" :src="imageUrl" alt="imageUrl" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="图文介绍" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <div
          style="width:550px"
          ref="editor"
          v-decorator="['content', {rules: [{ required: true, message: '请填写图文介绍' }]}]"
        ></div>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import tinymce from "@/components/tinymce/tinymce.vue";
import { mapActions } from "vuex";
import E from "wangeditor";
import CommonRequest from "@/services/common";
import comm from "../../mix";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: "Step2",
  mixins: [comm],
  components: { tinymce },
  data() {
    return {
      form: this.$form.createForm(this),
      imageUrl: "",
      content: "",
      loading: false
    };
  },
  mounted() {
    this.seteditor();
  },
  activated() {
    var data = this.$route.params.data;
    if (data) {
      this.form.setFieldsValue({
        imageUrl: data.imageUrl,
        content: data.content
      });
      this.imageUrl = data.imageUrl;
      this.content = data.content;
      this.editor.txt.html(data.content);
      console.log("rowData step 2", this.$route.params.data);
    } else {
      this.form.setFieldsValue({
        imageUrl: "",
        content: ""
      });
      this.imageUrl = "";
      this.content = "";
      this.editor.txt.html("");
    }
  },
  methods: {
    seteditor() {
      this.editor = new E(this.$refs.editor);
      this.editor.customConfig.uploadImgShowBase64 = false; // base 64 存储图片
      this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024; // 将图片大小限制为 1M
      this.editor.customConfig.uploadImgMaxLength = 1; // 限制一次最多上传 1 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
      this.editor.customConfig.zIndex = 1;
      this.editor.customConfig.pasteFilterStyle = false;

      // 配置菜单
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        // 'list', // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        // 'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        "undo", // 撤销
        "redo", // 重复
        "fullscreen" // 全屏
      ];
      const that = this;
      this.editor.customConfig.customAlert = function(info) {
        if (info.indexOf("图片验证未通过") !== -1) {
          alert("服务器带宽限制图片不能超过1M，请重新选择");
        } else {
          alert(info);
        }
      };
      this.editor.customConfig.customUploadImg = function(files, insert) {
        const file = files[0];
        const params = new FormData();
        params.append("file", file);
        CommonRequest.uploadImg(params)
          .then(res => {
            console.log("res:", res);
            insert(res.result);
          })
          .catch(e => {
            that.toast(e, true);
            console.log("something error", e);
          })
      };
      this.editor.customConfig.onchange = html => {
        this.content = html; // 绑定当前逐渐地值
        this.form.setFieldsValue({
          content: html
        });
      };
      // 创建富文本编辑器
      this.editor.create();
    },
    resetForm() {
      this.form.resetFields();
    },
    beforeUpload(file) {
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
      this.showLoading();
      CommonRequest.uploadImg(formData)
        .then(res => {
          console.log("res:", res);
          this.imageUrl = res.result;
        })
        .catch(e => {
          console.log("something error");
          this.form.setFieldsValue({ imageUrl: "" });
        })
        .finally(e => {
          this.loading = false;
          this.hideLoading();
        });
    },
    nextStep() {
      this.form.validateFields((error, values) => {
        if (error) return;

        this.values = values;
        this.values.imageUrl = this.imageUrl;
        this.$emit("nextStep");
      });
    },
    prevStep() {
      this.$emit("prevStep");
    }
  }
};
</script>

<style lang="less" scoped>
.stepFormText {
  margin-bottom: 24px;
  :global {
    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }
}
.avatar-uploader {
  width: 128px;
  height: 128px;
  .imgshow {
    width: 128px;
    height: 128px;
  }
}
</style>
