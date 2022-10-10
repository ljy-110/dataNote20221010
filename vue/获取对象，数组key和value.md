获取对象的key和value

```js
let rowXlsx = JSON.parse(row[j].data)//对象
Object.keys(rowXlsx);//数组
Object.values(rowXlsx)//数组
console.log(rowXlsx);
console.log(Object.keys(rowXlsx));//数组
console.log(Object.values(rowXlsx));//数组
```

获取一个数组对象的key和value

```js
let rowXlsx = []
rowXlsx.push(JSON.parse(row[j].data))
let keys = []
let value = []
rowXlsx.forEach((v,i)=>{                  
  Object.keys(v).forEach(v=>{
    keys.push(v)
    value.push(rowXlsx[i][v])
  })
})
console.log(keys)//取到了key
console.log(value)//取到了值
```

