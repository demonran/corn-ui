<template>
  <div class="container">
      <div class="content">
        <div class="form">
          <div class="logo">
            <img alt="logo" src="../../assets/logo.svg" />
            <span>{{systemName}}</span>
          </div>

          <a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
              <a-form-item
                fieldDecoratorId="name"
                :hasFeedback="true"
                :fieldDecoratorOptions="{rules: [{ required: true, message: 'Username', whitespace: true}]}"
              >
                <a-input size="large" placeholder="admin" >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item
                fieldDecoratorId="password"
                :hasFeedback="true"
                :fieldDecoratorOptions="{rules: [{ required: true, message: 'password', whitespace: true}]}"
              >
                <a-input size="large" placeholder="888888" type="password">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">Sign in</a-button>
              </a-form-item>
        </a-form>
       </div>
      </div>
       <global-footer :link-list="linkList" :copyright="copyright" />
  </div>
</template>

<script>
import GlobalFooter from '../../layouts/GlobalFooter'

export default {
  name: 'Login',
  components: {GlobalFooter},
  data () {
    return {
      logging: false
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    },
    linkList () {
      return this.$store.state.setting.footerLinks
    },
    copyright () {
      return this.$store.state.setting.copyright
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.logging = true
          this.$axios.post('/login', {
            name: this.form.getFieldValue('name'),
            password: this.form.getFieldValue('password')
          }).then((res) => {
            this.logging = false
            const result = res.data
            if (result.code >= 0) {
              const user = result.data.user
              this.$router.push('/dashboard/workplace')
              this.$store.commit('account/setuser', user)
              this.$message.success(result.message, 3)
            } else {
              this.$message.error(result.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  position: absolute;
  top: 45%;
  left: 50%;
  margin: -160px 0 0 -160px;
  width: 320px;
  height: 320px;
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
