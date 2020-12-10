<template>

  <a-modal
    :title="crud.status.title"
    :visible="crud.status.cu > 0"
    :confirm-loading="crud.status.cu == 2"
    @cancel="crud.cancelCU"
    @ok="crud.submitCU"
  >
    <a-form-model ref="form" :rules="rules" :label-col="{span:4}" :wrapper-col="{span:20}" :model="form">
      <a-form-model-item label="文章标题" >
        <a-input placeholder="请输入文章标题" v-model="form.title"/>
      </a-form-model-item>
      <a-form-model-item label="文章摘要" >
        <a-input placeholder="请输入文章摘要" v-model="form.description"/>
      </a-form-model-item>
      <a-form-model-item label="所属分类" >
        <a-select
          class="style_input"
          placeholder="请选择所属分类"
          :allowClear="true"
          v-model="form.categoryId">
          <a-select-option
            v-for="(item, index) in categoryList"
            :key="index"
            :value="item.categoryId"
          >{{item.categoryName}}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="作品图片" >
        <upload-img :value="form.image"  @success="uploadSuccess" />
      </a-form-model-item>

      <a-form-model-item label="是否推荐到首页" >
        <a-radio-group buttonStyle="solid" v-model="form.recommend">
          <a-radio value=false>否</a-radio>
          <a-radio value=true>是</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="详细内容">
        <div
          style="width:550px"
          ref="editor"
          v-model="form.content"
        ></div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>


</template>

<script>
import ArticleRequest from "@/services/article";
import CommonRequest from "@/services/common";
import CategoryRequest from "@/services/category";
import comm from "../../mix";
import CRUD, {form} from "@/components/Crud/curd";
import E from "wangeditor";

export default {
  mixins: [comm, form({})],
  data() {
    return {
      categoryList: [],
      rules: {
        title: [{required: true, message: '请输入文章标题'}],
      },
    };
  },

  mounted() {
    this.seteditor();
  },
  methods: {
    [CRUD.HOOK.beforeToCU]() {
      this.getCategoryList()
    },
    getCategoryList() {
      CategoryRequest.categoryList()
        .then(res => {
          this.categoryList = res.result;
        })
        .catch(e => {
        });
    },
    uploadSuccess(image) {
      this.form.image = image
    },
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
