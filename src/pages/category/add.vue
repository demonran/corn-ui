<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form" @submit="onsubmit">
      <a-form-item label="分类标题" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input v-decorator="['name']" placeholder="请输入课程分类" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary" @click="onsubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import Category from "@/services/category";
export default {
  data() {
    return {
      id: "",
      form: this.$form.createForm(this)
    };
  },
  activated() {
    this.id = this.$route.query.id || "";
    if (this.id) {
      Category.getItem(this.id).then(res => {
        const data = res.result;
        this.form.setFieldsValue({
          name: data.categoryName
        });
      });
    } else {
      this.form.setFieldsValue({
        name: ""
      });
    }
  },
  methods: {
    onsubmit() {
      let that = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          var params = values;
          if (this.id) {
            params.id = this.id;
            Category.edtItem(params);
          } else {
            Category.add(params);
          }
          that.goResult();
          // window.open("", self);
          window.close();
        }
      });
    },
    goResult() {
      // this.$router.replace("/settings/category/result");
      this.$router.replace("/settings/category");
    }
  }
};
</script>

<style scoped>
</style>
