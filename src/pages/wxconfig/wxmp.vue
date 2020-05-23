<template>
  <div class="app-container">
    <a-form-model ref="form"
                  :rules="rules"
                  :label-col="{span:4}"
                  :wrapper-col="{span:12, offset:2}"
                  :model="form"
                  label-width="150px">
      <a-form-model-item label="AppID">
        <a-input v-model="form.appId" style="width: 370px;"/>
      </a-form-model-item>
      <a-form-model-item label="AppSecret">
        <a-input v-model="form.appSecret" style="width: 370px;" type="password"/>
      </a-form-model-item>
      <a-form-model-item label="微信验证TOKEN">
        <a-input v-model="form.token" style="width: 370px;"/>
      </a-form-model-item>
      <a-form-model-item label="EncodingAESKey">
        <a-input v-model="form.aesKey" style="width: 370px;"/>
      </a-form-model-item>
      <a-form-model-item label="">
        <a-button type="primary" @click="doSubmit">提交</a-button>
      </a-form-model-item>

    </a-form-model>
  </div>
</template>

<script>
  import wxmpconfig from "@/services/wxmpconfig";

  export default {
    name: "wxmp",

    data() {
      return {
        form: {},
        rules: {}
      }
    },
    created() {
      this.query();
    },
    methods: {
      query() {
        wxmpconfig.query().then(res => {
          this.form = res.result ? res.result : {}
        })
      },
      doSubmit() {
        wxmpconfig.update(this.form).then(res => {
          this.$message.success("修改成功")
        })
      },
      success(keyPath) {
        this.form.keyPath = keyPath
      }

    }
  }
</script>

<style scoped>

</style>
