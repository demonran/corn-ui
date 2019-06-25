import http from './server';
import qs  from 'qs';

export async function queryList(index,size,typeId,status)
{
    let url = `/promotion/List?pageNum=${index}&pageSize=${size}`;
    if( typeId != undefined) url += `&typeId=${typeId}`;
    if( status != undefined) url += `&status=${status}`;

    return http.get( url );
}

export async function getDetail(id)
{
    let url = `/promotion/getDetailById?id=${id}`;
    return http.get( url );
}


export async function queryPromTypeList()
{
    return http.get(`/promotion/ListType`);
}

export async function addProm(info)
{
    console.log( info );
    return http.post(`/promotion/addPromotion`,qs.stringify(info));
}

//4 删除 
export async function deletePromState(id)
{    
    return http.post(`/promotion/changeStatus`,qs.stringify({id,status:4}));
}
export async function pausePromState(id)
{    
    return http.post(`/promotion/changeStatus`,qs.stringify({id,status:1}));
}

export async function overPromState(id)
{    
    return http.post(`/promotion/changeStatus`,qs.stringify({id,status:3}));
}

export async function startPromState(id)
{    
    return http.post(`/promotion/changeStatus`,qs.stringify({id,status:0}));
}