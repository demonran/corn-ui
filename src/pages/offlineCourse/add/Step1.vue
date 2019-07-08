<style lang="less" scoped>
.add-cate-panel{
  display: flex;
  align-items: center;
}
.add-category-btn{
  margin-left: 4px;
}
</style>
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
        <a-select showSearch v-decorator="['courseCategory',{rules: [{ required: true, message: '请选择课程分类'}]}]"
           placeholder="选择课程分类">
          <a-select-option value="1">少儿</a-select-option>
        </a-select>
        <a-popover trigger="click">
          <template slot="content">
            <div class="add-cate-panel">
               <a-input placeholder="请输入分类名称" size="small" v-model="creatingCateName"/>
               <a-button ghost size="small" class="add-category-btn" type="primary" @click="addCategory">确定</a-button>
            </div>
          </template>
          <a-button ghost size="small" type="primary">添加分类</a-button>
        </a-popover>

      </a-form-item>
      <a-form-item
        label="课时单价"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-input v-decorator="['price',{rules: [{ required: false, message: '请输入课时单价'}]}]"
            prefix="￥" placeholder="请输入课时单价" type="number" />
      </a-form-item>
      <a-form-item
        label="共计课时"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-input v-decorator="['lession',{rules: [{ required: true, message: '课时共计多少节'}]}]"
          placeholder="课时共计多少节" type="number"/>

      </a-form-item>
     <a-form-item
        label="课程总费用"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
         <a-input v-decorator="['totalAmount',{rules: [{ required: true, message: '请输入课程费用'}]}]"
          placeholder="请输入课程费用" type="number"/>
      </a-form-item>
      <a-form-item
        label="设置分享佣金"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <brokerage v-decorator="['brokerage',{
            initialValue: { isSet: 1, money: 0 },
            rules: [{ validator: checkBrokerage }],
          }]">

        </brokerage>

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
        <a-select showSearch v-decorator="['teacher',{rules: [{ required: true, message: '选择主讲教师'}]}]"
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
import brokerage from './brokerage';
import mix from '../../mix';

export default {
  mixins: [mix],
  name: 'Step1',
  components: {brokerage},

  data () {
    return {
      form: this.$form.createForm(this),
      creatingCateName: ''
    };
  },
  methods: {
    nextStep () {
      this.form.validateFields((error, values) => {
        if (error) return;

        this.values = values;
        this.$emit('nextStep');
      });
    },
    checkBrokerage (rule, value, callback) {
      console.log('checkBrokeragecheckBrokeragecheckBrokeragecheckBrokerage');
      if (value.isSet === 0 || (value.isSet === 1 && value.money > 0)) {
        callback();
        return;
      }
      callback('佣金需要大于0!');
    },

    getValues () {
      return this.form.getFieldsValue();
    },

    async addCategory () {
      if (!this.creatingCateName) {
        this.toast('分类不能为空!', true);
        return;
      }
      this.showLoading();

      setTimeout(() => {
        this.hideLoading();
      }, 1000);
    }
  }
};
</script>
