<style scoped>
.withfull{
  width: 100%;
}
</style>

<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
 <!--     <a-form-item>
        <a-date-picker
        :value="beginDate"
        :format="dateFormat"
          v-decorator="[
            'beginDate',
              { rules:
                [
                  { required: true}
                ],

              }
          ]"/>
      </a-form-item> -->


      <a-form-item
        label="开始日期"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
        style="position: relative;"
      >
        <a-date-picker class="withfull"  @change="onChange"
        :defaultValue="moment('2010.01.01', dateFormat)" :format="dateFormat"
         v-decorator="['endDate',{rules:[{ required: false,}]}]"
              />
      </a-form-item>
      <a-form-item
        label="结束日期"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
        style="position: relative;"
      >
        <a-date-picker class="withfull"  @change="onChange"
        :defaultValue="moment('2020.01.01', dateFormat)" :format="dateFormat"
         v-decorator="['endDate',{rules:[{ required: false,}]}]"
              />
      </a-form-item>
      <a-form-item
        label="上课时段"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
       <timeRange v-decorator="['classTime',{rules: [], initialValue:{start:'09:30',end:'17:00'}}]"/>
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
      dateFormat: 'YYYY.MM.DD',
      end:''
    };
  },

mounted() {

  console.log('rowData step 3',this.$route.params.data)
  let data = this.$route.params.data
this.beginDate = data.beginDate
this.endDate = data.endDate
//moment('2010.01.01', dateFormat)


console.log('this.beginDate',this.beginDate)
console.log('this.endDate',this.endDate)

},

  methods: {
    moment,
    getbegin(){
      return new Date().toLocaleDateString();
    },
    onChange(date, dateString) {
            console.log(date, dateString);
            this.beginDate = dateString
            this.endDate = dateString
            console.log('begin:',this.beginDate)
    },
    doOnceAgin () {
      this.$emit('finish');
    },
    nextStep () {
      this.form.validateFields((error, values) => {
        if (error) return;
        this.values = {
           beginDate: values.beginDate.format('YYYY.MM.DD'),
          endDate: values.endDate.format('YYYY.MM.DD'),
          /* beginDate: values.beginDate,
          endDate: values.endDate, */

          startClassTime: values.classTime.start,
          endClassTime: values.classTime.end,
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
<style>
  .date{
    osition: absolute;
        left: 8px;
        top: 0px;
        /* background: red; */
        z-index: 2;
        display: block;
        width: auto;
        padding: 0;
        margin: 0;
        border: none;
        height: auto;
  }
</style>
