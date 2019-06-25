import http from './server';
import qs  from 'qs';

export async function queryList(index,size)
{
    return http.get(`/goods/queryGoodsInfo?pageNum=${index}&pageSize=${size}`);
}

export async function getGoodsInfo(goodsId)
{
    return http.post('/goods/getGoodsInfoById', qs.stringify({goodsId}) );
}

export async function addSku(data)
{
    return http.post('/goods/saveSku', qs.stringify(data) );
}

export async function editSkus(data)
{
    return http.post('/goods/saveSku', qs.stringify(data) );
}

export async function deleteSku(id)
{
    return http.post('/goods/delSku', qs.stringify({skuId:id}) );
}

//添加商品 废弃
export async function addGoods(data)
{
    return http.post('/goods/saveGoodsInfo', qs.stringify(data) );
}

export async function addGoodsInfoService(data)
{
    return http.post('/goods/addGoodsInfo', qs.stringify(data) );
}
export async function updateGoodsInfoService(data)
{
    return http.post('/goods/updateGoodsInfo', qs.stringify(data) );
}

//编辑商品，data带goodsId
export async function editGoods(data)
{
    return http.post('/goods/saveGoodsInfo', qs.stringify(data) );
}

export async function upGoods(goodsId)
{
    return http.post('/goods/onSell', qs.stringify({goodsId}) );
}

export async function downGoods(goodsId)
{
    return http.post('/goods/offSell', qs.stringify({goodsId}) );
}

