<style lang="less" scoped>
.ui-text {
    display: flex;
    align-items: center;
    span{
      flex-shrink: 0;
      margin: 0 4px;
    }
}
</style>

<template>
    <div class="ui-text">
        <span v-if="config.label">{{config.label}}</span>
        <a-input v-model="text" @change="handleChange" :placeholder="'please input '+ config.name"> </a-input>
    </div>
</template>

<script>
export default {
  props: {
    config: Object,
    value: String
  },
  data () {
    return {
      text: ''
    };
  },
  created () {
    this.text = this.value;
  },
  watch: {
    value () {
      if (this.text != this.value) {
        this.text = this.value;
      }
    }
  },
  methods: {
    handleChange () {
      if (this.value != this.text) {
        this.$emit('change', this.text);
        this.$emit('input', this.text);
      }
    }
  },
  computed: {
  }
};
</script>
