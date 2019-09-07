import { ajaxApi }  from '../utils/request'

const apiPath='http://www.pedalo.cn:8080/autumn';
//const apiPath='http://localhost:8000/autumn';

export const getData = (uri) =>ajaxApi(apiPath+uri,{method:"get"})

export const post = (uri,data) =>ajaxApi(apiPath+uri,{method:"post",data:data})