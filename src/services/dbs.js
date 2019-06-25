import http from './server';
import qs  from 'qs';

function queryDb(api,index,size,query)
{   
    let url = `${api}?pageNum=${index}&pageSize=${size}`;
    if( query ) url =`${url}&${query}`;
    return http.get(url);
}

export default {
    goods:{
        async queryList(index,size, query)
        {
            return queryDb('/goods/queryGoodsInfo',index,size,query)
        },
        
        async getGoodsInfoById(goodsId)
        {
            return http.post('/goods/getGoodsInfoById', qs.stringify({goodsId}) );
        },
     
        async deleteById(goodsId)
        {
            return http.post('/goods/delGoods', qs.stringify({goodsId}) );
        },
        
        async updateRow(row)
        {
            return http.post('/goods/updateScore', qs.stringify({score: row.score, goodsId:row.goodsId}) );
        }
    },
    color:{
        async queryList(index,size)
        {
            return queryDb('/goodsColor/pageQuery',index,size)
        },

        async deleteById(id)
        {
            return http.post('/goodsColor/delColor', qs.stringify({id}) );
        },

        async updateRow(row) {
            return http.post('/goodsColor/saveColor', qs.stringify(row) );
        },

        async addRow(row) {
            return http.post('/goodsColor/saveColor', qs.stringify(row) );
        }
    },
    spec:{ //规格定义表
        async queryList(index,size)
        {
            return queryDb('/goodsSpecification/pageQuery',index,size)
        },

        async deleteById(id)
        {
            return http.post('/goodsSpecification/delete', qs.stringify({id}) );
        },

        async updateRow(row) {
            return http.post('/goodsSpecification/save', qs.stringify(row) );
        },

        async addRow(row) {
            return http.post('/goodsSpecification/save', qs.stringify(row) );
        }
    },
    tag:{ //标签
        async queryList(index,size)
        {
            return queryDb('/goodsTag/pageQuery',index,size)
        },

        async deleteById(id)
        {
            return http.post('/goodsTag/delTag', qs.stringify({id}) );
        },

        async updateRow(row) {
            return http.post('/goodsTag/saveTag', qs.stringify(row) );
        },
        async addRow(row) {
            return http.post('/goodsTag/saveTag', qs.stringify(row) );
        }
    },
    goodsup:{
        async queryList(index,size, query)
        {
            let url = `/goods/queryGoodsInfo?sellingStatus=1&pageNum=${index}&pageSize=${size}`;
            if( query ) url = `${url}&${query}`;
            return http.get(url);
        },
    },
    goodsdown:{
        async queryList(index,size, query)
        {
            let url = `/goods/queryGoodsInfo?sellingStatus=0&pageNum=${index}&pageSize=${size}`;
            if( query ) url = `${url}&${query}`;

            return http.get( url );
        },
    },
    goodswait:{
        async queryList(index,size, query)
        {
            let url = `/goods/queryGoodsInfo?sellingStatus=3&pageNum=${index}&pageSize=${size}`;
            if( query ) url = `${url}&${query}`;
            
            return http.get( url );
        },
    },
    guider:{
        async queryList(index,size)
        {
            return http.get(`/shoppingGuide/query?pageNum=${index}&pageSize=${size}`);
        },
        async deleteById(userId)
        {
            return http.post('/shoppingGuide/del', qs.stringify({userId}) );
        },
        async updateRow(row) {
            return http.post('/shoppingGuide/update', qs.stringify(row) );
        },
        async addRow(row) {
            return http.post('/shoppingGuide/add', qs.stringify(row) );
        }
    },
    coupon:{
        async queryList(index,size)
        {
            return http.get(`/coupon/query?pageNum=${index}&pageSize=${size}`);
        },
        async deleteById(id)
        {
            return http.post('/coupon/del', qs.stringify({id}) );
        },
        async updateRow(row) {
            return http.post('/coupon/updateStatus', qs.stringify(row) );
        },
        async addRow(row) {
            return http.post('/coupon/add', qs.stringify(row) );
        }
    },
    vr:{
        async queryList(index,size)
        {
            return http.get(`/panorama/manage/query?pageNum=${index}&pageSize=${size}`);
        },
        async deleteById(id)
        {
            return http.post('/panorama/manage/del', qs.stringify({id}) );
        },
        async updateRow(row) {
            return http.post('/panorama/manage/update', qs.stringify(row) );
        },
        async addRow(row) {
            return http.post('/panorama/manage/add', qs.stringify(row) );
        }
    },
    exhibi:{
        async queryList(index,size)
        {
            return http.get(`/xwjShow/list`);
        },
        async deleteById(id)
        {
            return http.post('/xwjShow/del', qs.stringify({id}) );
        },
        async updateRow(row) {
            return http.post('/xwjShow/update', qs.stringify(row) );
        },
        async addRow(row) {
            return http.post('/xwjShow/add', qs.stringify(row) );
        }
    },
    version:{
        async queryList(index,size)
        {
            return http.get(`/app/manage/query?pageNum=${index}&pageSize=${size}`);
        },
        async deleteById(id)
        {
            return http.post('/app/manage/del', qs.stringify({id}) );
        },
        async updateRow(row) {
            return http.post('/app/manage/update', qs.stringify(row) );
        },
        async addRow(row) {
            return http.post('/app/manage/add', qs.stringify(row) );
        }
    },
    pubapp:{
        async queryList(index,size,query)
        {
            let url = `/app/publish/query?pageNum=${index}&pageSize=${size}`;
            if( query != undefined) url = `${url}&${query}`;
            console.log("queryList", url);
            return http.get( url );
        },

        async deleteById(id)
        {
            return http.post('/app/publish/del', qs.stringify({id}) );
        },
        async updateRow(row) {
            return http.post('/app/publish/update', qs.stringify(row) );
        },
        async addRow(row) {
            return http.post('/app/publish/add', qs.stringify(row) );
        }
    },
    styles:{
        async queryList(index,size)
        {
            return http.get(`/goodsCategory/getListByParentId?id=0&pageNum=${index}&pageSize=${size}`);
        },

        async deleteById(id)
        {
            return http.post('/goodsCategory/delCategory', qs.stringify({id}) );
        },

        async updateRow(row) {
            return http.post('/goodsCategory/saveCategory', qs.stringify(row) );
        },

        async addRow(row) {
            return http.post('/goodsCategory/saveCategory', qs.stringify(row) );
        }
    },
    spaces:{
        async queryList(index,size)
        {
            return http.get(`/goodsCategory/getListByParentId?id=0&pageNum=${index}&pageSize=${size}`)
        },

        async deleteById(id)
        {
            return http.post('/goodsCategory/delCategory', qs.stringify({id}) );
        },

        async updateRow(row) {
            return http.post('/goodsCategory/saveCategory', qs.stringify(row) );
        },

        async addRow(row) {
            return http.post('/goodsCategory/saveCategory', qs.stringify(row) );
        }
    },
    orderswaitsend:{
        async queryList(index,size)
        {
            let url = `/erpOrder/query?pageNum=${index}&pageSize=${size}&orderStatus=1`;
           
            return http.get( url );
        },
    },
    orderswaitget:{
        async queryList(index,size)
        {
            let url = `/erpOrder/query?pageNum=${index}&pageSize=${size}&orderStatus=2`;
        
            return http.get( url );
        },
    },
    orders:{
        async queryList(index,size)
        {
            let url = `/erpOrder/query?pageNum=${index}&pageSize=${size}`;
        
            return http.get( url );
        },
    },
    designScheme:{
        async queryList(index,size, query)
        {
            return queryDb('/erp/designScheme/search',index,size,query)
        },
        
        async deleteById(id)
        {
            return http.post('/erp/designScheme/del', qs.stringify({id}) );
        },

        async updateRow(row) {
            return http.post('/erp/designScheme/update', qs.stringify(row) );
        },

        async addRow(row) {
            return http.post('/erp/designScheme/add', qs.stringify(row) );
        }
    },
}

