打不开一些`uu.github.io`等等之类的一些网站的解决办法

有时候我们想访问一些网站的时候会发现提醒我们网站打不开的

<<<<<<< HEAD
![image-20201212092056549](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201212092056549.png)
=======
![image-20201212092056549](E:\ljy\资料\img\typora-user-images\image-20201212092056549.png)
>>>>>>> 8939307 (2022年10月10日2)

这个时候我们，要把这个域名网站复制到，打开 ------Dns检测|Dns查询 - 站长工具，

`http://tool.chinaz.com/dns?type=1&host=unbug.github.io&ip=`

<<<<<<< HEAD
![image-20201212092322358](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201212092322358.png)

然后把上面的响应Ip，复制，找到电脑 `C:\Windows\System32\drivers\etc `下`hosts`文件里保存

![image-20201212092659658](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201212092659658.png)

![image-20201212092723730](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201212092723730.png)
=======
![image-20201212092322358](E:\ljy\资料\img\typora-user-images\image-20201212092322358.png)

然后把上面的响应Ip，复制，找到电脑 `C:\Windows\System32\drivers\etc `下`hosts`文件里保存

![image-20201212092659658](E:\ljy\资料\img\typora-user-images\image-20201212092659658.png)

![image-20201212092723730](E:\ljy\资料\img\typora-user-images\image-20201212092723730.png)
>>>>>>> 8939307 (2022年10月10日2)

这样，就可以访问了



刷新DNS服务

```js
ipconfig /flushdns
```





![image-20230825111357940](E:\ljy\资料\img\image-20230825111357940.png)