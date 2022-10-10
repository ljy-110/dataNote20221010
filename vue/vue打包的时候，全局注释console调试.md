在开发的时候，我们会用到很多console的调试，在开发完成的时候，又不想一个个去注释，所以在打包的时候可以在build文件夹中找到webpack.prod.conf.js文件中添加以下代码

```js
 new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          //过滤console.log-start
          drop_console: true,
          pure_funcs: ['console.log']
          //过滤console.log-end
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
```

