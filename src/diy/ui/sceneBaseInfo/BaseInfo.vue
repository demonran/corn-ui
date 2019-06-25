<style lang="less" scoped>
.baseInfo {
  margin-bottom: .16rem;
  background: #fff;
  padding: .36rem 0 .6rem .24rem;
  line-height: 1;
  .line{
    display: flex;
    align-items: center;
    margin-bottom: .45rem;
    .info{
      flex: 1;
      padding-right: .2rem;
      border-right: .01rem solid #F2F2F2;
    }
    .favorite{
      text-align: center;
      width: 1.33rem;
      color: #606060;
      .inficon{
        font-size: .4rem;
      }
      .favorite-text{
        margin-top: .1rem;
        font-size: .2rem;
      }
    }
  }
  .title{
    color: #2F2F2F;
    font-size: .4rem;
    font-weight: bold;
    margin-bottom: .3rem;
  }
  .desc{
    color: #595959;
    font-size: .24rem; 
    .price{
      color: #DA2337;
      font-size: .4rem;
    }
  }
}
</style>
<template>
  <div class="baseInfo">
    <div class="line">
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="desc">{{`${info.type} / ${info.style} / ${info.size}`}}</div>
      </div>
      <!-- <div class="favorite" @click="triggerFavorite">
        <icon :type="isFavorite ? 'favorite' : 'favorite-outline'"/>
        <div class="favorite-text">{{isFavorite ? '已收藏': '收藏'}}</div>
      </div> -->
    </div>
    <div class="desc">
      全屋家居： <span class="price">&yen;{{toltalPrice}}</span>
    </div>
  </div>
</template>
<script>
import icon  from "../comm/icon";
import {DataSources} from "../../const";

export default {
  components: { icon },
  props:{
    data:{
      type:Object,
      required:true
    },
    dataSource:Object
  },
  computed:{
    info() { return this.data},
    toltalPrice() {
       return this.dataSource[DataSources.SkuList].totalPrice
    }
  },
  mounted()
  {
    console.log( this.dataSource );
  },
  data() {
    return {
      // info: {
      //   title: ''
      // },
      isFavorite: false,
    };
  },
  methods: {
    triggerFavorite(){

    }
  }
};
</script>
