/**
 * 项目相关配置和数据管理
 */
import dbsServices from "../services/dbs";

export default {
    namespaced: true,
    state:{
        dbs:[],
    },

    mutations:{
        updateGoodsList(state, {name,data})
        {
            let curr = state.dbs, n=curr.length;

            let newDbs = [];
            let inserted = false;
            while(n--)
            {
                if( curr[n].name != name) newDbs.push( curr[n] );
                else {
                    inserted = true;
                    newDbs.push({name:name, ...data});
                }
            }
            if( inserted == false) {
                newDbs.push({name:name, ...data});
            }
            state.dbs = newDbs;
        }
    },

    getters:{
        dbs(state,getters)
        {
            return state.dbs;
        },
    },

    actions: {
        //查询表数据
        async getDbData({dispatch, commit,state}, {name, index, size, query}) {
          
          let service = dbsServices[name];
          if( !service ) {
              let tip = "getDbData not find dbservice"+name;
              console.error( tip);
              return tip;
          }
          let dbs = state.dbs,n = dbs.length;
          let db = null;
          while(n--){
              if(dbs[n].name == name) {
                 db = dbs[n];
                 break;
              } 
          }
          let i = index;
          let s = size;
          if(index == undefined) index = 1;
          if(size == undefined) size = 20;
          if( db ) {
            if( i == undefined ) index = db.pageNum;
            if( s == undefined ) size = db.pageSize;
            if( query == undefined) query = db.query;
          }
          console.log(`${name} query-->`, query);
          console.log(`${name} page-->`, index);

          let queryList = service.queryList;

          const {data} = await queryList(index,size,query);

          if( data.errorNo == '0' ) {
              let d = data.result;
              if( Array.isArray( d ) ) { //返回结果没有分页
                d = {list:d, query};
              } else {
                  d.query = query;
              }
              commit('updateGoodsList', {data:d,name});
          } else {
              return data.errorDesc;
          }
        },
        async deleteRowByid({dispatch, commit,state},{name, id})
        {
            let service = dbsServices[name];
            if( !service ) {
                let tip = "deleteRowByid not find dbservice"+name;
                console.error( tip );
                return tip;
            }
            let deleteById = service.deleteById;
            if( !deleteById ) {
                let tip = `dbs ${name} service deleteById is not definded`;
                console.error(tip);
                return tip;
            }

            const {data} = await deleteById(id);
  
            if( data.errorNo == '0' ) {
               await dispatch("getDbData",{name});
            }
        },
        async updateRow({dispatch, commit,state},{name,row})
        {
            let service = dbsServices[name];
            if( !service ) {
                let tip = "UpdateRow not find dbservice"+name;
                console.error( tip );
                return tip;
            }
            let UpdateRow = service.updateRow;
            if( !UpdateRow ) {
                let tip = `dbs service UpdateRow ${name} is not definded`;
                console.error(tip);
                return tip;
            }

            const {data} = await UpdateRow(row);
  
            if( data.errorNo == '0' ) {
               await dispatch("getDbData",{name});
            } else {
                return data.errorDesc;
            }
        },
        async addRow({dispatch, commit,state},{name,row})
        {
            let service = dbsServices[name];
            if( !service ) {
                let tip = "UpdateRow not find dbservice"+name;
                console.error( tip );
                return tip;
            }
            let addRow = service.addRow;
            if( !addRow ) {
                let tip = `dbs service addRow ${name} is not definded`;
                console.error(tip);
                return tip;
            }

            const {data} = await addRow(row);
  
            if( data.errorNo == '0' ) {
                //await dispatch("getDbData",{name});

               return {result:data.result};
            }else {
                return {error: data.errorDesc};
            }
        },

        async getRowInfos({dispatch, commit,state},{name,filter})
        {
            await dispatch("getDbData",{name,index:1,size:1000});

            let dbs = state.dbs, n=dbs.length,db=null;
            while( n-- )
            {
                if(dbs[n].name == name) {
                    db = dbs[n];
                    break;
                }
            }
            if( !db ) return [];

            if( filter == undefined) return db.list;

            return db.list.map( filter );
        },

        getDbByName({state},name)
        {
            let dbs = state.dbs,n= dbs.length;
            let ret = [];
            while(n--)
            {
              if( dbs[n].name == 'styles') {
                ret = dbs[n].list;
                break;
              } 
            }
            return ret;
        }
    }
}