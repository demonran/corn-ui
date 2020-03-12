<template>
  <page-layout title="banner设置">
    <a-card class="course-list" :body-style="{padding: '10px'}" :bordered="true">
      <a-form :form="form" @submit="onsubmit">
        <a-form-item label="机构名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            :disabled="isEdtName"
            v-decorator="['name', {rules: [{ required: true, message: '请输入机构名称' }]}]"
            placeholder="请输入机构名称"
          />
        </a-form-item>
        <a-form-item label="幻灯图片" :labelCol="{span: 5}" :wrapperCol="{span: 12}">
          <a-upload
            name="avatar"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            action
            accept=".jpg, .jpeg, .gif, .png, .bmp"
            :customRequest="uploadimg"
            :beforeUpload="beforeUpload"
            v-decorator="['cover', {rules: [{ required: true, message: '请上传' }]}]"
          >
            <img class="imgshow" v-if="cover" :src="cover" alt="cover" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="机构简介" :labelCol="{span: 5}" :wrapperCol="{span: 12}">
          <div
            ref="editor"
            style="width:550px"
            v-decorator="['description', {rules: [{ required: true, message: '请填写机构简介' }]}]"
          ></div>
        </a-form-item>
        <a-form-item label="联系电话" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input v-decorator="['tel', { rules: [{ required: true, message: '请输入联系电话' }] }]" />
        </a-form-item>
        <a-form-item label="地址" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input v-decorator="['address', { rules: [{ required: true, message: '请输入详细地址' }] }]" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" @click="onsubmit">保存</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import InfoRequest from "@/services/information";
import CommonRequest from "@/services/common";
import E from "wangeditor";
import comm from "../../mix";

export default {
  name: "PageView",
  mixins: [comm],
  components: { PageLayout },
  data() {
    return {
      id: "",
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      cover: "",
      loading: false
    };
  },
  computed: {
    isEdtName() {
      return this.form.getFieldValue("name") ? false : true;
    }
  },
  activated() {
    // 获取机构信息
    InfoRequest.getItem()
      .then(res => {
        console.log("infoItem:", res);
        const data = res.result;
        this.form.setFieldsValue({
          address: data.address,
          cover: data.cover,
          description: data.description,
          name: data.name,
          tel: data.tel
        });
        this.cover = data.cover;
        this.description = data.description;
        this.editor.txt.html(this.description);
      })
      .catch(e => {
        console.log("error:", e);
      });
  },
  mounted() {
    this.seteditor();
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
            insert(res.data.url);
          })
          .catch(e => {
            that.toast(e, true);
            console.log("something error", e);
          })
          .finally((this.loading = false));
      };
      this.editor.customConfig.onchange = html => {
        this.description = html; // 绑定当前逐渐地值
        this.form.setFieldsValue({
          description: html
        });
      };
      // 创建富文本编辑器
      this.editor.create();
    },
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
          this.cover = res.result;
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
          param.description = this.description;
          param.cover = this.cover;
          console.log(param);
          //编辑
          InfoRequest.edtItem(param)
            .then(res => {
              that.toast("修改成功");
            })
            .catch(e => {
              console.log("error:", e);
            });
        }
      });
    }
  }
};
</script>


<style lang="less" scoped>
.btn {
  margin-top: 3px;
}
.avatar-uploader {
  width: 128px;
  height: 128px;
  .imgshow {
    width: 128px;
    height: 128px;
  }
}
.search-btn {
  margin-left: 14px;
  margin-right: 9px;
}

.course-list {
  min-height: ~"calc(100vh - 320px)";
}

.table {
  border: 1px solid #e8e8e8;

  td {
    padding: 0 !important;
  }
}

.btn.fr {
  float: right;
  margin-left: 5px;
}
</style>
