<template>
    <a-radio :value="value" :checked="checked" @change="test">
      <a-checkable-tag v-model="checked">
        <slot></slot>
      </a-checkable-tag>
    </a-radio>
</template>

<script>
    export default {
        name: "RadioTag",
      props:['value'],
      data(){
          return {
            checked: false
          }
      },
    watch: {
      value: function value(val) {
        this.updatingValue = false;
        this.stateValue = val;
      }
    },
      methods:{
          test(event) {
            console.log(event.target.checked)
            this.checked = event.target.checked
          }

      }
    }
</script>

<style scoped>

</style>
