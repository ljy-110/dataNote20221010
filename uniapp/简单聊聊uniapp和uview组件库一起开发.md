简单的聊聊uniapp和uview组件库的开发

uniapp是一个基于Vue.js的跨平台开发框架，可以同时开发H5、微信小程序、App等多个平台的应用。这样可以减少开发人员的工作量，提高开发效率。

官网：https://uniapp.dcloud.net.cn/

uView是uni-app生态专用的UI框架，uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码， 可发布到iOS、Android、H5、以及各种小程序(微信/支付宝/百度/头条/QQ/钉钉)等多个平台(引言自uni-app网)。

官网：https://v1.uviewui.com/components/intro.html

工具：Hbuilder X

一、安装uView组件库

使用下载的方式安装，能更方便阅读源码，但是每次升级都需要重新下载并覆盖`uview-ui`文件夹。

​	在uni-app插件市场右上角选择`使用HBuilder X 导入插件`或者`下载插件ZIP`

​	如果您的项目是由HBuilder X创建的标准uni-app项目，将下载后的`uview-ui`文件夹，复制到项目根目录。

​	插件地址：https://ext.dcloud.net.cn/plugin?id=6682

![image-20230823140441285](D:\LJY\code\dataNote20221010\img\image-20230823140441285.png)

然后就是按照官网进行样式的引入和组件的引入；

可以使用uview自带的http请求

![image-20230823140647951](D:\LJY\code\dataNote20221010\img\image-20230823140647951.png)

二、Hbuilder X运行项目的时候，使用外部浏览器打开会出现跨域的问题。

在uniapp的目录里面找到`manifest.json`文件，找到源码视图，添加以下的代码

```js
"h5" : {
        "devServer" : {
            "disableHostCheck" : true,
			"proxy":{
				"/api":{
					"target":"http://127.0.0.1:8080",
					"ws": true,
					"changeOrigin": true,
					"secure": false,
					"pathRewrite": {
						"^/api": ""
					}

				}
			}
        }
    },
```

然后修改baseurl的配置

```js
process.env.NODE_ENV === 'development' ? '/api' : 'http://127.0.0.1:8080'
```

但是因为我使用了uview的组件库自带的http请求方式，在拦截配置里面修改，但是后面发现这个问题，会出现一个问题就是会导致Cookie不一样，从而导致接口报错会话过期！！！！！！！！！！！！

最后迫于无奈，只能使用内置的浏览器进行开发。

三、Set-Cookie的微信小程序不能自动带上的问题

在登陆成功之后，把Set-Cookie存在本地，然后请求的时候放到请求头部里面

uniapp有个判断方法来判断当前系统进行操作的，`// #ifdef`

```
// #ifdef MP-WEIXIN
	let sessionidStr = that.getSessionId(res.header['Set-Cookie'])
	let sessionid = "JSESSIONID=" + sessionidStr
	wx.setStorageSync('sessionid', sessionid); //保存Cookie到Storage
// #endif
```

上面的代码就是在登陆的成功之后，如果当前是属于微信小程序的话，就进行的操作。把Set-Cookie存到本地

然后在请求的拦截器里面添加到头部信息里面

```js
Vue.prototype.$u.http.interceptor.request = (config) => {
		// #ifdef MP-WEIXIN
			config.header.cookie =  wx.getStorageSync("sessionid");
		// #endif
	config.url = '/api' + config.url;
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}
```

四、css样式和本地图片失效

在运行到微信小程序上面的之后，会发现有不少的自己写的样式会失效的。建议就是使用组件库里面的自带的一些`margin和padding`的样式。

图片使用，最好是使用绝对路径，这样微信小程序就不会报错了

微信小程序图片报错

```JS
[渲染层网络层错误] Failed to load local image resource /uni_modules/uview-ui/static/image/videoCover.png 
 the server responded with a status of 500 (HTTP/1.1 500 Internal Server Error) 
(env: Windows,mp,1.06.2307250; lib: 2.33.0)
```

```js
<u-image width="100%" height="230rpx" src="/static/image/videoCover.png"></u-image>
```



五、视频播放问题

我们使用了萤石云的播放，在萤石云的官网上面有关于uniapp和微信小程序进行开发的demo，我们可以按照demo的来进行开发。

但是引入的萤石云的js，比较大，相对于微信小程序的不能太大的包来说，有点难受，而且播放也是有些许问题的，所以使用微信小程序的最好方法就是使用引入微信小程序的半屏模式来播放视频，但是需要进行申请，具体操作可以看看官网

![image-20230823143336215](D:\LJY\code\dataNote20221010\img\image-20230823143336215.png)

官网地址：https://open.ys7.com/help/529

![image-20230823142818317](D:\LJY\code\dataNote20221010\img\image-20230823142818317.png)

微信小程序播放：https://open.ys7.com/help/502

![image-20230823142803785](D:\LJY\code\dataNote20221010\img\image-20230823142803785.png)

