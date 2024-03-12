配置axios

```js
import axios from 'axios';

import { ElMessage } from 'element-plus';
const http = axios.create({
  baseURL: import.meta.env.VITE_APP_WEB_URL,
  timeout: 30000 // 请求超时时间
});

// 请求
http.interceptors.request.use(config => {
  config.url = import.meta.env.VITE_APP_WEB_URL + import.meta.env.VITE_APP_BASE_API + config.url;
  return config;
});

// 响应
http.interceptors.response.use(
  response => {
    const data = response.data;
    if (data.code === 0) {
      return Promise.resolve(response);
    } else {
      console.log(data);
      ElMessage.error(data.msg || data.message);
      // let err = {};
      // switch (data.code) {
      //   case 400:
      //     err.info = '请求无效';
      //     break;

      //   case 401:
      //     err.info = '由于长时间未操作，登录已超时，请重新登录';
      //     break;

      //   case 403:
      //     err.info = '拒绝访问';
      //     break;

      //   case 404:
      //     err.info = '请求地址出错';
      //     break;

      //   case 405:
      //     err.info = '未授权';
      //     break;

      //   case 408:
      //     err.info = '请求超时';
      //     break;

      //   case 500:
      //     err.info = '服务器内部错误';
      //     break;

      //   case 501:
      //     err.info = '服务未实现';
      //     break;

      //   case 502:
      //     err.info = '网关错误';
      //     break;

      //   case 503:
      //     err.info = '服务不可用';
      //     break;

      //   case 504:
      //     err.info = '网关超时';
      //     break;

      //   case 505:
      //     err.info = 'HTTP版本不受支持';
      //     break;

      //   default:
      //     err.info = '网络波动，请重试';
      // }
      // let messInfo = data.message ? err.info + ' ' + data.message : err.info;
      // return Promise.reject(new Error(messInfo || 'Error'));
    }
  },
  err => {
    console.log('响应错误：' + err);
    return Promise.reject(err); // 请求错误时，直接结束
  }
);

export default http;
```

