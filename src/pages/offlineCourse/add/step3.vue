<style scoped>
.withfull {
  width: 100%;
}
</style>

<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item label="开始日期" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
        <a-date-picker
          class="withfull"
          v-decorator="['beginDate',{rules: [{ required: true, message: '选择开始日期'}]}]"
        />
      </a-form-item>

      <a-form-item label="结束日期" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
        <a-date-picker
          class="withfull"
          v-decorator="['endDate',{rules: [{ required: true, message: '选择结束日期'}]}]"
          placeholder="选择结束日期"
        />
      </a-form-item>

      <a-form-item label="上课时段" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
        <timeRange
          v-decorator="['classTime',{rules: [{validator: checkTime}], initialValue:{start:'09:30',end:'17:00'}}]"
        />
      </a-form-item>

      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import timeRange from "./timeRange";
import moment from "moment";
export default {
  name: "Step3",
  components: { timeRange },
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  activated() {
    const data = this.$route.params.data;
    console.log("rowData step 3", data);
    // let data = this.$route.params.data;
    if (data) {
      console.log(data.beginDate);

      this.form.setFieldsValue({
        beginDate: moment(data.beginDate, "YYYY-MM-DD"),
        endDate: moment(data.endDate, "YYYY-MM-DD")
      });
      console.log(data.endDate);
    } else {
      this.form.setFieldsValue({
        beginDate: null, // moment(0, "YYYY-MM-DD"),
        endDate: null // moment(0, "YYYY-MM-DD")
      });
    }
  },
  methods: {
    moment,
    resetForm() {
      this.form.resetFields();
    },
    doOnceAgin() {
      this.$emit("finish");
    },
    checkTime(rule, value, callback) {
      if (!value.start || !value.end) {
        callback("时间段必填!");
      }
      callback();
    },
    nextStep() {
      this.form.validateFields((error, values) => {
        if (error) return;
        this.values = {
          beginDate: values.beginDate.format("YYYY-MM-DD"),
          endDate: values.endDate.format("YYYY-MM-DD"),
          startClassTime: values.classTime.start,
          endClassTime: values.classTime.end
        };
        this.$emit("submit");
      });
    },
    prevStep() {
      this.$emit("prevStep");
    }
  }
};
</script>
