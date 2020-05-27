<template>


  <div>

    <sign-in ref="signIn" :signInData="signInData"></sign-in>
    <div>
      <a-date-picker @change="onChange" valueFormat="YYY-MM-DD">
      <span>
       今日考勤：{{ signInData.studyDate }}  <a-icon type="caret-down"/>
      </span>

      </a-date-picker>
    </div>

    <a-card>
      <div>
        所属类目：
        <a-radio-group name="category" @change="categorySelected">
          <a-radio-button v-for="item in category" :key="item.categoryId" :value="item.categoryId">
            {{item.categoryName}}
          </a-radio-button>
        </a-radio-group>
      </div>

      <div>
        课程：
        <a-radio-group @change="courseSelected" v-model="query.courseId">
          <a-radio-button v-for="item in courses" :key="item.courseId" :value="item.courseId">{{item.courseName}}
          </a-radio-button>
        </a-radio-group>
      </div>
      <div>
        上课时间段：
        <a-radio-group v-model="signInData.studyTime" v-if="signInData.studyTime">
          <a-radio-button :value="signInData.studyTime">{{signInData.studyTime}}</a-radio-button>
        </a-radio-group>
      </div>

    </a-card>
    <a-list size="large" :dataSource="crud.data">
      <a-list-item slot="renderItem" slot-scope="item, index" key="item.id">
        <div slot="actions">
          <a-button type="primary" @click="signIn(item)">签到</a-button>
        </div>

        <div class="list-content">
          <div class="list-content-head">
            <div class="left">{{firstName(item.studentName)}}</div>
            <div class="name">
              {{item.studentName}}
              <div>{{item.tel}}</div>
            </div>
          </div>
          <div class="list-content-item">
            <span>班级</span>
            <p>{{ item.className }}</p>
          </div>
          <div class="list-content-item">
            <span>课程</span>
            <p>{{item.courseName}}</p>
          </div>
          <div class="list-content-item">
            <span>主讲老师</span>
            <p>{{item.teacherName}}</p>
          </div>
          <div class="list-content-item">
            <span>报名时间</span>
            <p>2016-06-16 14:03</p>
          </div>
          <div class="list-content-item">
            <span>状态</span>
            <p class="status_stop">{{item.status}}</p>
          </div>
          <div class="list-content-item">
            <span>剩余课时</span>
            <p>{{item.studiedLesson}}/{{item.totalLesson}}</p>
          </div>
        </div>
      </a-list-item>
    </a-list>
  </div>


</template>

<script>
  import CRUD, {presenter, header} from "@/components/Crud/curd";
  import coursestudyRes from "@/services/coursestudy";
  import RadioTag from "@/components/tool/RadioTag";
  import CategoryRes from '@/services/category'
  import courseRes from '@/services/offlineCurse'
  import moment from 'moment'
  import signIn from "@/pages/coursestudy/signIn";


  const crud = CRUD({init: false, crudMethod: {...coursestudyRes}})
  export default {
    name: "index",
    components: {RadioTag, signIn},
    mixins: [presenter(crud), header()],

    data() {
      return {
        category: [],
        courses: [],
        signInData:{studyDate: moment().format('yyyy-MM-DD')}
      }
    },

    mounted() {
      this.fetchCategory();
    },
    methods: {
      fetchCategory() {
        CategoryRes.categoryList().then(res => {
          this.category = res.result;
        })
      },

      fetchCourses(categoryId) {
        courseRes.list({categoryId: categoryId, pageSize: 100}).then(res => {
          this.courses = res.result.content;
        })
      },

      categorySelected(e) {

        this.fetchCourses(e.target.value)
        this.crud.clear()
        this.studyTime = undefined
      },
      courseSelected(e) {
        this.crud.toQuery();
        const selectedCourse = this.courses.find(course => e.target.value === course.courseId);
        this.signInData.studyTime = selectedCourse.startClassTime + '~' + selectedCourse.endClassTime
      },

      signIn(student) {
        this.$refs.signIn.dialogVisible = true
        this.signInData.studyId = student.id
        this.signInData.name = student.name
        this.signInData.residueLesson = student.totalLesson - student.studiedLesson
      },



      onChange(date) {
        this.signInData.studyDate = date
      },


      firstName() {
        return name ? name.substr(0, 1) : '无';
      },
    }
  }
</script>

<style lang="less" scoped>

  .list-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    .list-content-head {
      position: relative;
      display: inline-flex;
      width: 100%;
      margin-left: 20px;

      .left {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #597ef7;
        text-align: center;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 48px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
      }

      .name {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 22px;
        color: rgba(0, 21, 41, 1);
        opacity: 1;
        margin-left: 10px;

        .age {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 22px;
          color: rgba(0, 21, 41, 1);
          margin-top: 6px;
        }
      }
    }

    .list-content-item {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      width: 100%;
      margin-left: 20px;

      span {
        line-height: 20px;
        font-size: 14px;
        font-family: SFUIText-Regular;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.45);
        opacity: 1;
      }

      p {
        margin-top: 4px;
        margin-bottom: 0;
        line-height: 22px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 22px;
        color: rgba(0, 21, 41, 1);
        opacity: 1;
      }

      .status_ing {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 22px;
        color: rgba(82, 196, 26, 1);
      }

      .status_finish {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 22px;
        color: rgba(172, 172, 172, 1);
      }

      .status_stop {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 22px;
        color: rgba(255, 167, 0, 1);
      }
    }
  }
</style>
