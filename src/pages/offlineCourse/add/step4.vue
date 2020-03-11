<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;">
      <result title="添加成功" :is-success="true" />
      <a-form-item :wrapperCol="{span: 16, offset: 8}">
        <a-button type="primary" @click="doOnceAgin">继续添加</a-button>
        <a-button style="margin-left: 8px" @click="backList">返回列表</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import Result from "../../../components/result/Result";
export default {
  name: "Step3",
  components: { Result },
  methods: {
    getWord() {
      if (isUpdate == true) {
      }
    },
    doOnceAgin() {
      this.$emit("finish");
    },
    backList() {
      this.$router.replace("/course/offline");
      this.$emit("finish");
    }
  }
};
</script>

<style scoped>
</style>
