vue百度地图的api的setDefaultCursor的改变鼠标样式的可以有哪些

在百度地图 API 中，`BMap.Map.setDefaultCursor(cursor)` 方法可以设置地图的默认鼠标样式。其中，`cursor` 参数支持以下多种类型：

- 'auto'：表示浏览器自动选择光标，默认值。
- 'pointer'：通常用于指向链接或按钮。
- 'crosshair'：十字线，通常用于目标拾取。
- 'move'：移动箭头。
- 'text'：文本光标。
- 'wait'：等待光标（一个小时形状的时钟）。
- 'help'：帮助光标（一个问号或气球）
- 'not-allowed'：禁止操作的光标

除此之外，还可以使用一些自定义的光标，例如：

- 'URL("http://xxx.com/your-cursor.cur")'：通过 URL 在网络上定义的自定义光标文件路径，注意需要有跨域设置。

例如，如果要在百度地图中将鼠标样式修改为十字线，请在 Vue 组件的 `mounted` 生命周期钩子函数中调用 `map.setDefaultCursor('crosshair')` 即可实现。