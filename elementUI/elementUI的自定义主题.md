### elementUI的自定义主题的设置

elementUI它提供了默认的主题，但是也提供了几种自定义的主题来方便开发者对组件进行不同程度的自定义。

下面是我使用的其中一种，使用的是仅替换主题色的一种方法。

#### 一、安装elementUI以及sass-loader,node-sass(项目中使用scss编写需要依赖的插件)

```js
npm i element-ui -S
npm i sass-loader -D
npm i sass-loader -D
```

有时候安装sass的时候会安装失败，可以直接安装固定的版本号。直接复制到到`package.json`文件，然后`npm install`

```js
"sass-loader": "^7.0.0",
"node-sass": "^4.12.0",
```

#### 二、在项目中改变 SCSS 变量

Element 的 theme-chalk 使用 SCSS 编写，如果你的项目也使用了 SCSS，那么可以直接在项目中改变 Element 的样式变量。新建一个样式文件，例如 `element-variables.scss`，写入以下内容：

```js
/* 改变主题色变量 */
$--color-primary: #32AE6E;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '../node_modules/element-ui/lib/theme-chalk/fonts';

@import "../node_modules/element-ui/packages/theme-chalk/src/index";
```

![image-20211116171033812](E:\ljy\资料\img\image-20211116171033812.png)

#### 三、在项目的入口文件中，直接引入以上样式文件即可（无需引入 Element 编译好的 CSS 文件）：

```js
import Vue from 'vue'
import Element from 'element-ui'
import './element-variables.scss'

Vue.use(Element)
```

![image-20211116171049411](E:\ljy\资料\img\image-20211116171049411.png)

这样基本就可以做到自定义主题修改颜色了

我们再来了解下elementui的其他更换主题的方法。

命令行主题工具

这个是要先安装主题构建工具`npm i element-theme -g`，然后再去初始化变量文件。如果使用默认配置，执行后当前目录会有一个 `element-variables.scss` 文件。然后通过这个文件去修改各种组件间的一些颜色修改，可以直接编辑这个文件进行颜色的修改，下面是主要的内容结构

```js
$--color-primary: #409EFF !default;
$--color-primary-light-1: mix($--color-white, $--color-primary, 10%) !default; /* 53a8ff */
$--color-primary-light-2: mix($--color-white, $--color-primary, 20%) !default; /* 66b1ff */
$--color-primary-light-3: mix($--color-white, $--color-primary, 30%) !default; /* 79bbff */
$--color-primary-light-4: mix($--color-white, $--color-primary, 40%) !default; /* 8cc5ff */
$--color-primary-light-5: mix($--color-white, $--color-primary, 50%) !default; /* a0cfff */
$--color-primary-light-6: mix($--color-white, $--color-primary, 60%) !default; /* b3d8ff */
$--color-primary-light-7: mix($--color-white, $--color-primary, 70%) !default; /* c6e2ff */
$--color-primary-light-8: mix($--color-white, $--color-primary, 80%) !default; /* d9ecff */
$--color-primary-light-9: mix($--color-white, $--color-primary, 90%) !default; /* ecf5ff */

$--color-success: #67c23a !default;
$--color-warning: #e6a23c !default;
$--color-danger: #f56c6c !default;
$--color-info: #909399 !default;
```

也可以使用自定义主题，自定义主题使用了在线主题编辑工具或者命令行工具进行生成自己想要的主题css文件，然后再项目种进行引入

![image-20211116172702918](E:\ljy\资料\img\image-20211116172702918.png)

