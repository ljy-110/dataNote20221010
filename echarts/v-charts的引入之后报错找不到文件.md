### v-charts的使用，引入文件运行后报错`echarts/lib/visual/dataColor in ./node_modules/echarts-liquidfill/src/liquidFill.js`

在使用v-charts插件的时候，安装引入之后发现报错了

```
npm i v-charts echarts -S
```

```js
// main.js
import Vue from 'vue'
import VCharts from 'v-charts'
import App from './App.vue'

Vue.use(VCharts)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

![image-20210311172454974](E:\ljy\资料\img\typora-user-images\image-20210311172454974.png)

重新安装`npm install --save echarts/lib/visual/dataColor`失败

![image-20210311172529066](E:\ljy\资料\img\typora-user-images\image-20210311172529066.png)

然后重新安装下其他的版本`npm i v-charts echarts@4.9.0 -S`

```
npm i v-charts echarts@4.9.0 -S
```

![image-20210311172653018](E:\ljy\资料\img\typora-user-images\image-20210311172653018.png)

然后就没有报错了