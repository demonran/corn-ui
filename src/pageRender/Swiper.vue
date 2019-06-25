<template>
  <div class="swiper_root" :style="`padding-top: ${rate * 100}%;`">
    <swiper :config="config" v-model="index">
      <slide v-for="(item, i) in images" :key="i">
        <div class="item" @click="goto(item.url)">
          <icon v-if="item.type == '3d'" type="3d"/>
          <img :src="item.src" />
        </div>
      </slide>
      <div class="album-pager" slot="pagination">
        {{index + 1}}/{{images.length}}
      </div>
    </swiper> 
  </div>
</template>
<script>
import { swiper, slide, icon } from "../infish-ui";
import { parse } from 'path';

export default {
  components: { swiper, slide, icon },
  props: {
    data: Object,
    pageData: Object
  },
  data() {
    return {
      index: 0,
      config: {
        
      }
    };
  },
  computed:{
    rate(){
      console.log( this.data );

      if( this.data.rate ) return parseFloat(this.data.rate);
      return 0.4;
    },
    images(){
      
      if( this.data.images ) {
        console.log( this.data.images.length);
        return this.data.images;
      }
      return [];
    }
  },
  methods: {
    goto(url) {
      url && Infish.pushWind(url);
    }
  }
};
</script>

<style lang="less" scoped>
.swiper_root{
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
