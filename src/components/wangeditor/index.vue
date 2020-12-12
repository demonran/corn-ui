<template>
    <div ref="editor"></div>
</template>

<script>
  import E from "wangeditor";
  import CommonRequest from "@/services/common";

  export default {
    name: "WangEditor",

    props: ['value'],

    mounted() {
      this.seteditor();
      this.editor.txt.html(this.value);
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
          this.$emit('setEditorValue',html);

        };
        // 创建富文本编辑器
        this.editor.create();
      },
    }

  }
</script>

<style scoped>

</style>
