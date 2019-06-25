import http from './server';
import qs  from 'qs';

export async function queryListByParentId(id)
{
    let url = "/goodsCategory/getListByParentId";
    if( id != undefined ) url += `?id=${id}`;
    console.log( 'url->',url);

    return http.get(url);
}

export async function deleteById(id)
{
    return http.post('/goodsCategory/delCategory', qs.stringify({id}) );
}

export async function updateItem(data)
{
    return http.post('/goodsCategory/saveCategory', qs.stringify(data) );
}
