## vuejs导入本地json文件来进行测试

先把json文件放在文件的根目录下

<<<<<<< HEAD
![image-20200922104751670](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200922104751670.png)
=======
![image-20200922104751670](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20200922104751670.png)
>>>>>>> 8939307 (2022年10月10日2)

然后在需要用到测试数据的页面引入,然后获取数据

```js
import phone from '../../../phone.json'
```

```js
mounted(){
    this.goodsList = phone
    console.log(this.goodsList);
  },
```

