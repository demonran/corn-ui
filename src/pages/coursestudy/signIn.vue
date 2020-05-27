<template>
  <a-modal :visible="dialogVisible" title="签到" @ok="handleOk" @cancel="handleCancel">
    <a-avatar :size="64" icon="user"/>
    <span>{{signInData.name}}</span>
    <div>
      <span>课程：{{signInData.courseName}}</span><span>剩余课时: {{signInData.residueLesson}}</span>
      <div>
        <label>上课日期：</label><span>{{signInData.studyDate}}</span>
      </div>
      <div>
        <label>上课时段：</label><span>{{signInData.studyTime}}</span>
      </div>
      <div>
        <label>消耗课时：</label><span>1</span>
      </div>
      <div>

      </div>
    </div>
  </a-modal>
</template>

<script>
  import coursestudyRes from "@/services/coursestudy";

  export default {
    name: "signIn",
    props: ['signInData'],
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
      handleOk() {
        coursestudyRes.signIn(
          {
            studyId: this.signInData.studyId,
            studyDate: this.signInData.studyDate,
            studyTime: this.signInData.studyTime
          }
        ).then(res => {
          this.dialogVisible = false
        })
      },
      handleCancel() {
        this.dialogVisible = false
      },
    }
  }
</script>

<style scoped>

</style>
