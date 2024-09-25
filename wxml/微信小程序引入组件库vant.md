微信小程序引入组件库vant

微信开发者工具最新版本

![image-20230726085319565](D:\LJY\code\dataNote20221010\img\image-20230726085319565.png)



我们在引入vant的时候，官网有教程，就按照教程走，地址：https://vant-contrib.gitee.io/vant-weapp/#/quickstart

通过npm安装的时候，就需要进行构建npm，所以在开发者工具中进行，构建

但是你会发现构建的时候报错了，

```js
message： 没有找到可以构建的 NPM 包，请确认需要参与构建的 npm 都在 `miniprogramRoot` 目录内，或配置 project.config.json 的 packNpmManually 和 packNpmRelationList 进行构建
appid: wx960dc66c16a90406
openid: o6zAJs_ePhlLdifCxMK3-WRAjamQ
ideVersion: 1.06.2307250
osType: win32-x64
time: 2023-07-26 08:56:18
```

![image-20230726085616456](D:\LJY\code\dataNote20221010\img\image-20230726085616456.png)

这个错误提示就是我们缺少了配置，所以要先进行初始化`npm init -y`。在目录的空白处右键-->选择在外部终端窗口打开，输入命令，然后就发现文件目录多了一个文件`package.json`

![image-20230726090322312](D:\LJY\code\dataNote20221010\img\image-20230726090322312.png)

![image-20230726090100936](D:\LJY\code\dataNote20221010\img\image-20230726090100936.png)

然后这个时候再去构建npm，发现还是报上面的错误，大概率是没有安装组件库，所以我们先在终端进行安装vant，`npm i @vant/weapp -S --production`

![image-20230726090616560](D:\LJY\code\dataNote20221010\img\image-20230726090616560.png)

再去构建npm，就可以发现成功了

![image-20230726090646976](D:\LJY\code\dataNote20221010\img\image-20230726090646976.png)

然后下面就是按照vant的小程序版进行配置

1、将`app.json`的 `"style": "v2"` 去除

2、`project.config.json`，修改配置

```js
"setting": {
    ...
    "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./miniprogram/"
      }
    ]
  }
```

然后你会发现，会报错找不到，文件路径。所以要改成下面这个

```js
 "miniprogramNpmDistDir": "./"
```

![image-20230726091203043](D:\LJY\code\dataNote20221010\img\image-20230726091203043.png)

在`app.json`，引入需要使用的组件

```js
"usingComponents": {
  "van-button": "@vant/weapp/button/index"
}
```

![image-20230726091349104](D:\LJY\code\dataNote20221010\img\image-20230726091349104.png)

