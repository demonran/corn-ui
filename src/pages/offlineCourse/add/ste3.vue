<style scoped>
.withfull{
  width: 100%;
}
</style>

<template>
  <div>
     <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">

       <a-date-picker
             :disabledDate="disabledStartDate"
             showTime
             format="YYYY.MM.DD"
             v-model="beginDate"
             placeholder="Start"
             @openChange="handleStartOpenChange"
             :defaultValue="moment(beginDate, dateFormat)"
           />
           <a-date-picker
             :disabledDate="disabledEndDate"
             showTime
             format="YYYY.MM.DD"
             placeholder="End"
             v-model="endDate"
             :open="endOpen"
             @openChange="handleEndOpenChange"
             :defaultValue="moment('2015/01/01', dateFormat)"
           />

<!--    <a-form-item
        label="开始日期"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
      <a-date-picker class="withfull" v-decorator="['beginDate',{rules:
      [{ required: true, message: '900'}],
initialValue: '2010.09.08'
      }]"
            placeholder="选择开始日期"/>
      </a-form-item>

       <a-form-item
        label="结束日期"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
      <a-date-picker class="withfull" v-decorator="['endDate',{rules:
      [{ required: true, message: '选择结束日期'}],

      }]"
            placeholder="选择结束日期"/>
      </a-form-item> -->
<!--
      <a-form-item
        label="上课时段"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
       <timeRange v-decorator="['classTime',{rules: [], initialValue:{start:'09:30',end:'17:00'}}]"/>
      </a-form-item> -->

      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import timeRange from './timeRange';
import moment from 'moment';
export default {
  name: 'Step3',
  components: {timeRange},
  data () {
    return {
      //form: this.$form.createForm(this),
      beginDate: null,
      endDate: null,
      endOpen: false,
      dateFormat: 'YYYY.MM.DD'
    };
  },

mounted() {
  //this.form.setFieldsValue(this.$route.params.data);
  console.log('rowData step 3',this.$route.params.data)
  //this.form.setFieldsValue(this.$route.params.data);
 // this.beginDate = this.$route.params.data.beginDate
  //this.endDate = this.$route.params.data.endDate
  //let start = this.$route.params.data.beginDate
  //let end = this.$route.params.data.endDate
/* let value={}
value['beginDate'] = this.$route.params.data.beginDate
value['endDate'] = this.$route.params.data.endDate

this.form.setFieldsValue(value);
  console.log(value) */
},

  methods: {
    doOnceAgin () {
      this.$emit('finish');
    },
    nextStep () {
    /*  this.form.validateFields((error, values) => {
        if (error) return;
        this.values = {
         beginDate: values.beginDate.format('YYYY.MM.DD'),
          endDate: values.endDate.format('YYYY.MM.DD'),
           beginDate: values.beginDate,
          endDate: values.endDate,

          startClassTime: values.classTime.start,
          endClassTime: values.classTime.end};

        this.$emit('submit');
      }); */
      let values = {
        "beginDate":this.beginDate,
        "endDate":this.endDate
      }
      this.$emit('submit');
    },
    prevStep () {
      this.$emit('prevStep');
    },



    //
    disabledStartDate(beginDate) {
            const endDate = this.endDate;
            if (!beginDate || !endDate) {
              return false;
            }
            return beginDate.valueOf() > endDate.valueOf();
          },
          disabledEndDate(endDate) {
            const beginDate = this.beginDate;
            if (!endDate || !beginDate) {
              return false;
            }
            return beginDate.valueOf() >= endDate.valueOf();
          },
          handleStartOpenChange(open) {
            if (!open) {
              this.endOpen = true;
            }
          },
          handleEndOpenChange(open) {
            this.endOpen = open;
          }
  }
};
</script>
