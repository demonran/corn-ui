import http from './http';
import qs  from 'qs';
import axios from 'axios';

export async function getCategory() {
    return http.get("/mock/cateGory/list");
}
