<template>
    <div>
        <editor id="tinymceEditor" :init="tinymceInit" v-model="content" :key="tinymceFlag"></editor>
    </div>
</template>
<script>
import 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/fullscreen';

export default {
  props: {
    value: String
  },

  data () {
    return {
      content: '',
      tinymceFlag: 1,
      tinymceInit: {}
    };
  },
  mounted () {
    this.content = this.value;
  },

  watch: {
    value (val) {
      if (this.content != this.value) {
        this.content = (!this.value ? '' : this.value);
      }
    },
    content () {
      // console.log("changing", this.content);
      this.$emit('change', this.content);
    }
  },
  created () {
    this.tinymceInit = {
      skin_url: './static/tinymce/skins/ui/oxide',
      language: 'en',
      height: document.body.offsetHeight - 300,
      branding: false, // 去水印
      // elementpath: false,  //禁用编辑器底部的状态栏
      statusbar: false, // 隐藏编辑器底部的状态栏
      paste_data_images: true, // 允许粘贴图像
      menubar: false, // 隐藏最上方menu
      plugins: 'advlist table lists paste preview fullscreen',
      toolbar: 'h1 forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | preview fullscreen',
      /**
         * 下面方法是为tinymce添加自定义插入图片按钮
         * 借助iview的Upload组件,将图片先上传到存储云上，再将图片的存储地址放入编辑器内容
         */
      setup: (editor) => {
        // editor.ui.registry.addButton('imageUpload', {
        // // text: '插入图片',
        // tooltip: '插入图片',
        // icon: 'image',
        // onAction: () => {
        //     let upload = that.$refs.imageUpload
        //     upload.handleClick()
        // }
        // })
      }
    };
  },
  components: {Editor},
  activated () {
    this.tinymceFlag++;
  },
  methods: {
    change (value) {
      console.log('changing', value);
    }
  }
};
</script>
