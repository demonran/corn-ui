/**
 * 项目相关配置和数据管理
 */
import {queryListByParentId,deleteById,updateItem} from "../services/category";
import { queryPromTypeList } from "../services/promotion";

function _loadChildrenData(item, originArray) 
{   
    for (let i = 0; i < originArray.length; i++) {
      let originItem = originArray[i]

      // 判断是否是item项的子项
      if (originItem.parentId === item.id) {
        
        let node = {...originItem};

        node['level'] = item.level + 1;
        
        item.children.push(node);
        node.children = [];

        _loadChildrenData(
          node,
          originArray,
        )
      }
    }
}

export default {
    namespaced: true,
    state:{
        list:[],//所有分类数据
        showing:[],//当前显示的所有分类id
    },

    mutations:{
        updateList(state, list)
        {
         
            state.list = list;
        },
        toggleRowShow(state, id)
        {
            let index = state.showing.indexOf(id);
            if( index > -1  )
            {//隐藏处理
                state.showing.splice(index,1);
                return;
            }
            //显示
            state.showing.push( id );
        }
    },

    getters:{
        treeData(state,getters)
        {
            let treeObjs=[],dataArray=state.list;
            let level = 1
            for (let i = 0; i < dataArray.length; i++) {
                let item = dataArray[i]
                // 查找一级分类
                if (item.parentId === 0) {
                    let node = {...item};
                    node.level = level;
                    node.children = [];
                    treeObjs.push(node);

                    _loadChildrenData(node, dataArray)
                }
            }
            return treeObjs
        },

        treeGridData(state,getters)
        {
            function handleItem( item,result, showing)
            {
                let id = item.id, n=showing.length;
                let needShow = showing.indexOf(id)>-1;
                item.showChildren = needShow;

                if(needShow) {
                    item.children.forEach(el => {
                        result.push(el);
                        handleItem(el, result,showing);
                    });
                }
            }

            let treeObjs = getters.treeData, n=treeObjs.length;
            let ret = [];
            for(let i=0; i<n; i++) {
                let item = treeObjs[i];
                ret.push( item );
                handleItem(item, ret, state.showing);
            }

            return ret;
        },
        goodsCategoryList(state,getters)
        {
            let treeObjs = getters.treeData, n = treeObjs.length;
            let ret = [];//{id:xx,name:'xx|jyes'}
            
            function getNames(node, prename)
            {
                let currName = prename ==undefined ? node.cName: prename+ `|${node.cName}`;
                if(node.children.length == 0 ) {
                    ret.push( {id:node.id, name:currName} );
                }else{
                    let n = node.children.length;
                    for(let i=0; i<n; i++) {
                        getNames(node.children[i], currName);
                    }
                }   
            }
        
            for(let k=0; k<n; k++)
            {
                getNames(treeObjs[k]);
            }

            return ret;
        },
        
        typeList(state,getters) //户型列表
        {
            let treeObjs = getters.treeData, n = treeObjs.length;
            let ret = [];//{id:xx,name:'xx|jyes'}
            
            let node = null;
            while(n--) if(treeObjs[n].cName == '户型')
            {  
                node = treeObjs[n];
                break;
            }
            if( !node ) return ret;

            n = node.children.length;
            for(let i=0; i<n; i++) {
                let item = node.children[i];
                ret.push({id:item.id, name:item.cName})
            }
            return ret;
        },

        cateList(state,getters) //品类列表
        {
            let treeObjs = getters.treeData, n = treeObjs.length;
            let ret = [];//{id:xx,name:'xx|jyes'}
            
            let node = null;
            while(n--) if(treeObjs[n].cName == '单品')
            {  
                node = treeObjs[n];
                break;
            }
            if( !node ) return ret;

            n = node.children.length;
            for(let i=0; i<n; i++) {
                let item = node.children[i];
                ret.push({id:item.id, name:item.cName})
            }
            return ret;
        },
        styleList(state, getters) //风格列表
        {
            let treeObjs = getters.treeData, n = treeObjs.length;
            let ret = [];//{id:xx,name:'xx|jyes'}
            
            let node = null;
            while(n--) if(treeObjs[n].cName == '风格')
            {  
                node = treeObjs[n];
                break;
            }
            if( !node ) return ret;

            n = node.children.length;
            for(let i=0; i<n; i++) {
                let item = node.children[i];
                ret.push({id:item.id, name:item.cName})
            }
            return ret;
        },
        spaceList(state, getters) //空间列表
        {
            let treeObjs = getters.treeData, n = treeObjs.length;
            let ret = [];//{id:xx,name:'xx|jyes'}
            
            let node = null;
            while(n--) if(treeObjs[n].cName == '空间')
            {  
                node = treeObjs[n];
                break;
            }
            if( !node ) return ret;

            n = node.children.length;
            for(let i=0; i<n; i++) {
                let item = node.children[i];
                ret.push({id:item.id, name:item.cName})
            }
            return ret;
        }
    },

    actions: {
        async getNameById({dispatch, commit,state,getters},{type,id})
        {
            let list = getters[type];
            if( !list ) return null;

            let n = list.length;
            let ret = null;
            while(n--)
            {
                if(list[n].id == id ) {
                    ret = list[n].name;
                    break;
                }
            }
            return ret;
        },
        
        async getIdByName({dispatch, commit,state,getters},{type,name})
        {
            
            let list = {typeList:getters.typeList, styleList:getters.styleList}[type];
           
            if( !list ) return null;

            let n = list.length;
            let ret = null;
            while(n--)
            {
                if(list[n].name == name ) {
                    ret = list[n].id;
                    break;
                }
            }
            return ret;
        },

        async QueryCategorylist({dispatch, commit,state})
        {
            const {data} =  await queryListByParentId();

            if( data.errorNo == '0' ) {
                commit('updateList', data.result);
                return "";
            }
            return data.errorDesc;
        },

        async updateCategory({dispatch, commit}, info)
        {
            const {data} = await updateItem(info);
        
            if( data.errorNo == '0' ) {
               await dispatch('QueryCategorylist');
               return;
            } 
            return data.errorDesc;
        },

        async delete({dispatch, commit,getters}, id)
        {
            let treeData = getters.treeData;

            console.log(id,treeData);
            let idsToDel = [];
            function iterateTree(node, add)
            {
                let same = node.id == id;
                let childrens = node.children,n = childrens.length;
                while(n--) {
                    iterateTree(childrens[n],same);
                }
                if(same) { 
                    idsToDel.push( id );
                    return false;
                }
                if( add ) {
                    idsToDel.push( node.id );
                }
                return true;
            }
            let n = treeData.length;
            while(n--) {
                if( !iterateTree(treeData[n]) ) {
                    break;
                }
            }
            n = idsToDel.length;
            console.log( idsToDel );

            while(n--)
            {
                await deleteById( idsToDel[n] );
            }
            
            await dispatch("QueryCategorylist");
        }
    }
}