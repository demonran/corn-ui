<template>
  <div class="plate">
    <div class="plate-title">
      <div class="title-text">{{title}}</div>
      <div class="title-content">
        <slot name="title"></slot>
      </div>
      <div v-if="clickToUrl" class="title-right" @click="goto">
        {{entryText}}
        <icon type="right"/>
      </div>
    </div>
    <div class="plate-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import icon from "../icon"

export default {
  components: {
    icon
  },
  props: {
    title: String,
    clickToUrl: String,
    entryText: {
      type: String,
      default: "更多"
    }
  },
  methods: {
    goto() {
      Infish.pushWind(this.clickToUrl);
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.plate {
  //
}
.plate-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.88rem;
  padding: 0 0.25rem;

  .title-text{
    color: #2f2f2f;
    font-size: 0.36rem;
    font-weight: bold;
    line-height: 1;
  }

  .title-content{
    flex: 1;
    font-size: 0;
  }

  .title-right{
    color: #595959;
    font-size: 0.24rem;
    .inficon {
      margin-left: 0.06rem;
      font-size: 0.2rem;
    }
  }
}
</style>