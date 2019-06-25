<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    background:linear-gradient(0deg,rgba(19,116,212,1),rgba(0,83,166,1));
    display: flex;
    align-items: center;
    flex-direction: column;

    .title{
        font-size: 0.48rem;
        color:white;
        margin-top: 1.25rem;
        margin-bottom: 0.95rem;
    }

    .center {
         width:4.27rem;
        .content {  
            padding: 0.35rem 0.42rem;
            .login-title{
                width: 100%;
                text-align: center;
                font-size: 0.24rem;
                color:#0155A9;
                margin-bottom: 0.53rem;
            }
            height:4.rem;
            background:rgba(255,255,255,1);
            border:1px solid rgba(231, 231, 231, 0.2);
            border-radius:4px;
           
            .el-input {
                margin-bottom: 0.28rem;
            }
            .el-button{
                margin-top: 0.17rem;
            }
            .code{
                display: flex;
            }

        }
        .mirror {
            height: 1.95rem;
        }
    }
}
 .footer {
        font-size: 0.14rem;
        color: white;
        bottom: 0.52rem;
        position:absolute;
        text-align: center;
        width: 100%;
}
.el-button--primary {
    background-color: #F09E00;
    border-color: #F09E00;
}

</style>

<template>
    <div class="login">
        <div class="title">玉米苗数字化教务管理平台</div>

        <div class="center">
            <div class="content">
                <div class="login-title">—— 数字化教务管理平台 ——</div>

                <el-input id="name" prefix-icon="el-icon-user"  v-model="name" placeholder="请输入用户名">
                    <!-- <template slot="prepend">帐号</template> -->
                </el-input> 
            
                <el-input id="password" prefix-icon="el-icon-unlock" v-model="password" type="password" placeholder="请输入密码" >
                    <!-- <template slot="prepend">密码</template> -->
                </el-input>
                
                <div class="code">
                  <el-input id="password" prefix-icon="el-icon-key" v-model="code" placeholder="请输入验证码">
                    <!-- <template slot="prepend">密码</template> -->
                    </el-input>
                  <CheckCode />
                </div>

                <el-button id="login" v-on:click="check" style="width:100%" type="primary">登录 <i class="el-icon-right" /> </el-button>

                
            </div>

        </div>
        
        <div class="footer">
            技术支持：成都玉米苗教育科技有限公司
        </div>
    </div>
</template>
<script>
import {login} from "../services/auth"
import mix from "./mix";
import CheckCode from "@/components/checkCode";

export default {
    mixins:[mix],
    
    components:{
        CheckCode
    },

    data(){
        return {
            name:"liwei",
            password:"123456",
            code:""
        }
    },

    methods:{
        async check(){
            if( this.name && this.password )
            {
                const {data} =  await login( this.name, this.password);
                if( data.errorNo == "0")
                {
                    this.toast("登陆成功");

                    this.$router.back();
                } else {
                    this.toast(data.errorDesc);
                }
            }
        }
    }
}
</script>