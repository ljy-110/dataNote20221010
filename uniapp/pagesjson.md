pages.json

| 属性                         | 类型     | 默认值   | 描述                                                         | 平台差异说明                                                 |
| :--------------------------- | :------- | :------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| navigationBarBackgroundColor | HexColor | #F8F8F8  | 导航栏背景颜色（同状态栏背景色）                             | APP与H5为#F8F8F8，小程序平台请参考相应小程序文档             |
| navigationBarTextStyle       | String   | black    | 导航栏标题颜色及状态栏前景颜色，仅支持 black/white           | 支付宝小程序不支持，请使用 [my.setNavigationBar](https://opendocs.alipay.com/mini/api/xwq8e6) |
| navigationBarTitleText       | String   |          | 导航栏标题文字内容                                           |                                                              |
| navigationStyle              | String   | default  | 导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏，需看[使用注意](https://uniapp.dcloud.net.cn/collocation/pages#customnav) | 微信小程序 7.0+、百度小程序、H5、App（2.0.3+）               |
| backgroundColor              | HexColor | #ffffff  | 下拉显示出来的窗口的背景色                                   | 微信小程序                                                   |
| backgroundTextStyle          | String   | dark     | 下拉 loading 的样式，仅支持 dark / light                     | 微信小程序                                                   |
| enablePullDownRefresh        | Boolean  | false    | 是否开启下拉刷新，详见[页面生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle)。 |                                                              |
| onReachBottomDistance        | Number   | 50       | 页面上拉触底事件触发时距页面底部距离，单位只支持px，详见[页面生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle) |                                                              |
| backgroundColorTop           | HexColor | #ffffff  | 顶部窗口的背景色（bounce回弹区域）                           | 仅 iOS 平台                                                  |
| backgroundColorBottom        | HexColor | #ffffff  | 底部窗口的背景色（bounce回弹区域）                           | 仅 iOS 平台                                                  |
| titleImage                   | String   |          | 导航栏图片地址（替换当前文字标题），支付宝小程序内必须使用https的图片链接地址 | 支付宝小程序、H5、APP                                        |
| transparentTitle             | String   | none     | 导航栏整体（前景、背景）透明设置。支持 always 一直透明 / auto 滑动自适应 / none 不透明 | 支付宝小程序、H5、APP                                        |
| titlePenetrate               | String   | NO       | 导航栏点击穿透                                               | 支付宝小程序、H5                                             |
| pageOrientation              | String   | portrait | 横屏配置，屏幕旋转设置，仅支持 auto / portrait / landscape 详见 [响应显示区域变化](https://developers.weixin.qq.com/miniprogram/dev/framework/view/resizable.html) | App 2.4.7+、微信小程序、QQ小程序                             |
| animationType                | String   | pop-in   | 窗口显示的动画效果，详见：[窗口动画](https://uniapp.dcloud.net.cn/api/router#animation) | App                                                          |
| animationDuration            | Number   | 300      | 窗口显示动画的持续时间，单位为 ms                            | App                                                          |
| app-plus                     | Object   |          | 设置编译到 App 平台的特定样式，配置项参考下方 [app-plus](https://uniapp.dcloud.net.cn/collocation/pages#app-plus) | App                                                          |
| h5                           | Object   |          | 设置编译到 H5 平台的特定样式，配置项参考下方 [H5](https://uniapp.dcloud.net.cn/collocation/pages#h5) | H5                                                           |
| mp-alipay                    | Object   |          | 设置编译到 mp-alipay 平台的特定样式，配置项参考下方 [MP-ALIPAY](https://uniapp.dcloud.net.cn/collocation/pages#mp-alipay) | 支付宝小程序                                                 |
| mp-weixin                    | Object   |          | 设置编译到 mp-weixin 平台的特定样式，配置项参考下方 [MP-WEIXIN](https://uniapp.dcloud.net.cn/collocation/pages#mp-weixin) | 微信小程序                                                   |
| mp-baidu                     | Object   |          | 设置编译到 mp-baidu 平台的特定样式，配置项参考下方 [MP-BAIDU](https://uniapp.dcloud.net.cn/collocation/pages#mp-baidu) | 百度小程序                                                   |
| mp-toutiao                   | Object   |          | 设置编译到 mp-toutiao 平台的特定样式                         | 抖音小程序                                                   |
| mp-lark                      | Object   |          | 设置编译到 mp-lark 平台的特定样式                            | 飞书小程序                                                   |
| mp-qq                        | Object   |          | 设置编译到 mp-qq 平台的特定样式                              | QQ小程序                                                     |
| mp-kuaishou                  | Object   |          | 设置编译到 mp-kuaishou 平台的特定样式                        | 快手小程序                                                   |
| mp-jd                        | Object   |          | 设置编译到 mp-jd 平台的特定样式                              | 京东小程序                                                   |
| usingComponents              | Object   |          | 引用小程序组件，参考 [小程序组件](https://uniapp.dcloud.net.cn/tutorial/miniprogram-subject.html#小程序自定义组件支持) |                                                              |
| renderingMode                | String   |          | 同层渲染，webrtc(实时音视频) 无法正常时尝试配置 seperated 强制关掉同层 | 微信小程序                                                   |
| leftWindow                   | Boolean  | true     | 当存在 leftWindow 时，默认是否显示 leftWindow                | H5                                                           |
| topWindow                    | Boolean  | true     | 当存在 topWindow 时，默认是否显示 topWindow                  | H5                                                           |
| rightWindow                  | Boolean  | true     | 当存在 rightWindow 时，默认是否显示 rightWindow              | H5                                                           |
| rpxCalcMaxDeviceWidth        | Number   | 960      | rpx 计算所支持的最大设备宽度，单位 px                        | App（vue2 且不含 nvue）、H5（2.8.12+）                       |
| rpxCalcBaseDeviceWidth       | Number   | 375      | rpx 计算使用的基准设备宽度，设备实际宽度超出 rpx 计算所支持的最大设备宽度时将按基准宽度计算，单位 px | App（vue2 且不含 nvue）、H5（2.8.12+）                       |
| rpxCalcIncludeWidth          | Number   | 750      | rpx 计算特殊处理的值，始终按实际的设备宽度计算，单位 rpx     | App（vue2 且不含 nvue）、H5（2.8.12+）                       |
| dynamicRpx                   | Boolean  | false    | 动态 rpx，屏幕大小变化会重新渲染 rpx                         | App-nvue（vue3 固定值为 true） 3.2.13+                       |
| maxWidth                     | Number   |          | 单位px，当浏览器可见区域宽度大于maxWidth时，两侧留白，当小于等于maxWidth时，页面铺满；不同页面支持配置不同的maxWidth；maxWidth = leftWindow(可选)+page(页面主体)+rightWindow(可选) | H5（2.9.9+）                                                 |