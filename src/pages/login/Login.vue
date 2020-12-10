<template>
  <div class="container">
      <div class="content">
        <div class="form">
          <div class="logo">
            <img alt="logo" src="../../assets/logo.svg" />
            <span>{{systemName}}</span>
          </div>
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="微信登录">
              <wechat-login></wechat-login>
            </a-tab-pane>
            <a-tab-pane key="2" tab="密码登录">
              <password-login></password-login>
            </a-tab-pane>
          </a-tabs>
       </div>
      </div>
       <global-footer :link-list="[]" :copyright="copyright" />
  </div>
</template>

<script>
import GlobalFooter from '../../layouts/GlobalFooter';
import PasswordLogin from './password-login'
import WechatLogin from './wechat-login'
import {mapState} from "vuex";


export default {
  name: 'Login',
  components: {GlobalFooter, PasswordLogin, WechatLogin},
  computed: {
    ...mapState('setting', ['systemName', 'copyright'])
  },

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

</style>
