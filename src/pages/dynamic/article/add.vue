<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form" @submit="onsubmit">
      <a-form-item label="文章标题" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input
          v-decorator="['title', {rules: [{ required: true, message: '请输入文章标题' }]}]"
          placeholder="请输入文章标题"
        />
      </a-form-item>
      <a-form-item label="文章摘要" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input
          v-decorator="['content', {rules: [{ required: true, message: '请输入文章摘要' }]}]"
          placeholder="请输入文章摘要"
        />
      </a-form-item>
      <a-form-item label="所属分类" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <!-- <a-input
          v-decorator="['teachCategory', {rules: [{ required: true, message: '请输入教学类型' }]}]"
          placeholder="请输入教学类型"
        />-->
        <a-select
          class="style_input"
          placeholder="请选择所属分类"
          :allowClear="true"
          v-decorator="['categoryId', {rules: [{ required: true, message: '请选择所属分类' }]}]"
        >
          <a-select-option
            v-for="(item, index) in categoryList"
            :key="index"
            :value="item.categoryId"
          >{{item.categoryName}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="作品图片" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action
          accept=".jpg, .jpeg, .gif, .png, .bmp"
          :customRequest="uploadimg"
          :beforeUpload="beforeUpload"
          v-decorator="['cover', {rules: [{ required: true, message: '请上传图片' }]}]"
        >
          <img class="imgshow" v-if="cover" :src="cover" alt="cover" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="是否推荐到首页" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="['recommend', {rules: [{ required: true, message: '请选择' }]}]"
        >
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="详细内容" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <div
          style="width:550px"
          ref="editor"
          v-decorator="['description', {rules: [{ required: true, message: '请填写详细内容' }]}]"
        ></div>
      </a-form-item>
      <!-- <a-form-item label="是否启用" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="['weather', {rules: [{ required: true, message: '请选择' }]}]"
        >
          <a-radio value="0">否</a-radio>
          <a-radio value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>-->
      <a-form-item :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary" @click="onsubmit">保存</a-button>
        <!-- <a-button style="margin-left:10px" @click="cancelClick">取消</a-button> -->
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import Category from "@/services/category";
import ArticleRequest from "@/services/article";
import CommonRequest from "@/services/common";
import CategoryRequest from "@/services/category";
import comm from "../../mix";
import E from "wangeditor";

export default {
  mixins: [comm],
  data() {
    return {
      id: "",
      form: this.$form.createForm(this),
      loading: false,
      categoryList: [], // 课程分类
      cover: "",
      description: ""
    };
  },
  activated() {
    this.id = this.$route.query.id || "";
    if (this.id) {
      // 这是编辑
      ArticleRequest.getItem(this.id)
        .then(res => {
          console.log("getItem:", res);
          const data = res.result;
          this.form.setFieldsValue({
            content: data.content,
            description: data.description,
            cover: data.cover,
            categoryId: data.category.id,
            recommend: data.recommend ? 1 : 0,
            title: data.title
          });
          this.cover = data.cover;
          this.description = data.description;
          this.editor.txt.html(data.description);
        })
        .catch(e => {
          console.log("error:", e);
        });
    } else {
      this.form.setFieldsValue({
        content: "",
        description: "",
        cover: "",
        categoryId: "",
        recommend: null,
        title: ""
      });
      this.cover = "";
      this.description = "";
      this.editor.txt.html("");
    }
    CategoryRequest.categoryList()
      .then(res => {
        this.categoryList = res.result;
      })
      .catch(e => {});
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
            insert(res.result);
          })
          .catch(e => {
            that.toast(e, true);
            console.log("something error", e);
          });
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
      this.showLoading();
      CommonRequest.uploadImg(formData)
        .then(res => {
          console.log("res:", res);
          this.cover = res.result;
        })
        .catch(e => {
          console.log("something error");
        })
        .finally(e => {
          this.loading = false;
          this.hideLoading();
        });
    },
    onsubmit() {
      let that = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          var param = Object.assign(values);
          param.cover = this.cover;
          param.recommend = param.recommend === 1;
          if (that.id) {
            //编辑
            param.id = this.id;
            ArticleRequest.edtItem(param)
              .then(res => {
                that.toast("修改成功");
                that.goResult();
              })
              .catch(e => {
                console.log("error:", e);
              });
          } else {
            ArticleRequest.add(param)
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
    cancelClick() {
      // todo
    },
    goResult() {
      this.$router.replace("/dynamic/article");
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
