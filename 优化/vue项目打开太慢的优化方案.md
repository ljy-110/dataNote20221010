`vue`项目打开太慢的优化方案(网上)

1、使用CDN引入`js`和`css`来减少，比如`vue,vuex,elementui,vue-router`等等

第一步引入

```
<!-- 引入Vue.js -->
<script src="https://cdn.staticfile.org/vue/2.4.3/vue.min.js"></script>
<!-- 引入vuex.js -->
<script src="https://cdn.staticfile.org/vuex/3.0.0/vuex.min.js"></script>
<!-- 引入vue-router -->
<script src="https://cdn.staticfile.org/vue-router/3.0.0/vue-router.min.js"></script>

```

第二步，在` bulid/webpack.base.conf.js `文件中，增加 externals，将引用的外部模块导入，如下：

```
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  externals: {
    'vue' :'Vue',
    'element-ui':'ELEMENT',
    'vue-router' :'VueRouter'
    'vuex': 'Vuex'
    'echarts': 'echarts'
}
}
```

第三步，将所有的引用去掉：

```
// import Vue from "vue";
// 引入element 组件
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// import VueRouter from "vue-router";
// import Vuex from "vuex";

// Vue.use(ElementUI);
// Vue.use(VueRouter);
// Vue.use(Vuex);

```

2、**使用 vue-router 懒加载解决首次加载时资源过多导致的速度缓慢问题**

当你的 SPA（单页应用程序）变得很复杂时，打包构建后的 js 包会变得非常大，以至于严重影响页面的加载时间。vue-router 支持 webpack 内置的异步模块加载系统。所以，那些使用较少的路由组件不必打包进 bundles 里，只要在路由被访问时按需加载。
***懒加载路由写法：***

```
{
	path: "/base/user",
	name: "user",
	component: resolve => require.ensure([], () => resolve(require('@/modules/base/user/User')), 'User'),
	meta: {
		breadcrumb: ["基本信息", "用户管理"]
	}
},
{
	path: "/base/role",
	name: "role",
	component: resolve => require.ensure([], () => resolve(require('@/modules/base/role/Role')), 'Role'),
	meta: {
		breadcrumb: ["基本信息", "角色管理"]
	}
}

```

