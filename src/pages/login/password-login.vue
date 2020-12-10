<template>
  <a-form @submit="onSubmit" :form="form">
    <a-form-item :hasFeedback="true">
      <a-input v-decorator="['name',{rules: [{ required: true, message: '请填写用户名'}]}]"
               size="large" placeholder="用户名">
        <a-icon slot="prefix" type="user"/>
      </a-input>
    </a-form-item>
    <a-form-item :hasFeedback="true">
      <a-input v-decorator="['password',{rules: [{ required: true, message: '请填写密码'}]}]"
               size="large" placeholder="密码" type="password">
        <a-icon slot="prefix" type="lock"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <div class="verify-row">
        <a-input v-decorator="['verifyCode', {rules: [{ required: true, message: '验证码不能为空'}]}]" size="large"
                 placeholder="验证码">
          <a-icon slot="prefix" type="lock"/>
        </a-input>
        <img class="verifyCode" :src="verifyImg" alt="" @click="resetVerify">
      </div>
    </a-form-item>
    <a-form-item>
      <a-button :loading="logging" size="large" htmlType="submit" type="primary">登陆</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import {mapActions, mapState} from "vuex";

  export default {
    name: "password-login",
    data () {
      return {
        logging: false,
        verifyImg: '',
        form: this.$form.createForm(this)
      };
    },

    mounted () {
      this.form.setFieldsValue({name: 'limengmeng', password: '123456'});
      this.resetVerify();
    },

    methods: {
      ...mapActions('account', ['login']),

      async resetVerify () {
        this.verifyImg = '/api-yumimiao/kaptcha?t=' + Date.now();
      },
      async onSubmit (e) {
        e.preventDefault();

        let values = await this.validateForm();
        if (!values || this.logging) return;
        this.logging = true;

        let error = await this.login(values);
        this.logging = false;
        if (error) {
          this.resetVerify();
          this.$message.error(error);
          return;
        }
        this.$message.success('登陆成功！');
        let from = this.$route.query.from;
        this.$router.push(from || '/course/offline');
      },
      validateForm () {
        return new Promise((resolve, reject) => {
          this.form.validateFields((err, values) => {
            if (err) {
              resolve();
              return;
            }
            resolve(values);
          });
        });
      }
    }
  }
</script>

<style scoped>

  .verifyCode{
    width: 80px;
    margin-left: 4px;
  }
  .verify-row{
    display: flex;
  }
</style>
