<style lang="less" scoped>
.add-cate-panel {
  display: flex;
  align-items: center;
}
.add-category-btn {
  margin-left: 4px;
}
</style>
<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item label="课程标题" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
        <a-input
          v-decorator="['courseName',{rules: [{ required: true, message: '请输入课程标题'}]}]"
          placeholder="请输入课程标题"
        />
      </a-form-item>

      <a-form-item label="副标题" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
        <a-input
          v-decorator="['courseSubTitle',{rules: [{ required: true, message: '请输入副标题'}]}]"
          placeholder="请输入副标题"
        />
      </a-form-item>

      <a-form-item label="课程分类" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-select
          @change="handleChange"
          v-decorator="[
            'courseCategoryId',
            { rules: [{ required: true,message:'请选择分类'}] ,
            },
            ]"
        >
          <a-select-option
            :value="item.categoryId"
            placeholder="请选择课程分类"
            v-for="(item,i) in categories"
            :key="i"
          >{{item.categoryName}}</a-select-option>
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
        </a-select>-->
        <!-- </a-form-item> -->
      </a-form-item>
      <a-form-item label="课时单价" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
        <a-input
          v-decorator="['price',{rules: [{ required: true, message: '请输入课时单价'}]}]"
          prefix="￥"
          placeholder="请输入课时单价"
          type="number"
        />
      </a-form-item>
      <a-form-item label="共计课时" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
        <a-input
          v-decorator="['lesson',{rules: [{ required: true, message: '课时共计多少节'}]}]"
          placeholder="课时共计多少节"
          type="number"
        />
      </a-form-item>
      <a-form-item label="课程总费用" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
        <a-input
          v-decorator="['totalAmount',{rules: [{ required: true, message: '请输入课程费用'}]}]"
          placeholder="请输入课程费用"
          type="number"
        />
      </a-form-item>
      <a-form-item label="设置分享佣金" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
        <brokerage
          v-decorator="['brokerage',{
            initialValue: { isSet: '', money: '' },
            rules: [{ validator: checkBrokerage }],
          }]"
        ></brokerage>
      </a-form-item>

      <a-form-item label="限制人数" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
        <a-input
          v-decorator="['limitStudents',{rules: [{ required: true, message: '输入限制人数'}]}]"
          placeholder="输入限制人数"
        />
      </a-form-item>
      <a-form-item label="老师" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-select
          v-decorator="[
                'teacherId',
                { rules: [{ required: true, message: '请选择老师' }]},
              ]"
          placeholder="请选择老师"
        >
          <a-select-option :value="item.id" v-for="(item,i) in teachers" :key="i">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import brokerage from "./brokerage";
import mix from "../../mix";
import Category from "@/services/category";
import TeacherRequest from "@/services/teacher";

export default {
  mixins: [mix],
  name: "Step1",
  components: { brokerage },

  data() {
    return {
      form: this.$form.createForm(this),
      creatingCateName: "",
      categories: [],
      teachers: [],
      chooseCatId: "",
      categoryName: ""
    };
  },
  activated() {
    this.getCategory();
    var data = this.$route.params.data;
    if (data) {
      this.isSet = data.isShareBrokerage ? 1 : 0;
      this.money = data.shareBrokerageAmount;
      this.form.setFieldsValue({
        courseName: data.courseName,
        courseSubTitle: data.courseSubTitle,
        courseCategoryId: data.courseCategoryId,
        price: data.price,
        lesson: data.lesson,
        totalAmount: data.totalAmount,
        brokerage: { isSet: this.isSet, money: this.money },
        limitStudents: data.limitStudents,
        teacherId: data.teacherId
      });
      this.getTeachersById(data.courseCategoryId);
      console.log("rowData step 1", this.$route.params.data);
      this.categoryName = data.category.categoryName;
      console.log(this.categoryName);
    } else {
      this.form.setFieldsValue({
        courseName: "",
        courseSubTitle: "",
        courseCategoryId: "",
        price: null,
        lesson: null,
        totalAmount: null,
        brokerage: null,
        limitStudents: null,
        teacherId: ""
      });
      this.isSet = 0;
      this.money = null;
      this.categoryName = "";
    }
  },

  methods: {
    resetForm() {
      this.form.resetFields();
    },
    handleChange(e) {
      this.getTeachersById(e);
      this.form.resetFields(["teacherId"]);
    },
    getCategory() {
      Category.list().then(res => {
        console.log(res);
        this.categories = res.result.content;
      });
    },
    getTeachersById(id) {
      const param = {
        categoryId: id
      };
      TeacherRequest.getAllteacher(param).then(res => {
        this.teachers = res.result;
      });
    },
    getTeacher() {
      TeacherRequest.list()
        .then(res => {
          this.teacherList = res.result.content;
          console.log("teacher:", res.result.content);
        })
        .catch(e => {});
    },

    checkColsItem(rule, value, callback) {
      if (
        !rule.required ||
        (value !== undefined && value !== null && value !== "")
      ) {
        callback();
        return;
      }
      callback(`${rule.field} is required!`);
    },

    nextStep() {
      //let that = this
      //console.log('that.categories.categoryId:',that.categories.categoryId)
      this.form.validateFields((error, values) => {
        if (error) return;
        this.values = values;
        //this.values.courseCategoryId =that.categories.categoryId
        //this.values.courseCategoryId = this.chooseCatId
        this.values.isShareBrokerage = values.brokerage.isSet;
        this.values.shareBrokerageAmount = values.brokerage.money;
        this.$emit("nextStep");
      });
    },
    checkBrokerage(rule, value, callback) {
      if (value.isSet === 0 || (value.isSet === 1 && value.money > 0)) {
        callback();
        return;
      }
      callback("佣金需要大于0!");
    },

    getValues() {
      //return this.form.getFieldsValue();
    },

    async addCategory() {
      if (!this.creatingCateName) {
        this.toast("分类不能为空!", true);
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
