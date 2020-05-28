<template>
  <a-list size="large" :dataSource="students">
    <a-list-item slot="renderItem" slot-scope="item, index" key="item.id">
      <div slot="actions">
        <a-button v-if="item.signIn" type="primary" disabled>已签到</a-button>
        <a-button v-else type="primary" @click="signIn(item)">签到</a-button>
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
          <span>报名时间</span>
          <p>2016-06-16 14:03</p>
        </div>
        <div class="list-content-item">
          <span>状态</span>
          <p class="status_stop">{{item.status == 'STUDYING' ? '学习中' : item.status == 'STOPPING' ? '停课中': '已学完'}}</p>
        </div>
        <div class="list-content-item">
          <span>剩余课时</span>
          <p>{{item.studiedLesson}}/{{item.totalLesson}}</p>
        </div>
      </div>
    </a-list-item>
  </a-list>
</template>

<script>
  import coursestudyRes from "@/services/coursestudy";

  export default {
    name: "signIn",
    props: ['lessonId'],
    data() {
      return {
        students: []
      }
    },

    mounted() {
      this.initStudent(this.lessonId);
    },
    methods: {
      firstName(name) {
        return name ? name.substr(0, 1) : '无';
      },
      initStudent(lessonId) {
        coursestudyRes.listStudent({lessonId: lessonId}).then(res => {
          this.students = res.result
        })
      },

      signIn(item) {
        coursestudyRes.signIn(
          {
            studyId: item.id,
            lessonId: this.lessonId
          }
        ).then(res => {
          item.signIn = true
        })
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
