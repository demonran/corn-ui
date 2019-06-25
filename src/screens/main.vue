
<style lang="less" scoped>
 .main-screen {
    display: flex;

    .left {
      width: 1.6rem;
      min-height: 100vh;
      flex-grow: 0;
      background: #001529;
      
      .logo {
        height: 0.84rem;
        width: 0.84rem;
        text-align: center;
        background: #002140;
        color: white;
        display: inline-block;
        border-radius: 0.42rem;
      }
      .menu {
        padding-left: 4px;
      }
    }
    .right {
      flex-grow: 1;
      min-height: 100vh;
      display: flex;
      flex-direction: column;

      .top {
        height: 64px;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      }
      .content{
        flex-grow: 1;
      }
    }
  }
  .footer{
    margin: 10px 0;
    text-align:center;
  }
  .el-collapse-item__content{
    padding-bottom: 0;
  }
  .menuitem {
    height: 32px;
    padding-left: 10px;
    
    &:hover {
      background-color: gray;
      cursor: pointer;
    }
  }
</style>
<template>
  <div class="main-screen">
    <div class="left">
        <div class="logo">
            玉米苗
        </div>
        <div class="menu">
          <el-collapse >
          
          <el-collapse-item v-for="item in config" :key="item.title"  :title="item.title">
              <div class="menuitem" v-for="info in item.items" :key="info.name" @click="menuJump(info.path);curr=info.name">{{info.name}}</div>
          </el-collapse-item>

          <el-collapse-item title="资源管理">
              <div class="menuitem" @click="showImages">云图片库</div>
          </el-collapse-item>
        </el-collapse>
        </div>
    </div>
    <div class="right">
       <div class="top">
          {{curr}}
       </div>
       <div class="content">
         <router-view></router-view>
       </div>
       
       <div class="footer">
            Copyright@2019 www.yumimiao.cn
       </div>
    </div>
    <imgcrop v-if="croppVisible" @close="croppVisible=false" :callback="pupopCallback"/>
    <Popup />
   
  </div>
</template>

<script>
import config from "./config";
import Popup from './Popup/index';
import imgcrop from './Popup/imgcrop';
import http from "../services/server";

export default {
  components: {
    Popup,imgcrop
  },
  data () {
    return {
      config:config,
      curr:"",
      croppVisible:false,
      pupopCallback:null,
    }
  },
  methods:{
    menuJump(path)
    {
       this.$router.push(path);
    },
    showImages()
    {
       Bus.$emit("showImages");
    }
  },
  created()
  {
    Bus.$on("pauseAutoLoading",()=>{
        // http.interceptors.request.eject(window.requestInterceptors);
        // http.interceptors.response.eject(window.responseInterceptors);
        console.log("pauseAutoLoading");
        http.pauseAutoLoading = true;
    });
    
    Bus.$on("resumeAutoLoading",()=>{
        // http.interceptors.request.use(window.requestInterceptors);
        // http.interceptors.response.use(window.responseInterceptors);
        console.log("resumeAutoLoading");
        http.pauseAutoLoading = false;
    });

    Bus.$on('imgcropper',(cb)=>{
        this.croppVisible = true;
        this.pupopCallback = cb;
    });


  },
  mounted(){
    let loading = null;
    Bus.$on("loading",(load)=>{
        if( !load ) {
          if( loading ) {
            setTimeout(()=>{
              if(loading)  {
                loading.close();
                loading = null;
              }
            },800)
          }
          return;
        }
        
        if( loading ) return;
        loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
    });
  },
  destroyed(){
    Bus.$off("loading");
    Bus.$off('imgcropper');
  }
}
</script>