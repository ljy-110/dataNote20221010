## vue-router的路由懒加载用法

```js
import Vue from 'vue'
import Router from 'vue-router'
import cxyz from '@/page/home/chaxunyanzheng'

Vue.use(Router)

//这两个可能需要加，也可以不加
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

// const originalPush = VueRouter.prototype.push
//    VueRouter.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/cxyz',
      name: 'cxyz',
      // component: cxyz
      component: ()=>import('@/page/home/chaxunyanzheng')//-----------这样写
    }
})
```

或者可以参考官网的写法

vue-router的官网懒加载写法地址

https://router.vuejs.org/zh/guide/advanced/lazy-loading.html

```js
//首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：
const Foo = () => Promise.resolve({ /* 组件定义对象 */ })

//第二，在 Webpack 2 中，我们可以使用动态 import语法来定义代码分块点 (split point)：
import('./Foo.vue') // 返回 Promise

//注意

//如果您使用的是 Babel，你将需要添加 syntax-dynamic-import 插件，才能使 Babel 可以正确地解析语法。

//结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件。

const Foo = () => import('./Foo.vue')

//在路由配置中什么都不需要改变，只需要像往常一样使用 Foo：

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})

```

用了懒加载打包之后报错，那就在`webpack.prod.conf.js`文件如下未知添加`publicPath:'./'`

```js
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    publicPath: './', //---------------------------------------------------------在这里添加
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
           //-----------------------------------------------------打包后清除控制台的console.log
          drop_console: true,
          pure_funcs: ['console.log']
           //过滤console.log-end
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
  ]
})
```

