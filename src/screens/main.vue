
<style lang="less" scoped>
 .main-screen {
    display: flex;

    .left {
      width: 1.6rem;
      min-height: 100vh;
      flex-grow: 0;
      background: #001529;
      color: white;

      .logo-panel {
        height: 1.33rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .logo{
          height: 0.83rem;
          width: 0.83rem;
          border-radius: 50%;
          background-color: gray;
        }
        margin-bottom: 0.36rem;
      }
      .menu {
        padding-left: 0.34rem;
        height: 0.42rem;
        line-height: 0.42rem;
        text-align: left;
        font-size: 0.2rem;
        cursor: pointer;
        margin:0.09rem 0;

        &.active{
          background-color: #1890FF;
        }
      }
    }
    .right {
      flex-grow: 1;
      min-height: 100vh;
      display: flex;
      flex-direction: column;

      .top {
        height:0.64rem;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 4px rgba(0,21,41,0.12);
        display: flex;
        align-items: center;
        padding-left: 0.3rem;
        padding-right: 0.35rem;
        box-sizing: border-box;
        justify-content: space-between;

        .school-name{
          font-size: 0.2rem;
          font-weight: bold;
          color: #141414;
        }
        .right-area{
          display: flex;
          align-items: center;
            i {
              font-size: 0.2rem;
              margin-right: 0.32rem;
              cursor: pointer;
            }
           
            .avator{
              width:0.29rem;
              height:0.29rem;
              border-radius:50%;
            }
            .username{
              margin: 0 0.1rem;
              color: black;
              text-decoration-line: none;
            }
        }
        
      }
      .content{
        flex-grow: 1;
        padding:0.23rem 0.3rem 0.39rem 0.3rem;
        box-sizing: border-box;
        background-color: #F8F8F8;
        display: flex;
      }
    }
  }
  .footer{
    margin: 10px 0;
    text-align:center;
  }
</style>
<template>
  <div class="main-screen">
    <div class="left">
       <div class="logo-panel">
          <div class="logo">
              
          </div>
       </div>
        
        <div class="menu" @click="clickLeftMenu(index)" :key="index" :class="{active:index==menuIndex}" v-for="(item,index) in config">
            {{item.title}}
        </div>
    </div>
    <div class="right">
       <div class="top">
           <span class="school-name">{{name}}</span> 
           <span class="right-area">
               <i class="iconfont iconsearch"></i>
               <i class="iconfont iconmd-notifications-out"></i>
               <img src="../assets/avator.jpeg" class="avator" alt="头像">
               <a href="" class="username">用户名</a>
                <i class="iconfont iconarrow-down-s-line"></i>
           </span>
       </div>
       <div class="content">
         <router-view></router-view>
       </div>
       
       <!-- <div class="footer">
            Copyright@2019 www.yumimiao.cn
       </div> -->
    </div>
    <Popup />
   
  </div>
</template>

<script>
import config from "./config";
import Popup from './Popup/index';
import http from "../services/server";

export default {
  components: {
    Popup
  },
  data () {
    return {
      config:config,
      curr:"",
      croppVisible:false,
      pupopCallback:null,
      name:'成都印象派美术培训',
      leftMenus:["概况","报名","学员","线下课","线上课","作品","动态","财务","设置"],
      menuIndex:3
    }
  },
  methods:{
    clickLeftMenu(index)
    {
       this.menuIndex = index;
       let path =  this.config[index].path;
       this.$router.push(path);
       document.title = '玉米苗-'+this.config[index].title;
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
    this.clickLeftMenu( this.menuIndex );

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