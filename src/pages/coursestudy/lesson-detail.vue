<template>
  <div>
    <div>
      <a-card :bordered="false">
        <detail-list title="上课信息">
          <detail-list-item term="课程名称">{{lesson.courseName}}</detail-list-item>
          <detail-list-item term="上课老师">{{lesson.teacherName}}</detail-list-item>
          <detail-list-item term="上课日期">{{lesson.studyDate}}</detail-list-item>
          <detail-list-item term="上课时段">{{lesson.startTime}} ~ {{lesson.endTime}}</detail-list-item>
        </detail-list>
      </a-card>
      <a-card :bordered="true" class="textCenter">
        <a-row>
          <a-col :sm="8" :xs="18">
            <head-info title="实到学员" :content="lesson.signInStudentCount" :bordered="true"/>
          </a-col>
          <a-col :sm="8" :xs="18">
            <head-info title="应到学员" :content="lesson.totalStudentCount" :bordered="true"/>
          </a-col>
          <a-col :sm="8" :xs="18">
            <head-info title="未到学员" :content="lesson.totalStudentCount - lesson.signInStudentCount"/>
          </a-col>
        </a-row>
        <div class="line"></div>
      </a-card>
    </div>
    <a-tabs default-active-key="1" @change="tabChange">
      <a-tab-pane key="sign-in" tab="签到">
        <sign-in :lesson-id="lesson.id"></sign-in>
      </a-tab-pane>
      <a-tab-pane key="accessory" tab="附件">
        附件
      </a-tab-pane>
    </a-tabs>
  </div>

</template>

<script>
  import lessonRes from '@/services/lesson'
  import signIn from "@/pages/coursestudy/signIn";
  import coursestudyRes from "@/services/coursestudy";
  import HeadInfo from '@/components/tool/HeadInfo'
  import DetailList from "@/components/tool/DetailList";

  const DetailListItem = DetailList.Item

  export default {
    name: "lesson-detail",
    components: {
      signIn, HeadInfo, DetailList, DetailListItem
    },
    data() {
      return {
        lesson: {},
      }
    },
    mounted() {
      const id = this.$route.params.id;
      this.initLesson(id)
    },
    methods: {
      initLesson(id) {
        lessonRes.get({id: id}).then(res => {
          this.lesson = res.result
        })
      },
      tabChange(key) {
        if (key === 'sign-in') {

        }
      }

    }
  }
</script>

<style scoped>

</style>
