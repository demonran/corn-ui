<style lang="less" scoped>
.ui-select {
    display: flex;
    align-items: center;
}
</style>

<template>
    <div class="ui-select">
        <span v-if="config.label">{{config.label}}</span>
        <a-select v-model="selected" :style="{width:config.width}" @change="handleSortChange">
            <a-select-option v-for="(option) in config.dataS.array"
                :key="option.value" :value="option.value" v-if="config.dataS.array">
                {{
                    option.label
                }}
            </a-select-option>
        </a-select>
    </div>
</template>

<script>
export default {
  props: ['config', 'value'],
  data () {
    return {
      selected: -1
    };
  },
  watch: {
    value () {
      if (this.value != this.selected) {
        this.selected = this.value;
      }
    }
  },
  created () {
    this.selected = this.value;
  },

  methods: {
    handleSortChange () {
      this.$emit('change', this.selected);
    }
  },
  computed: {
  }
};
</script>
