axios的请求拦截器和动态加载loading，两个结合

```js
import axios from 'axios'
// axios.defaults.baseURL = '/api'
import browser from '../common/browser'
import qs from 'qs';

import { Loading } from 'element-ui'
let loading = null //定义loading变量
//开始 加载loading
let startLoading=()=>{
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
//结束 取消loading加载
let endLoading=()=>{
  loading.close()
}
 
//showFullScreenLoading() 与 tryHideFullScreenLoading() 目的是合并同一页面多个请求触发loading
 
let needLoadingRequestCount = 0 //声明一个变量
 
let showFullScreenLoading=()=> {
    if (needLoadingRequestCount === 0) { //当等于0时证明第一次请求 这时开启loading
        startLoading()
    }
    needLoadingRequestCount++ //全局变量值++ 
}
 
let tryHideFullScreenLoading=()=> {
    if (needLoadingRequestCount <= 0) return //小于等于0 证明没有开启loading 此时return
    needLoadingRequestCount-- //正常响应后 全局变量 --
    if (needLoadingRequestCount === 0) {  //等于0 时证明全部加载完毕 此时结束loading 加载
        endLoading()
    }
}

// 创建 axios 实例
let http = axios.create({
    // headers: {'Content-Type': 'application/json'},
    timeout: 60000
})
// 设置 post、put 默认 Content-Type
http.defaults.headers.post['Content-Type'] = 'application/json'
http.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
http.interceptors.request.use(config => {
    console.log(config)
    showFullScreenLoading()//------------------------------------------------
    if (config.method === 'post' || config.method === 'put') {
        // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
        config.data = qs.stringify(config.data)
    } else if (config.method === 'get' && browser.isIE) {
        // 给GET 请求后追加时间戳， 解决IE GET 请求缓存问题
        let symbol = config.url.indexOf('?') >= 0 ? '&' : '?'
        config.url += symbol + '_=' + Date.now()
    }
    // 请求发送前进行处理
    return config
}, error => {
    endLoading()//-----------------------------------------------------
    // 请求错误处理
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(response => {
    let {data} = response
    tryHideFullScreenLoading()//-------------------------------------------
    return data
}, error => {
    let info = {}
    alert('请求超时，请稍后再试...')
    console.log(JSON.stringify(error))
    let {status, statusText, data} = error.response
    if (!error.response) {
        info = {
            code: 5000,
            msg: 'Network Error'
        }
    } else {
        // 此处整理错误信息格式
        info = {
            code: status,
            data: data,
            msg: statusText
        }
    }
    endLoading()//---------------------------------------------------------
    return Promise.reject(info)
})

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function () {
    return http
}
```

