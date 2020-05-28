<template>
  <div>

    <a-modal
      :title="crud.status.title"
      :visible="crud.status.cu > 0"
      :confirm-loading="crud.status.cu == 2"
      @cancel="crud.cancelCU"
      @ok="crud.submitCU">

      <a-form-model ref="form" :rules="rules" :label-col="{span:4}" :wrapper-col="{span:20}" :model="form">

        <a-form-model-item label="课程分类">
          <a-select placeholder="请选择所属分类" :allowClear="true" @select="categorySelected">
            <a-select-option v-for="(item, index) in categoryList" :key="index" :value="item.categoryId">
              {{item.categoryName}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="上课课程">
          <a-select placeholder="请选择课程" :allowClear="true" v-model="form.courseId">
            <a-select-option v-for="(item, index) in courseList" :key="index" :value="item.courseId">
              {{item.courseName}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="教课老师">
          <a-select placeholder="请选择老师" :allowClear="true" v-model="form.teacherName">
            <a-select-option v-for="(item, index) in teacherList" :key="index" :value="item.name">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="上课日期">
          <a-date-picker valueFormat="YYYY-MM-DD" v-model="form.studyDate"/>
        </a-form-model-item>
        <a-form-model-item label="上课时段">
          <a-time-picker format="HH:mm" valueFormat="HH:mm" v-model="form.startTime"/>
          ～
          <a-time-picker format="HH:mm" valueFormat="HH:mm" v-model="form.endTime"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <crud-operation></crud-operation>
    <a-table
      class="table"
      :columns="columns"
      rowKey="id"
      :dataSource="crud.data"
      :pagination=false
    >
      <template slot="action" slot-scope="text,record">
<!--        <ud-operation :data="record"></ud-operation>-->
        <div>
          <a-button type="link" @click="toDetail(record.id)">详情</a-button>
        </div>

      </template>
    </a-table>
    <!-- 分页组件-->
    <pagination/>
  </div>

</template>

<script>
  import CRUD, {presenter, form} from "@/components/Crud/curd";
  import udOperation from "@/components/Crud/udOperation";
  import crudOperation from "@/components/Crud/crudOperation";
  import Pagination from "@/components/Crud/Pagination";
  import lessonRes from '@/services/lesson'
  import categoryRes from "@/services/category";
  import offlineCourseRes from "@/services/offlineCurse";
  import teacherRes from "@/services/teacher";

  const crud = CRUD({crudMethod: {...lessonRes}})
  const defaultForm = {}
  const columns = [
    {
      title: "序号",
      customRender: (text, record,index) => index + 1
    },
    {
      title: "上课课程",
      dataIndex: "courseName"
    },
    {
      title: "教课老师",
      dataIndex: "teacherName",
      key: "teacherName",
    },
    {
      title: "上课日期",
      dataIndex: "studyDate",
      key: "studyDate",
    },
    {
      title: "上课时段",
      customRender: (text, record,index) => record.startTime + ' ~ ' + record.endTime,
    },

    {
      title: "操作",
      key: "action",
      scopedSlots: {customRender: "action"}
    }
  ]
  const rules = {}
  export default {
    name: "lesson",
    mixins: [presenter(crud), form(defaultForm)],
    components: {
      udOperation, Pagination, crudOperation
    },
    data() {
      return {
        columns: columns,
        rules: rules,
        categoryList: [],
        courseList: [],
        teacherList: []
      }
    },
    mounted() {
      this.initCategory()
    },
    methods: {
      toDetail(id) {
        this.$router.push({name:'上课详情', params:{id:id}})
      },

      initCategory() {
        categoryRes.categoryList().then(res => {
          this.categoryList = res.result
        })
      },
      initTeacher(params) {
        teacherRes.getAllteacher(params).then(res => {
          this.teacherList = res.result
          // this.form.teacherName = this.teacherList && this.teacherList[0].name
        })
      },
      initCourse(params) {
        offlineCourseRes.list(params).then(res => {
          this.courseList = res.result.content
          // this.form.courseId = this.courseList && this.courseList[0].courseId

        })
      },
      categorySelected(categoryId) {
        this.initCourse({categoryId: categoryId, pageSize: 100})
        this.initTeacher({categoryId: categoryId})

      }
    }
  }
</script>

<style scoped>

</style>
