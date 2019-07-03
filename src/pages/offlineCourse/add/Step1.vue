<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="课程标题"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-input v-decorator="['courseTitle',{rules: [{ required: true, message: '请输入课程标题'}]}]"
            placeholder="请输入课程标题" />
      </a-form-item>

      <a-form-item
        label="副标题"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-input v-decorator="['courseSubTitle',{rules: [{ required: true, message: '请输入副标题'}]}]"
            placeholder="请输入副标题" />
      </a-form-item>

      <a-form-item
        label="课程分类"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-select v-decorator="['courseCategory',{rules: [{ required: true, message: '请选择课程分类'}]}]"
           placeholder="选择课程分类">
          <a-select-option value="1">少儿</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="课时单价"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-input v-decorator="['price',{rules: [{ required: true, message: '请选择课程分类'}]}]"
            prefix="￥" placeholder="请输入课时单价" type="number" />
      </a-form-item>
      <a-form-item
        label="共计课时"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-input v-decorator="['lession',{rules: [{ required: true, message: '课时共计多少节'}]}]"
          placeholder="课时共计多少节" />

      </a-form-item>
     <a-form-item
        label="课程总费用"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <span>3000元</span>
      </a-form-item>
      <a-form-item
        label="设置分享佣金"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-radio-group v-decorator="['isShareBrokerage',{rules: [{ required: true, message: '设置分享佣金'}]}]"
            name="radioGroup" :defaultValue="1">
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
        <a-input v-decorator="['shareBrokerageAmount',{rules: [{ required: true, message: '请输入分享佣金金额'}]}]"
            placeholder="请输入分享佣金金额" />
        <p>分享给好友报名成功后可提现</p>
      </a-form-item>

      <a-form-item
        label="限制人数"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-input v-decorator="['limitStudents',{rules: [{ required: true, message: '输入限制人数'}]}]"
          placeholder="输入限制人数" />
      </a-form-item>
      <a-form-item
        label="主讲教师"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-select v-decorator="['teacher',{rules: [{ required: true, message: '选择主讲教师'}]}]"
           placeholder="选择主讲教师">
          <a-select-option value="1">少儿</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step1',
  data () {
    return {
      form: this.$form.createForm(this)
    };
  },
  methods: {
    nextStep () {
      // this.form.validateFields((err, values) => {});

      // this.$emit('nextStep');
    }
  }
};
</script>

<style scoped>

</style>
