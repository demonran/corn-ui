<template>
  <div class="skuGroup_root">
    <div class="content">
      <div class="title">{{data.title}}</div>
      <img class="image" :src="data.image" >
      <div class="desc">{{data.desc}}</div>
      <div class="list">
        <SkuItem class="list-item" v-for="(item, i) in showSkus" :key="i" :data="item"/>
      </div>
      <div class="more" v-if="data.skus.length > 3" @click="trigger">
        {{showAll?'收起':'展开更多'}}<icon :type="showAll?'top':'bottom'"></icon>
      </div>
    </div>
  </div>
</template>
<script>
import SkuItem from "./SkuItem";
import { swiper, slide, icon } from "../infish-ui";

export default {
  components: { swiper, slide, icon, SkuItem },
  props: {
    data: Object,
    pageData: Object
  },
  data() {
    return {
      showAll: false
    };
  },
  computed: {
    showSkus(){
      return this.data.skus.slice(0, this.showAll? undefined :3);
    }
  },
  methods: {
    trigger(){
      this.showAll = !this.showAll;
    }
  }
};
</script>

<style lang="less" scoped>
.skuGroup_root{
  margin: .16rem 0;
  background: #fff;
  .content{
    margin: 0 .24rem;
  }

  .title{
    color: #2F2F2F;
    font-size: .36rem;
    line-height: .98rem;
    font-weight:bold;
  }
  .desc{
    font-size: .24rem;
    color: #595959;
    padding: .18rem 0;
  }
  .image{
    width: 100%;
    vertical-align: bottom;
  }
  .list{
    .list-item{
      margin-bottom: .24rem;
    }
  }
  .more{
    width: 2rem;
    margin: 0 auto;
    text-align: center;
    font-size: .24rem;
    color: #7e7e7e;
    .inficon{
      margin-left: .1rem;
    }
  }
}


</style>
