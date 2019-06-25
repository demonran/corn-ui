<template>
  <div class="swiper" :style="`padding-top: ${data.rate * 100}%;`">
    <swiper v-if="data.images.length" :config="config" v-model="index">
      <slide v-for="(item, i) in data.images" :key="i">
        <div class="item" @click="goto(item)">
          <icon v-if="item.type == 'panorama'" type="3d"/>
          <img :src="item.src" />
        </div>
      </slide>
      <div class="album-pager" slot="pagination">
        {{index + 1}}/{{data.images.length}}
      </div>
    </swiper>
  </div>
</template>
<script>
import icon from "../comm/icon"
import swiper from  "../comm/swiper.vue";
import slide from "../comm/slide";

export default {
  components: { swiper, slide, icon },
  props:{
    data:{
      type:Object,
      required:true
    }
  },
  watch:{
    data(){
      console.log("changing");
    }
  },
  data() {
    return {
      info: {
        rate: 1,
        images: []
      },
      index: 0,
      config: {
        
      }
    };
  },
  methods: {
    goto(item) {
      if( item.type == "panorama") {
          Infish.pushWind("panorama",{showTitle:false,showBack:true}, "id="+item.target);
          return;
      }
      if( item.type == "web") {
          Infish.pushWind(item.target, {title:"像我家", showTitle:true});
          return;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.swiper{
  position: relative;
  .swiper-container{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.item{
  position: relative;
  width: 100%;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .inficon{
    position: absolute;
    width: .8rem;
    height: .8rem;
    top: 50%;
    left: 50%;
    font-size: .8rem;
    color: #fff;
    transform: translate(-50%, -50%);
  }
}

.album-pager{
  position: absolute;
  bottom: .2rem;
  right: .2rem;
  width: .8rem;
  height: .4rem;
  border-radius: .2rem;
  color: #fff;
  font-size: .24rem;
  background: rgba(0,0,0,.5);
  text-align: center;
  z-index: 9;
}
</style>
