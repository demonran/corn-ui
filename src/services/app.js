import http from './http';
import qs  from 'qs';

export async function queryAppList()
{
    return http.get('/api/app/list');
}

export async function addApp(appinfo)
{

    return http.post('/api/app/add',qs.stringify(appinfo));
}

export async function deleteApp(id)
{
    return http.post('/api/app/delete',qs.stringify({_id:id}));
}

export async function release({appName,url,versionName,versionCode,force,_id})
{
    return http.post('/api/app/release',qs.stringify({appName,url,versionName,versionCode,force,_id}));
}


