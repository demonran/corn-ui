<template>
  <div>
    <a-form style="max-width: 750px; margin: 40px auto 0;">

      <a-form-item
        label="付款账户"
        :labelCol="{span: 2}"
        :wrapperCol="{span: 22}"
        class="stepFormText"
      >
        ant-design@alipay.com
      </a-form-item>
      <a-form-item
        label="图文介绍"
        :labelCol="{span: 2}"
        :wrapperCol="{span: 22}"
        class="stepFormText"
      >
        <tinymce />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" @click="nextStep">下一步</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import tinymce from '@/components/tinymce';

export default {
  name: 'Step2',
  components: {tinymce},
  data () {
    return {
      loading: false
    };
  },
  methods: {
    nextStep () {
      let _this = this;
      _this.$emit('nextStep');
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
