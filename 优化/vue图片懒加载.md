vue做图片的懒加载

首先安装

```js
npm install vue-lazyload
```

然后再main.js文件引入

```js
import lazyload from "vue-lazyload"

Vue.use(
  lazyload,{ 
  loading:'../static/layui/images/loading.png',//加载中图片，自定义
  error:'../static/layui/images/loadError.png'//加载失败，自定义}
)
```

本地图片显示懒加载

```html
<img v-for="item in 30" :key="item" v-lazy="require('../assets/images/solution/light/'+item+'.jpg')" width="100%" height="auto">
```



