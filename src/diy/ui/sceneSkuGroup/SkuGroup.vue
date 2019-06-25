<template>
  <div class="skuGroup">
    <div class="content">
      <div class="title">{{data.title}}</div>
      <img class="image" :src="data.image" >
      <div class="desc">{{data.desc}}</div>
      <div class="list">
        <SkuItem class="list-item" v-for="(item, i) in showSkus" :key="i" :data="item"/>
      </div>
      <div class="more" v-if="resouces.skuList.length > 3" @click="trigger">
        {{showAll?'收起':'展开更多'}}<icon :type="showAll?'top':'bottom'"></icon>
      </div>
    </div>
  </div>
</template>
<script>

import SkuItem from "./SkuItem";
import icon from "../comm/icon"
import swiper from  "../comm/swiper.vue";
import slide from "../comm/slide";
import {DataSources} from "../../const";

export default {
  components: { swiper, slide, icon, SkuItem },
  props:{
    data:{
      type:Object,
      required:true,
    },
    dataSource:Object,
  }, 
  data() {
    return {
      info: {},
      // resouces: {
      //   skuList: [],
      // },

      showAll: false,
    };
  },
  computed: {
    showSkus(){
      return this.resouces.skuList.slice(0, this.showAll? undefined :3);
    },
    resouces(){
       let v = this.dataSource[DataSources.SkuList];
      return {
        skuList:v?v.list:[]
      }
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
.skuGroup{
  margin: .16rem 0;
  background: #fff;
  .content{
    margin: 0 .24rem;
    padding-bottom: .34rem;
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
    margin-top: .2rem;
    .list-item{
      margin-bottom: .24rem;
    }
  }
  .more{
    text-align: center;
    padding: .16rem 0;
    text-align: center;
    font-size: .24rem;
    color: #7e7e7e;
    .inficon{
      margin-left: .1rem;
    }
  }
}


</style>
