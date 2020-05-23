<template>
  <a-form-model ref="form"
                :rules="rules"
                :label-col="{span:4}"
                :wrapper-col="{span:12, offset:2}"
                :model="form"
               >
    <a-form-model-item label="小程序Id">
      <a-input placeholder="请输入小程序ID" v-model="form.appId"/>
    </a-form-model-item>
    <a-form-model-item label="商品ID">
      <a-input placeholder="请输入商品ID" v-model="form.mchId"/>
    </a-form-model-item>
    <a-form-model-item label="支付密玥">
      <a-input placeholder="请输入商户密玥" v-model="form.mchKey"/>
      <p>获取方式：商户号后台 » 账户中心 » 账户设置 » API安全 » 32位支付密钥</p>
    </a-form-model-item>
    <a-form-model-item label="回调URL">
      <a-input placeholder="请输入回调URL" v-model="form.notifyUrl"/>
    </a-form-model-item>
    <a-form-model-item label="支付证书">
      <div style="line-height: 25px">
        <h3>为什么需要支付证书</h3>
        <ul>
          <li>微信支付接口中，涉及资金回滚的接口会使用到商户证书。</li>
          <li>商家如果需要使用原路退款功能，需要到微信商户平台后台下载证书并在这里上传。</li>
          <li>上传证书后，商家在订单管理列表里的相应订单点击退款按钮，即可对这笔订单实现退款操作。</li>
          <li><strong style="color: red">具体操作请仔细阅读详细使用说明。</strong></li>
        </ul>
      </div>
      <mch-key-path :key-path="form.keyPath" @success="success" />

    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        @change="update"
      >
        修改
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
  import wxconfig from "@/services/wxconfig";
  import mchKeyPath from './mch-key-path'
  export default {
    name: "payment",
    components:{
      mchKeyPath
    },
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
        wxconfig.query().then(res => {
          this.form = res.result ? res.result : {}
        })
      },
      update() {
        wxconfig.update(this.form).then(res => {
            if (res.errorNo === 200) {
              this.$message.success("修改成功")
            }else {
              this.$error("修改失败")
            }
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
