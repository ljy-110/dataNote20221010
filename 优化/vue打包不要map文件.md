vue打包之后不要map文件

在`config/index.js`里面找打到

```
productionSourceMap: true,
//改成false
productionSourceMap: false,
```

