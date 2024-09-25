jdk来获取安卓的安全码SHA1

下载jdk，进入官网：https://www.oracle.com/

![image-20240820104132131](img/image-20240820104132131.png)

下载自己想要的jdk文件，安装

![image-20240820104221073](img/image-20240820104221073.png)

打开安装的jdk的位置，进入bin文件，然后地址栏输入cmd进入

![image-20240820104340114](img/image-20240820104340114.png)

打开cmd之后，输入以下命令，一般密钥口令就是`android`

```js
keytool -genkey -v -keystore debug.keystore -alias androiddebugkey -keyalg RSA -validity 10000
```

![image-20240820104425188](img/image-20240820104425188.png)

输入口令之后，就是一直回车，在最后那个的输入`y`就好了`CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown是否正确?`

![image-20240820122625832](img/image-20240820122625832.png)

然后再次输入命令`keytool -list -v -keystore debug.keystore`，输入上面的口令密钥`android`，就可以拿到SHA1了

![image-20240820122817816](img/image-20240820122817816.png)