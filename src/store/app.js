/**
 * 项目相关配置和数据管理
 */
import {queryAppList,addApp,deleteApp,release} from "../services/app";

export default {
    namespaced: true,
    state:{
        applist:[],
        currAppId:'',
    },
    mutations:{
        updateList(state, list)
        {
            state.applist = list;
        },
        updateCurrentAppId(state, id)
        {
            state.currAppId = id;
        }
    },

    getters:{
        appVersion(state,getters)
        {
            let n = state.applist.length;
            let versions = [];
            while(n--)
            {
                if(state.applist[n]._id == state.currAppId ) {
                    versions = state.applist[n].versions;
                    break;
                }
            }

            n = versions.length;
            let ret = [];
            while(n--) ret.push(versions[n]);

            return ret;
        },
    },

    actions: {
        async getAppList({dispatch, commit})  
        {
            const {data} =  await queryAppList();

            if( data && data.length > -1 ) {
                commit('updateList', data);
            }
        },
        async addApp({dispatch, commit,state},info)  
        {
            let find = false;
            let n = state.applist.length;
    
            while(n--)
            {
                if( state.applist[n].packagename == info.packagename)
                {
                    find = true;
                    break;
                }
            }
            if( find ) return "包名不能重复";

            const result =  await addApp(info);

            if( result.status == 200) {
              await  dispatch("getAppList");

              return "添加成功";
            }
            return "添加失败";
        },

        async requestDeleteApp({dispatch, commit},id)  
        {
            const result =  await deleteApp( id );

            if( result.status == 200) {
              await  dispatch("getAppList");
            }
        },

        async releaseVersion({dispatch, commit,state}, {appName,url,versionName,versionCode,force,_id, packagename})
        {
            let app = state.applist.filter(item=>item._id == _id)[0];
            if( app.packagename != packagename )
            {
                return "包名和应用设置的包名不一致";
            }
            
            const result = await release({appName,url,versionName,versionCode,force,_id});
            let tip = "发布失败";
            if( result.status == 200) {
                if( !result.data.error )
                {
                    tip = "发布成功";
                    await  dispatch("getAppList");
                }else {
                    tip = result.data.error;
                }
            }

            return tip;
        }
    }
}