
import {queryList,deliveryGoodsService} from "../services/order";

export default {
    namespaced: true,
    state:{
        dborder:null,
    },
    mutations:{
        updatedb(state, db)
        {
            state.dborder = db;
        },
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
        async queryOrderlist({dispatch, commit,state},{index, size,status})  
        {
            if(index == undefined) index = 1;
            if(size == undefined) size = 20;
            let db = state.dbpromo;
            if( db ) {
              if(index == undefined) index = db.pageNum;
              if(size == undefined) size = db.pageSize;
            }
            const {data} = await queryList(index,size,status);

            if( data.errorNo != '0' ) {
                return data.errorDesc;
            }
            commit('updatedb', data.result);
        },

        async deliveryGoods({dispatch, commit,state}, para)
        {
            const {data} = await deliveryGoodsService(para);
            if( data.errorNo != '0' ) {
                return data.errorDesc;
            }
        }
    }
}