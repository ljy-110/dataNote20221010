低版本node升级到高版本，vscode运行vue项目内存溢出

解决方案如下：
在终端执行:
**$ npm install -g increase-memory-limit**
进入当前项目下，执行命令行：
**$ increase-memory-limit**
执行启动项目的命令
**$ npm run dev**

![](D:\LJY\code\dataNote20221010\img\内存溢出报错图片.png)

安装上面的情况之后，提示`'"node --max-old-space-size=10240"' 不是内部或外部命令，也不是可运行的程序`，然后就把下面这个位置的地方双引号去掉

![image-20230803094309981](D:\LJY\code\dataNote20221010\img\image-20230803094309981.png)

![image-20230803094156435](D:\LJY\code\dataNote20221010\img\image-20230803094156435.png)