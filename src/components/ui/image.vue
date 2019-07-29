<style lang="less" scoped>
.ui-image {
    display: flex;
    align-items: center;
}
</style>

<template>
    <div class="ui-image">
        <span v-if="config.label">{{config.label}}</span>
        <!-- <div v-model="text" @change="handleChange" :placeholder="'please input '+ config.name"> </a-input> -->
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
      }
    }
  },
  computed: {
  }
};
</script>
