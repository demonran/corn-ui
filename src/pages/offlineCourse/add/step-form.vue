<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="current">
      <a-step title="基本信息" />
      <a-step title="课程介绍" />
      <a-step title="上课时间" />
      <a-step title="完成" />
    </a-steps>

    <div class="content">
      <!-- <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;"> -->
      <step1 ref="step1" v-show="current === 0" @nextStep="nextStep"></step1>
      <step2 ref="step2" v-show="current === 1" @nextStep="nextStep" @prevStep="prevStep"></step2>
      <step3 ref="step3" v-show="current === 2" @prevStep="prevStep" @submit="OnSubmit"></step3>
      <step4 v-show="current === 3" @prevStep="prevStep" @finish="finish"></step4>
      <!-- </a-form> -->
    </div>
  </a-card>
</template>

<script>
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import mix from "../../mix";
import { mapActions } from "vuex";

export default {
  name: "StepForm",
  mixins: [mix],
  components: { Step1, Step2, Step3, Step4 },
  data() {
    return {
      desc: "将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。",
      current: 0,
      form: this.$form.createForm(this)
    };
  },

  methods: {
    ...mapActions("offline", ["postCreateCourse", "postUpdateCourse"]),
    //...mapActions('table', ['postAddRow', 'postUpdateRow']),

    nextStep() {
      if (this.current < 3) {
        this.current += 1;
      }
    },
    prevStep() {
      if (this.current > 0) {
        this.current -= 1;
      }
    },
    finish() {
      this.current = 0;
      this.$refs.step1.resetForm();
      this.$refs.step2.resetForm();
      this.$refs.step3.resetForm();
    },

    async OnSubmit() {
      this.showLoading();
      let isUpdate = this.$route.params.isUpdate; //true为编辑进入，false或为空就是新增
      let rowData = this.$route.params.data;
      console.log("”update00000  " + JSON.stringify(rowData));

      let data = {
        ...this.$refs.step1.values,
        ...this.$refs.step2.values,
        ...this.$refs.step3.values
      };
      console.log("提交事件");
      console.log(data);
      if (isUpdate == true) {
        var params = {
          id: rowData.courseId,
          data: data
        };

        params.isShareBrokerage = params.isShareBrokerage === 1;
        let error = await this.postUpdateCourse(params);

        if (error) {
          this.toast(error, true);

          this.hideLoading();
          return;
        }
        this.current += 1;
        this.hideLoading();
      } else {
        data.status = 1;

        data.isShareBrokerage = data.isShareBrokerage === 1;
        let error = await this.postCreateCourse(data);

        if (error) {
          this.toast(error, true);
          this.hideLoading();
          return;
        }
        this.current += 1;
        this.hideLoading();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
</style>
