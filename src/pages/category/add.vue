<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form" @submit="onsubmit">
      <a-form-item
        label="分类标题"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input  v-decorator="['name']" placeholder="请输入课程分类" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary" @click="onsubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
  import Category from '@/services/category'
  export default {
    data () {
      return {
        form: this.$form.createForm(this),
      };
    },
    methods: {
      onsubmit() {
        this.form.validateFields((err, values) => {
          if (!err) {
           Category.add(values)
          }
        });

      }
    }
  };
</script>

<style scoped>

</style>
