在uniapp和组件uview解决Hbuilder的跨域问题

在uniapp开发的时候，使用外部的浏览器进行开发的时候就会出现跨域的问题，就很无语！

在uniapp的目录里面找到`manifest.json`文件，找到源码视图，添加以下的代码

![image-20230823095620445](E:\ljy\资料\img\image-20230823095620445.png)

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
    "web" : {
        "devServer" : {
            "disableHostCheck" : true,
            "proxy" : {
                "/api" : {
                    "target" : "http://127.0.0.1:8080",
                    "changeOrigin" : true,
                    "secure" : false,
                    "pathRewrite" : {
                        "^/api" : ""
                    }
                }
            }
        }
    }
```

然后就是，在处理接口的时候要注意了，因为我使用的是uview组件库自带的那个请求方式，所以在请求的拦截器那个添加这个，或者说在你们项目的地址配置那里进行配置

![image-20230823095825737](E:\ljy\资料\img\image-20230823095825737.png)

```js
process.env.NODE_ENV === 'development' ? '/api' : 'http://127.0.0.1:8080'
```





但是后面发现这个问题，会出现一个问题就是会导致Cookie不一样，从而导致接口报错会话过期！！！！！！！！！！！！