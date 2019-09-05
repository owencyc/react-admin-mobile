import { ajaxApi }  from '../utils/request'

const apiPath='http://127.0.0.1:8000/autumn';
//const apiPath='http://localhost:51281/api/adapter';

export const getData = (uri) =>ajaxApi(apiPath+uri,{method:"get"})

export const post = (uri,data) =>ajaxApi(apiPath+uri,{method:"post",data:data})