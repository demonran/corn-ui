<template>
  <div class="item" @click="gotoGoodsDetail">
    <div class="item-img">
      <img :src="data.imgUrl">
    </div>
    <div class="item-content">
      <div class="content-row">
        <div class="row-title">{{data.goodsName}}</div>
        <div class="row-desc">{{data.standards}}</div>
      </div>
      <div class="content-row">
        <div class="row-price">
          &yen;{{data.price}}
        </div>
        <icon class="row-cart" type="cart" @click="addToCart(data.skuId)"/>
      </div>
    </div>
  </div>
</template>
<script>
import { icon } from "../infish-ui";

export default {
  components: { icon },
  props: {
    data: Object
  },
  data() {
    return {
      index: 0,
      config: {}
    };
  },
  methods: {
    gotoGoodsDetail(){
        Infish.pushWind("goods", {showTitle: false,showBack: false},`goodsId=${this.data.goodsId}`);
    },
    addToCart(){
        this.Bus.$emit('addToCart', this.data)
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  position: relative;
  padding-left: 2.2rem;

  .item-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 2.2rem;
    height: 2.2rem;
    background: #ccc;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 2.2rem;
    padding: .1rem .2rem;
    border: solid #f4f4f4;
    box-sizing: border-box;
    border-width: 1px 1px 1px 0;

    .content-row {
      font-size: 0;
    }

    .row-title {
      color: #322d2b;
      font-size: 0.3rem;
    }

    .row-desc {
      color: #7e7e7e;
      font-size: 0.24rem;

      .price {
        color: #da2337;
      }
    }
    .row-cart{
        width: .5rem;
        height: .5rem;
        line-height: .5rem;
        text-align: center;
        font-size: .36rem;
        color: #da2337;
        vertical-align: middle;
    }
    .row-price {
      display: inline-block;
      vertical-align: middle;
      width: calc(~"100% - .5rem");
      height: 0.54rem;
      line-height: 0.54rem;
      color: #da2337;
      font-size: 0.3rem;
      font-weight: 500;

    }
  }
}
</style>
