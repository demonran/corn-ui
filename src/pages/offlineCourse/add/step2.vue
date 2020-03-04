<template>
  <div>
    <a-form :form="form" style="max-width: 750px; margin: 40px auto 0;">
    <a-form-item label="图片地址" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input v-decorator="['imageUrl']" placeholder="请输入图片链接" />
      </a-form-item>
      <a-form-item>
        <tinymce  v-decorator="['content',{rules: [{ required: true, message: '输入课程详情'}]}]" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import tinymce from '@/components/tinymce/tinymce.vue';
import {mapActions} from 'vuex';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
export default {
  name: 'Step2',
  components: {tinymce},
  data () {
    return {
      form: this.$form.createForm(this),
    };
  },
mounted() {
  this.form.setFieldsValue(this.$route.params.data);
  console.log('rowData step 2',this.$route.params.data)
},
  methods: {

    nextStep () {
      this.form.validateFields((error, values) => {
        if (error) return;

        this.values = values;
        this.$emit('nextStep');
      });
    },
    prevStep () {
      this.$emit('prevStep');
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
</style>
