forEach使用trycatch中断循环.md

```js
let list = [
          {id:1,value:'1'},
          {id:2,value:'2'},
          {id:3,value:'3'},
        ]
        try{
          list.forEach((item)=>{
              if(item.value=='1'){
                // alert('item==1成功')
                  console.log('item==1成功')
                  // 条件成功，抛出错误
                  throw new Error('条件成功，抛出错误')
              }
              console.log(item);
          })
        }catch(e){
          console.log('foreach-err',e.message)
        }
```

![image-20221010093716501](D:\LJY\code\dataNote20221010\img\image-20221010093716501.png)