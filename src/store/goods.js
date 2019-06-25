/**
 * 项目相关配置和数据管理
 */
import {queryList,getGoodsInfo,addSku,addGoods,editGoods,editSkus,deleteSku,upGoods,downGoods,updateGoodsInfoService, addGoodsInfoService} from "../services/goods";
import dbsServices from "../services/dbs";

export default {
    namespaced: true,
    state:{
        dbgoods:null,//商品列表
        query:"",
        skuList:[],
        currGoodsInfo:null
    },
    mutations:{
        updateCurrentGoods(state, info)
        {
            state.currGoodsInfo = info;
        },
        updateGoodsdb(state,{db,query})
        {
            state.dbgoods = db;
            state.query = query;
        },
        updateGoodSku(state,{id,sku}) 
        {
            if( !state.dbgoods ) return;
            let list = state.dbgoods.list;
            let n = list.length;
            for(let i=0; i<n; i++) {
                let item = list[i];
                if( item.goodsId == id) {
                    item.skuList = sku;
                    break;
                }
            }
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
        goodsSkuList(state, getters)
        {
            if(!state.currentGoods) return [];

            console.log(state.currentGoods);
            return state.currentGoods.skuList;
        }
    },

    actions: {
        async QueryGoodslist({dispatch, commit,state},{index, size, query})  
        {
            let service = dbsServices.goods;
            let db = state.dbgoods;

            let i = index, s = size;
            if(index == undefined) index = 1;
            if(size == undefined) size = 20;
            if( !query ) query = state.query;

            if( db ) {
              if(i == undefined) index = db.pageNum;
              if(s == undefined) size = db.pageSize;
            }   
            let queryList = service.queryList;
  
            const {data} = await queryList(index,size,query);
  
            if( data.errorNo != '0' ) {
                return data.errorDesc;
            } 
            commit('updateGoodsdb', {db:data.result,query});
            //获取所有sku
            let list = data.result.list;
            if( !list ) return;
            
            let n = list.length;
            for(let i=0; i<n; i++)
            {
                let id = list[i].goodsId;
                const {data} = await getGoodsInfo( id );
                
                if( data.errorNo == "0") {
                    commit('updateGoodSku',{id, sku:data.result.skuList});
                }
            }
        },

        async getGoodsInfoById({dispatch, commit}, id)
        {
            const {data} = await getGoodsInfo(id);
            
            if( data.errorNo == '0' ) {
                commit('updateCurrentGoods', data.result);

                return data.result
            }
        },

        async addGoodsSku({dispatch, commit}, info)
        {
            const {data} = await addSku( info );
            
            if( data.errorNo == '0' ) {
                return true
            }
            return false;
        },
        async editGoodsSku({dispatch, commit}, info)
        {
            const {data} = await editSkus( info );
            
            console.log( data );
            
            if( data.errorNo == '0' ) {
                return true
            }
            return false;
        },
        async deleteGoodsSku({dispatch, commit}, skuid)
        {
            const {data} = await deleteSku( skuid );
            
            if( data.errorNo == '0' ) {
                return true
            }
            return false;
        },

        async addGoodsItem({dispatch, commit},info)
        {
            console.log(info);
            
            const {data} = await addGoods( info );
            
            return data;
        },

        async editGoodsItem({dispatch, commit},info)
        {
            const {data} = await editGoods( info );
            
            if( data.errorNo == '0' ) {
                 return true
            }
            console.warn(data);
          
            return false; 
        },
        async editGoodsItem({dispatch, commit},info)
        {
            const {data} = await editGoods( info );
            
            if( data.errorNo == '0' ) {
                 return true
            }
            console.warn(data);
          
            return false; 
        },
        async upGoodsItem({dispatch, commit},id)
        {
            const {data} = await upGoods( id );
            
            if( data.errorNo == '0' ) {
                 return true
            }
            console.warn(data);
            return false; 
        },
        async downGoodsItem({dispatch, commit},id)
        {
            const {data} = await downGoods( id );
            
            if( data.errorNo == '0' ) {
                 return true
            }
            console.warn(data);
            return false; 
        },
        async addGoodsInfo({dispatch, commit}, info)
        {
            const {data} = await addGoodsInfoService( info );
            
            if( data.errorNo == '0' ) {
                 return;
            } 
            return  data.errorDesc;
        },
        async updateGoodsInfo({dispatch, commit}, info)
        {
            const {data} = await updateGoodsInfoService( info );
            
            if( data.errorNo == '0' ) {
                 return;
            } 
            return  data.errorDesc;
        }

        
    }
}