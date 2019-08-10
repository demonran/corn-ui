<style lang="less" scoped>
.input-panel{
  display: flex;
  align-items: center;
  .ok-btn{
      margin-left: 4px;
  }
}
</style>

<template>
    <a-popover trigger="click" :visible="visibleId == id" @visibleChange="handleChange">
        <template slot="content">
            <div class="input-panel">
                <a-input :placeholder="placeholder" size="small" v-model="text"/>
                <a-button ghost size="small" class="ok-btn" type="primary" @click="onOk">OK</a-button>
            </div>
        </template>
        <a @click="clickLabel">{{config.label}}</a>
    </a-popover>
</template>

<script>
import mix from './tableOpMix';

export default {
  mixins: [mix],
  props: ['config'],
  computed: {
    placeholder () {
      if (this.config.confirm.placeholder) return this.config.confirm.placeholder;
      return '';
    },
    id () {
      return this.config.record[this.config.dbidField];
    }
  },
  data () {
    return {
      text: '',
      confirmState: window.confirmState,
      visibleId: '',
      opData: {}
    };
  },
  methods: {
    onOk () {
      this.opData = {feedback: this.text};
      this.onConfirm();
    },
    clickLabel () {
      this.visibleId = this.config.record[this.config.dbidField];
    },
    handleChange (visible) {
      if (!visible) this.visibleId = null;
    }
  }
};
</script>
