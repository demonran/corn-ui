/**
 * 项目相关配置和数据管理
 */
import {queryList,queryPromTypeList,addProm,deletePromState,pausePromState,startPromState,overPromState,getDetail} from "../services/promotion";

export default {
    namespaced: true,
    state:{
        dbpromo:null,//促销活动数据,
        promTypes:[],
    },
    mutations:{
        updatedb(state, db)
        {
            state.dbpromo = db;
        },
        updatePromType(state, list)
        {
            state.promTypes = list;
        }
    },

    getters:{
        goodsMainUrls(state,getters)
        {
            if( !state.currentGoods ) return [];
          
            let imgUrls = state.currentGoods.imgUrls;
            imgUrls = imgUrls.split(",");
            let n = imgUrls.length;
            let ret = [];
            for(let i=0;i<n;i++)
            {
                if( imgUrls[i] ) ret.push({img:imgUrls[i] });
            }
            return ret;
        },
    },

    actions: {
        async queryPromolist({dispatch, commit,state},{index, size, typeId,status})  
        {
            if(index == undefined) index = 1;
            if(size == undefined) size = 20;
            let db = state.dbpromo;
            if( db ) {
              if(index == undefined) index = db.pageNum;
              if(size == undefined) size = db.pageSize;
            }
            const {data} = await queryList(index,size,typeId,status);

            if( data.errorNo != '0' ) {
                return data.errorDesc;
            } 
            commit('updatedb', data.result);
        },

        async getPromoDetail({dispatch, commit,state},id)  
        {
            
            const {data} = await getDetail( id);

            if( data.errorNo != '0' ) {
                console.warn(data.errorDesc);
                return;
            }
            return data.result;
        },
        
        async queryPromoTypelist({dispatch, commit,state})  
        {
            const {data} = await queryPromTypeList();
            if( data.errorNo != '0' ) {
                return data.errorDesc;
            } 
            commit('updatePromType', data.result);
        },

        async createPromotion({dispatch, commit,state},info)  
        {
            const {data} = await addProm(info);
            if( data.errorNo != '0' ) {
                console.warn( data.errorDesc );
                return data.errorDesc;
            }
        },
        async deletePromotion({dispatch, commit,state},id)  
        {
            const {data} = await deletePromState(id);
            if( data.errorNo != '0' ) {
                console.warn(data.errorDesc );
                return false;
            } 
            return true;
        },
        async pausePromotion({dispatch, commit,state},id)  
        {
            const {data} = await pausePromState(id);
            if( data.errorNo != '0' ) {
                console.warn(data.errorDesc );
                return false;
            } 
            return true;
        },
        async startPromotion({dispatch, commit,state},id)  
        {
            const {data} = await startPromState(id);
            if( data.errorNo != '0' ) {
                console.warn(data.errorDesc );
                return false;
            } 
            return true;
        },
        async overPromotion({dispatch, commit,state},id)  
        {
            const {data} = await overPromState(id);
            if( data.errorNo != '0' ) {
                console.warn(data.errorDesc );
                return false;
            } 
            return true;
        }
    }
}