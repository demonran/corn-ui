import axios from 'axios';
import patch from './httpPatch';

let opt = {
    timeout: 10000,
    headers: {
        'Accept': 'image/*,application/json;q=0.9, */*;',
        'Content-Type': 'multipart/form-data;boundary=' + form.getBoundary()
    },
    baseURL: '/api-yumimiao'
};

const http = axios.create(opt);

export default {
    post: patch(http, 'post'),
};