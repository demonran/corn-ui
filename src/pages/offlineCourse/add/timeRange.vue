<style lang="less" scoped>
.time-range {
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  .time-picker {
    width: 45%;
  }
}
</style>

<template>
  <div class="time-range">
    <a-time-picker
      format="HH:mm"
      class="time-picker"
      v-model="start"
      @change="rangChagne"
      :allowEmpty="false"
    />
    <span>-</span>
    <a-time-picker
      format="HH:mm"
      class="time-picker"
      v-model="end"
      @change="rangChagne"
      :allowEmpty="false"
    />
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    value: Object
  },
  data() {
    return {
      start: moment("09:00", "HH:mm"),
      end: moment("17:00", "HH:mm")
    };
  },

  created() {
    let data = this.$route.params.data;
    if (data) {
      console.log(data.startClassTime);
      this.start = moment(data.startClassTime, "HH:mm");
      this.end = moment(data.endClassTime, "HH:mm");
      console.log(data.endClassTime);
    }
  },
  watch: {
    value(val = {}) {
      let start = this.start.format("HH:mm");
      let end = this.end.format("HH:mm");
      if (val.start !== start) this.start = moment(val.start, "HH:mm");
      if (val.end !== end) this.end = moment(val.end, "HH:mm");
      console.log(this.start);
      console.log(this.end);
    }
  },
  methods: {
    rangChagne() {
      console.log();
      let start = this.start.format("HH:mm");
      let end = this.end.format("HH:mm");
      if (!this.value || this.value.start != start || this.value.end != end) {
        this.$emit("change", { start, end });
      }
    }
  }
};
</script>
