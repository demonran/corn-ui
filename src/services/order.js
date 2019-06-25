import http from './server';
import qs  from 'qs';

export async function queryList(index,size,status)
{
    let url = `/erpOrder/query?pageNum=${index}&pageSize=${size}`;
    if( status != undefined) url += `&orderStatus=${status}`;
    return http.get( url );
}

export async function deliveryGoodsService({orderId,expressNo})
{
    let url = `/erpOrder/deliveryGoods`;
    let parms = {orderId,expressNo};

    return http.post( url, qs.stringify(parms));
}
export async function refundService(orderId)
{
    let url = `/erpPay/refund`;
    let parms = {orderId};
    return http.post( url, qs.stringify(parms));
}

export async function pushOrderService(orderId)
{
    let url = `/erpOrder/pushOrder`;
    let parms = {orderId};
    return http.post( url, qs.stringify(parms));
}

export async function expressInfoService(orderId)
{
    let url = `/erpOrder/expressInfo?orderId=`+orderId;
    return http.get( url);
}
