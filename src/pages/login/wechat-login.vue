<template>
    <div class="wechat-login">
      <img src="">
      <a-form-model @submit="onSubmit" :form="form" :model="form">
        <a-form-model-item :hasFeedback="true">
          <a-input v-model="form.code" size="large" placeholder="验证码">
            <a-icon slot="prefix" type="user"/>
          </a-input>
        </a-form-model-item>
      </a-form-model>
    </div>

</template>

<script>
    export default {
        name: "wechat-login",
      data() {
          return{
            form: {}
          }
      },

      methods:{
          onSubmit() {

          }
      }
    }
</script>

<style scoped>

</style>
