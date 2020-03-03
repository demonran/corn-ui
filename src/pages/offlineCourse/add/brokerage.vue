<style lang="less" scoped>

</style>

<template>
    <div>
        <a-radio-group  name="radioGroup" v-model="isSet" @change="radioGroupChange">
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
        <a-input prefix="￥" v-show="isSet == 1" v-model="money" type="number" @change="radioGroupChange"
            placeholder="请输入分享佣金金额" />
        <p v-show="isSet == 1">分享给好友报名成功后可提现</p>
    </div>
</template>
<script>
export default {
  props: {
    value: Object
  },
  data () {
    return {
      isSet: 1,
      money: 0
    };
  },
  mounted() {
   /* let rowData = this.$route.params.data
             let isUpdate = this.$route.params.isUpdate;//true为编辑进入，false或为空就是新增
            this.form.setFieldsValue(rowData);
            console.log('分享佣金')
            console.log(rowData) */
/* 
              this.isSet = rowData.isShareBrokerage
              this.money = rowData.shareBrokerageAmount */

  },
  watch: {
    value (val = {}) {
      if (val.isSet !== this.isSet) this.isSet = val.isSet;
      if (val.money !== this.money) this.money = val.money;
    }
  },
  methods: {
    radioGroupChange () {
      console.log('radioGroupChange', {isSet: this.isSet, money: this.money});
      this.$emit('change', {isSet: this.isSet, money: this.money});
    }
  }
};
</script>
