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


    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;"  >
      <a-form-item
        label="课程标题"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-input v-decorator="['courseName',{rules: [{ required: false, message: '请输入课程标题'}]}]"
            placeholder="请输入课程标题"/>
      </a-form-item>

      <a-form-item
        label="副标题"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-input v-decorator="['courseSubTitle',{rules: [{ required: false, message: '请输入副标题'}]}]"
            placeholder="请输入副标题" />
      </a-form-item>



        <a-form-item label="课程分类" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select   @change="handleChange"
          v-decorator="[
            'courseCategoryId',
            { rules: [{ required: false}] ,
                initialValue: categoryName
            },
            ]"
          >
                <!-- <a-select-option :value="item.categoryId" placeholder="请选择课程分类"
                v-for="(item,i) in categories"

                >
                  {{item.categoryName}}
                </a-select-option> -->

              </a-select>

          <!--
              <a-select default-value="1"
                v-decorator="[
                  'courseCategoryId',
                  { rules: [{ required: true, message: '请选择课程分类' }] },
                ]"
                placeholder="请选择课程分类"

              >
                <a-select-option  :value="item.categoryId" v-for="(item,i) in categories" :key="i">
                  {{item.categoryName}}
                </a-select-option>
              </a-select> -->
            </a-form-item>

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
        <a-input v-decorator="['lesson',{rules: [{ required: false, message: '课时共计多少节'}]}]"
          placeholder="课时共计多少节" type="number"/>

      </a-form-item>
     <a-form-item
        label="课程总费用"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
         <a-input v-decorator="['totalAmount',{rules: [{ required: false, message: '请输入课程费用'}]}]"
          placeholder="请输入课程费用" type="number"/>
      </a-form-item>
      <a-form-item
        label="设置分享佣金"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <brokerage v-decorator="['brokerage',{
            initialValue: { isSet: 0, money: 0 },
            rules: [{ validator: checkBrokerage }],
          }]">

        </brokerage>

      </a-form-item>

      <a-form-item
        label="限制人数"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-input v-decorator="['limitStudents',{rules: [{ required: false, message: '输入限制人数'}]}]"
          placeholder="输入限制人数" />
      </a-form-item>
      <a-form-item label="老师" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select
              v-decorator="[
                'teacherId',
                { rules: [{ required: false, message: '请选择老师' }] },
              ]"
              placeholder="请选择老师"

            >
              <a-select-option value="1">
                少儿
              </a-select-option>
              <a-select-option value="1">
                国画
              </a-select-option>
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
import Category from '@/services/category';
export default {
  mixins: [mix],
  name: 'Step1',
  components: {brokerage},

  data () {
    return {
      form: this.$form.createForm(this),
      creatingCateName: '',
categories:[],
chooseCatId:'',
categoryName:''
/*      categoryConfig:{
            dataS:{
              remote:{
                url:"/category/search?pageNum=1&pageSize=10",
                filter(row){
                 return {value:row.categoryId,label:row.name};
                },
                debug:true,
              }
            }
      } */

    };
  },
mounted() {
this.getCategory();
  this.form.setFieldsValue(this.$route.params.data);
  console.log('rowData step 1',this.$route.params.data)
},

  methods: {
    handleChange(value) {
      console.log('value:',value); // { key: "lucy", label: "Lucy (101)" }
this.chooseCatId =  value;
console.log('chooseCatId:',this.chooseCatId);

    },
    getCategory(){
      Category.list().then(res => {
        //console.log(res)
        //this.categories = res.result.content;
      })
    },

      checkColsItem (rule, value, callback) {
      if (!rule.required || (value !== undefined && value !== null && value !== '')) {
        callback();
        return;
      }
      callback(`${rule.field} is required!`);
    },

    nextStep () {
      //let that = this
      //console.log('that.categories.categoryId:',that.categories.categoryId)
      console.log('this.categories.categoryId:',this.categories)
      console.log('this.chooseCatId:',this.chooseCatId)
      this.form.validateFields((error, values) => {
        if (error) return;

        this.values = values;
        //this.values.courseCategoryId =that.categories.categoryId
        this.values.courseCategoryId = this.chooseCatId


        this.values.isShareBrokerage = values.brokerage.isSet == 1;
        this.values.shareBrokerageAmount = values.brokerage.money;
        this.$emit('nextStep');
      });

    },
    checkBrokerage (rule, value, callback) {

      if (value.isSet === 0 || (value.isSet === 1 && value.money > 0)) {
        callback();
        return;
      }
      callback('佣金需要大于0!');
    },

    getValues () {
      //return this.form.getFieldsValue();
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
