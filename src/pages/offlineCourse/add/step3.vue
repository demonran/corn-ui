<style scoped>
.withfull{
  width: 100%;
}
</style>

<template>
  <div>
     <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">

<a-form-item>
<a-date-picker :defaultValue="moment(beginDate, dateFormat)" :format="dateFormat"
v-decorator="[
                          'beginDate',
                          { rules:
                                [
                                    { required: true, message: '请输入您的账号!' }
                                ],
              
                          }
                        ]"
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
import timeRange from './timeRange';
import moment from 'moment';
export default {
  name: 'Step3',
  components: {timeRange},
  data () {
    return {
      form: this.$form.createForm(this),
      beginDate: null,
      endDate: null,
      endOpen: false,
      dateFormat: 'YYYY.MM.DD'
    };
  },

mounted() {

  console.log('rowData step 3',this.$route.params.data)
this.beginDate = this.$route.params.data.beginDate
},

  methods: {
    moment,
    onChange(date, dateString) {
            console.log(date, dateString);
            this.beginDate = dateString
            console.log('begin:',this.beginDate)
    },
    doOnceAgin () {
      this.$emit('finish');
    },
    nextStep () {
  this.form.validateFields((error, values) => {
        if (error) return;
        this.values = {
       /*  beginDate: values.beginDate.format('YYYY.MM.DD'),
          endDate: values.endDate.format('YYYY.MM.DD'), */
           beginDate: values.beginDate.format('YYYY.MM.DD'),
         // endDate: values.endDate,

     /*     startClassTime: values.classTime.start,
          endClassTime: values.classTime.end, */

          };

        this.$emit('submit');
      });
    },
    prevStep () {
      this.$emit('prevStep');
    }

  }
};
</script>
