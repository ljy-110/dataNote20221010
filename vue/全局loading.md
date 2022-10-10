全局loading

```js
//js文件，然后引用（网上的）
import { Loading } from 'element-ui'
// import {showLoading, hideLoading} from '@/common/loading.js'

let loading = null
const showLoading = (params) => {
    if(loading) {
        loading.close()
    }
    let options = {
        fullscreen: false,
        // target: document.querySelector('#mainLoad'),
        lock: true,
        text: '数据加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    }
    Object.assign(
        options,
        params
    )
    loading = Loading.service(options)
}
const hideLoading = () => {
    loading.close()
}
export {
    showLoading,
    hideLoading
}
```

```js
//全局加载（官网）
const loading = this.$loading({
        lock: true,
        text: '获取中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      
      loading.close();
```

可以跨页面清除loading

```js
//在main.js
export function openLoading() {
  const loading = this.$loading({ // 声明一个loading对象
    lock: true, // 是否锁屏
    text: '加载中', // 加载动画的文字
    spinner: 'el-icon-loading', // 引入的loading图标
    background: 'rgba(0, 0, 0, 0.7)' // 背景颜色
  })
  setTimeout(function() { // 设定定时器，超时2S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close() // 关闭遮罩层
  }, 2000)
  return loading
}
Vue.prototype.$openLoading = openLoading
```

```
//在使用的vue页面
data(){
	return {
		loading:[]
	}
}
//然后
created(){
	this.loading = this.$openLoading()
}
methods:{
	//方法中，或者请求数据成功后清除
	this.loading.close()
}

```

或者是根据路由变化来启动loading

```
watch: {//监听路由变化来启动
    '$route':'getLoading'
 }
 methods:{
	getLoading(){
      this.$openLoading()
    }
}
```

