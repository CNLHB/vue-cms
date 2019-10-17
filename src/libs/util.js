import axios from 'axios';

let util = {};

util.title = function (title) {
  title = title ? title + ' - liaohuabiao.com ' : 'liaohuabiao.com 后台';
  window.document.title = title;
};

const ajaxUrl = process.env.NODE_ENV === 'development' ?
  'http://localhost:3000/v1' :
  'http://www.xquery.cn:3030/v1';

util.ajax_url = ajaxUrl;

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
});

export default util;
