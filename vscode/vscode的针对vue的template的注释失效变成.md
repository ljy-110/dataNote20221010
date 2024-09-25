`vscode`的针对`vue中template`的注释失效变成//

忘记那一天了，`vscode`提示安装一个插件，`Vue 3 Snippets Highlight Formatters And Generator`，我就顺手点了一下；然后就发现我的快捷键注释template的变成了下面这个样式。所以只要把这个插件给禁用了或者卸载就可以解决了这个问题。如果没有安装这个插件也有问题的话，可以尝试吧自己的插件一个个禁用然后再去测试，是不是自己的插件问题。

![image-20201203091827986](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20201203091827986.png)

我百度了网上的，其实还有一种办法就是找到`·settings.json·`中的·`'.vue'`·换成`html`的文件

![image-20201203092209806](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20201203092209806.png)

![image-20201203092232667](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20201203092232667.png)

但是这个办法会有很大的问题，很多语法都会失效，所以如果用这个办法，要考虑清楚。



告诫我们，不要乱来安装插件！哈哈哈哈