端口被占用

![image-20211018093548495](D:\LJY\code\dataNote20221010\img\image-20211018093548495.png)

如上，就是端口被占用了

```js
//先查询端口使用
netstat -ano|findstr 8001
//找到对应的端口进程
tasklist|findstr “8001”
//结束进程
taskkill /pid (LISTENING 后面的那个数值) /f
```

如图

![image-20211018094250445](D:\LJY\code\dataNote20221010\img\image-20211018094250445.png)

