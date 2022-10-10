# git上传文件到github的操作流程

## 下载git之后，新建空白文件，右键找到git bash打开

如果电脑第一次安装，输入命令

```
git config --global user.name "github上面的名称"
```

```
git config --global user.email "github注册的邮箱"
```

```
ssh-keygen -t rsa -C "上面你的邮箱"
```

然后一路回车，就可以看到下面提示的路径。然后打开id_rsa.pub文件，就可以找到密钥了。在进行下面的才做进行，上传文件

```
git init
```

```
git remote add origin git@github.com:ljy-110/chat.git    (仓库名)
```

```
git add .
```

```
git commit -m '解析说明'
```

```
git pull --rebase origin master  
```

```
git push origin master
```

<<<<<<< HEAD
=======


>>>>>>> 8939307 (2022年10月10日2)
