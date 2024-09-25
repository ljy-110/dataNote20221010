### 常用的UI组件库

对于现在前端的开发来说，UI组件库是必不可少的一个东西，因为这些成熟、可定制的组件库让我们可以更多的把精力花在对产品的构建上，而不是永无止境的重复造轮子。所以我们来聊一聊现在流行的UI组件库，比如PC端的、移动端、微信小程序的开发经常使用的UI组件库。

一、PC端常用的

1. `ElemetUI`

Element，一套为开发者、设计师和产品经理准备的基于 `Vue 2.0 `的桌面端组件库。这是饿了么开发的一套UI组件库，也是常用的一个UI组件库。这个组件库有比较完整的开发组件，像表格、表单、布局、提醒等等的组件；而且使用简单，直接引入就好。

但是有一点就是这个组件库有不少坑，而且到现在还没有解决的，所以就注意点喔！！！

官方文档：https://element.eleme.cn/#/zh-CN/component/installation

![image-20210607113824865](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20210607113824865.png)

![image-20210607114039228](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20210607114039228.png)

​	2、`BootstrapVue`

采用 **BootstrapVue** 构建响应式、移动优先、[ARIA项目（Accessible Rich Internet Application，可访问的富媒体应用，即无障碍友好应用)](https://www.z01.com/help/web/3522.shtml)，基于 **Vue.js** 和世界全球最受欢迎的 CSS 前端框架 — **Bootstrap v4**

把原先jQuery实现的Bootstrap组件再用Vue实现一遍，应该说这个库做的还不算很完整，但是样式的不足之处可以和Bootstrap无缝拼接，可是有些内部组件样式不太好调整，稍微丑了点，勉强过得去。组件少了写，拿来写后台还行写前台有些勉强。这个库最大的优点是通用性好，比如表格组件，几乎不用修改结构代码，只要修改fields数据，然后其他就可以原封不动的重复使用排序、检索、分页等功能，但是因为通用性高，所以代码的逻辑就会有些复杂。12网格布局，可以任意的嵌套到Bootstrap中，不会出现嵌套的冲突，这对于喜欢用Bootstrap来说就很方便了。

官方文档：https://code.z01.com/bootstrap-vue/

![image-20210607114532669](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20210607114532669.png)

二、移动端

1. `Vant`

Vant 是**有赞前端团队**开源的移动端组件库，于 2017 年开源，已持续维护 4 年时间。Vant 对内承载了有赞所有核心业务，对外服务十多万开发者，是业界主流的移动端组件库之一。

- 提供 60 多个高质量组件，覆盖移动端各类场景
- 性能极佳，组件平均体积不到 1kb（min+gzip）
- 单元测试覆盖率 90%+，提供稳定性保障
- 完善的中英文文档和示例
- 支持 Vue 2 & Vue 3
- 支持按需引入
- 支持主题定制
- 支持国际化
- 支持 TypeScript
- 支持 SSR

官方文档：https://youzan.github.io/vant/#/zh-CN/home

![image-20210607114759834](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20210607114759834.png)

   2、`Vux`

一个凑合的 Vue.js 移动端 UI 组件库

`VUX` 是`库`而非`框架`，虽然有专用的 `vux-loader`，但并不影响你自由地使用其他组件库或者工具库。

官方文档：https://doc.vux.li/zh-CN/about/before-using-vux.html

![image-20210607115548736](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20210607115548736.png)

三、微信小程序

1、`WeUI`

[WeUI](https://github.com/weui/weui) 是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。包含`button`、`cell`、`dialog`、 `progress`、 `toast`、`article`、`actionsheet`、`icon`等各式元素。

官方文档：https://developers.weixin.qq.com/miniprogram/dev/extended/weui/

![image-20210607115923719](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20210607115923719.png)

2、`Vant Weapp`

Vant 是**有赞前端团队**开源的移动端组件库，于 2016 年开源，已持续维护 4 年时间。Vant 对内承载了有赞所有核心业务，对外服务十多万开发者，是业界主流的移动端组件库之一。

官方文档：https://youzan.github.io/vant-weapp/#/home

![image-20210607120046459](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20210607120046459.png)

3、`iview-weapp`

官方文档：https://weapp.iviewui.com/docs/guide/start

![image-20210607124601259](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20210607124601259.png)