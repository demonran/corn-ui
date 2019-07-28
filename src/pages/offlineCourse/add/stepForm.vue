<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="current">
      <a-step title="基本信息" />
      <a-step title="课程介绍" />
      <a-step title="上课时间" />
      <a-step title="完成" />
    </a-steps>
    <div class="content">
      <step1 ref="step1" v-show="current === 0" @nextStep="nextStep"></step1>
      <step2 ref="step2" v-show="current === 1" @nextStep="nextStep" @prevStep="prevStep"></step2>
      <step3 ref="step3" v-show="current === 2" @prevStep="prevStep" @submit="OnSubmit"></step3>
      <step4 v-show="current === 3" @prevStep="prevStep" @finish="finish"></step4>

    </div>
  </a-card>
</template>

<script>
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import mix from '../../mix';
import {mapActions} from 'vuex';
export default {
  name: 'StepForm',
  mixins: [mix],
  components: {Step1, Step2, Step3, Step4},
  data () {
    return {
      desc: '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。',
      current: 0
    };
  },
  methods: {
    ...mapActions('offline', ['postCreateCourse']),

    nextStep () {
      if (this.current < 3) {
        this.current += 1;
      }
    },
    prevStep () {
      if (this.current > 0) {
        this.current -= 1;
      }
    },
    finish () {
      this.current = 0;
    },
    async OnSubmit () {
      this.showLoading();

      let data = {...this.$refs.step1.values,
        ...this.$refs.step2.values,
        ...this.$refs.step3.values
      };

      console.log(data);
      let error = await this.postCreateCourse(data);
      this.hideLoading();

      if (error) {
        this.toast(error, true);
        return;
      }
      this.current += 1;
    }
  }
};
</script>

<style lang="less" scoped>
  .steps{
    max-width: 750px;
    margin: 16px auto;
  }
</style>
