vue项目适配pc端的各种屏幕分辨率

在pc项目开发的时候，要适用PC端的各种屏幕分辨率

1.先安装插件

```
npm install px2rem-loader
npm install lib-flexible
```

2.在build文件下的utils.js文件下，添加

```js
//1
const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 192
      //一个rem==192px
    }
  }
//2
 const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader,px2remLoader]
```

如下

```js
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }
  const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 192
      //一个rem==192px
    }
  }
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader,px2remLoader]//加上px2remLoader

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
```

3.在main.js中引入lib-flexible

```js
import 'lib-flexible'
```

4.找到node_modules下的lib-flexible的lib-flexible.js，修改

```js
 把54改成width
 function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 54 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }
    改成
     function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = width * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }
```

5.安装了这个的插件之后，有可能会导致之前的一些css样式发现变化。ui页面直接变形，所以要注意