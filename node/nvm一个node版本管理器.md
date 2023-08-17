使用nvm来进行切换不同的node版本

我们在开发的时候有会很多的新老项目，有些老项目会要求使用低版本的node，但是新项目又会要求高版本的node，这个时候就是很纠结了。因为低版本的项目你用高版本的node进行启动会有启动失败或者代码保存的时候就会导致内存溢出（这个问题可以参考其他的文章解决，但是我发现我找到的办法都没有办法解决）。所以就是使用了nvm来进行版本的管理器

先看看官网文档：https://nvm.uihtm.com/

这个可以进行下载和安装教程，

网盘地址：https://pan.baidu.com/s/12E7d46XLVxGOmTDevVB58g?pwd=ntfm

![image-20230817091420701](E:\ljy\资料\img\image-20230817091420701.png)

1、安装之前先卸载电脑原来的node版本，然后使用安装包进行安装

安装流程可以看看官网，就是安装位置等等

![image-20230817091846289](E:\ljy\资料\img\image-20230817091846289.png)

这样是安装成功

2、切换源，设置镜像，我们一般使用淘宝。最好现在切换源，再去安装其他的东西，这样快一点

你可以使用命令行添加，也可以直接在nvm的安装目录下面直接添加（nvm目录下的settings.txt文件）

```js
//直接文件添加
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/

//命令行
nvm npm_mirror https://npmmirror.com/mirrors/npm/
nvm node_mirror https://npmmirror.com/mirrors/node/
```

![image-20230817092344942](E:\ljy\资料\img\image-20230817092344942.png)

3、安装不同版本的node

```js
nvm install 版本号
```

4、切换不用的node使用

```js
//先查看安装的node列表
nvm ls

//切换16.14.2
nvm use 16.14.2
```

![image-20230817094215365](E:\ljy\资料\img\image-20230817094215365.png)



好了上面完了，但是你正兴奋要去操作的时候你发现一箩筐的问题要去解决！！！
坑：
1、高低版本切换的时候，npm提示过高过低，无法使用
网上的说法是去自己下载对应node的npm，然后把包给放在nvm下面的node文件里面进行替换，我试过了，但是好像不行最后怎么解决的，忘记了！！！！！！！！

2、会提醒vue -v 不是内部命令，npm -v不是内部命令



### nvm命令提示

- `nvm arch`：显示node是运行在32位还是64位。
- `nvm install <version> [arch]` ：安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务器的SSL。
- `nvm list [available]` ：显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。
- `nvm on` ：开启node.js版本管理。
- `nvm off` ：关闭node.js版本管理。
- `nvm proxy [url]` ：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。
- `nvm node_mirror [url]` ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
- `nvm npm_mirror [url]` ：设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
- `nvm uninstall <version>` ：卸载指定版本node。
- `nvm use [version] [arch]` ：使用制定版本node。可指定32/64位。
- `nvm root [path]` ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。
- `nvm version` ：显示nvm版本。version可简化为v。