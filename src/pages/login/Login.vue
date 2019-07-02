<template>
  <div class="container">
      <div class="content">
        <div class="form">
          <div class="logo">
            <img alt="logo" src="../../assets/logo.svg" />
            <span>{{systemName}}</span>
          </div>
          <a-form @submit="onSubmit" :form="form">
              <a-form-item :hasFeedback="true">
                <a-input v-decorator="['name',{rules: [{ required: true, message: '请填写用户名'}]}]"
                     size="large" placeholder="用户名" >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item :hasFeedback="true">
                <a-input v-decorator="['password',{rules: [{ required: true, message: '请填写密码'}]}]"
                    size="large" placeholder="密码" type="password">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <div class="verify-row">
                  <a-input v-decorator="['verifyCode', {rules: [{ required: true, message: '验证码不能为空'}]}]"  size="large" placeholder="验证码">
                    <a-icon slot="prefix" type="lock" />
                  </a-input>
                  <img class="verifyCode" :src="verifyImg" alt="" @click="resetVerify">
                </div>
              </a-form-item>
              <a-form-item>
                <a-button :loading="logging" size="large" htmlType="submit" type="primary">登陆</a-button>
              </a-form-item>
        </a-form>
       </div>
      </div>
       <global-footer :link-list="[]" :copyright="copyright" />
  </div>
</template>

<script>
import GlobalFooter from '../../layouts/GlobalFooter';
import {mapActions, mapState} from 'vuex';

export default {
  name: 'Login',
  components: {GlobalFooter},
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
  computed: {
    ...mapState('setting', ['systemName', 'copyright'])
  },
  methods: {
    ...mapActions('account', ['login']),

    async resetVerify () {
      this.verifyImg = '/api/kaptcha?t=' + Date.now();
    },
    async onSubmit (e) {
      e.preventDefault();
      let values = await this.validateForm();
      if (!values) return;
      this.logging = true;
      let error = await this.login(values);
      this.logging = false;
      if (error) {
        this.resetVerify();
        this.$message.error(error);
      }
      this.$message.success('登陆成功！');
      this.$router.push('/course/offline');
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
};
</script>

<style lang="less" scoped>
.form {
  position: absolute;
  top: 45%;
  left: 50%;
  margin: -160px 0 0 -160px;
  width: 320px;
  height: 360px;
  padding: 36px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);

  button {
    width: 100%;
  }
  p {
    color: rgb(204, 204, 204);
    text-align: center;
    margin-top: 16px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
}
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background-color: #f8f8f8;
    // background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      @media (min-width: 768px){
        padding: 112px 0 24px;
      }
    }
  }
  .logo {
        text-align: center;
        cursor: pointer;
        margin-bottom: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 40px;
          margin-right: 8px;
        }
        span {
          vertical-align: text-bottom;
          font-size: 16px;
          text-transform: uppercase;
          display: inline-block;
          font-weight: 700;
          // color: @primary-color;
          // .text-gradient();
        }
  }
  .verifyCode{
    width: 80px;
    margin-left: 4px;
  }
  .verify-row{
    display: flex;
  }
</style>
