## JS的常用小技巧

### 1、简单的`if else`的简写

当我们只有一层的`if`判断的时候，我们可以简写这个条件判断

```js
//原
let id = this.id
if(id === 'xxxxxx'){
	this.flag = true
}else{
	this.flag = false
}
//上面的方法可以简写成
this.flag = (id === 'xxxxxx') ? true : false
```

### 2、判断空值，`null`,`nudefined`

有时候，我们会需要判断某个值是否为空，方便我们来处理下一步；或者检查输入的值是否为空值。

```js
//原
let input = this.value
if(input === null || input === undefined || input === ""){
	this.flag = false
}else{
	this.flag = true
}
//简写
this.flag = true || ""
```

### 3、布尔值的判断

我们在仅仅对某个变量的布尔值进行判断，来进行操作。

```js
//原
if(flag === true){}
//简写
if(flag)
```

### 4、循环

循环是我们在处理数据的时候用的最多的一种方法

```js
for(var i=0;i<list.length;i++)

for (let i in list)

for(let i of list)

list.forEach(item =>{})
```

### 5、字符串与数值的互相转型

我们对于后端返回的一些数字型的字符串要改成数值，来方便我们进行计算等等之类的操作。数值也需要转换成字符串，因为后端需要的字段类型是字符串。

```js
let string = '123'
let number = 123
//字符串转数值
let num1 = string*1  //这种是最简单的，但是只能是只有数字的字符串
let num2 = parseInt(string);  //这是转换成整数的 123；或者在数字与字符的拼接中提取数字
let num3 = parseFloat(string);  //这是精度的转换，123.0
let num4 = Number(string) //这是强制性转换

//转换字符串
let s = number.toString()
let s2 = number+""

//输入框最多输入两位小数，并且把单位改成分
let amout=(this.ruleForm.amount)*100
this.ruleForm.amount = (parseFloat(amout)).toString()  //这样就不会丢失精度
```

### 6、字符串的截取，拼接

对某些字符串来进行截取，然后拼接成自己需要的数据

```js
//截取字符串 字符串.substr（"从哪开始","截取几个"）
let string = 'obj_open123456789'
string.substr(3,5)
string.substr(3) //返回第三位后面的全部
//split
let obj = string.split('_');
let id = 'user_'+obj
//substring(3)
let a = string.substring(3)

//从后面截取数据
let type = (file.name).substring((file.name).lastIndexOf(".")+1)
```

### 7、判断字符串中是否含有某个字符

判断字符串中是否含有某个特定的字符

```js
//判断是否包含某个字符串 包含返回下标 不包含返回-1
let string = 'obj_open123456789'
var i = string.indexOf("open")
```

### 8、判断条件比较多的时候的简化

这是一个查询包含的方法，可以用来做多个值的判断；比如在判断上传文件的类型是否正确的时候

```js
let type = file.type
//原
if (type === 'png' || type === 'jpg' || type === 'jpeg' || type ==='svg') {}
//现在
if(['png','jpg','jpeg','svg'].includes(type)){}
//或者
if(['png','jpg','jpeg','svg'].indexOf(type) >= 0){}
```

### 9、多变量赋值

同时给多个变量赋值

```js
let a= 1
let b = 2
let c= 3
//简写
let [a,b,c] = [1,2,3]

//或者
let x;
let y = true
let x,y=true
```

### 10、用长度来清空数组

```js
let arr = [1,2,3,4,5]
arr,length = 0
let arr = []
```

### 11、空位合并运算符

在我们需要检查某个值是否为空的时候，给空值添加一个默认值

```js
//原
if(str === ''){
    this.flag = '长期'
}
//简写
this.flag = null ?? '长期'
```

### 12、数组的合并

`concat`，创建一个新数组，将`array`与任何数组 或 值连接在一起。

```js
let arr = ['1','2','3','4']
let arr2 = ['9']
let arr3 = arr.concat(arr2)
console.log(arr3);
//[ '1', '2', '3', '4', '9' ]
```

### 13、判断对象中是否存在某个字段

```js
if('role_info' in obj){}
```

### 14、获取指定范围内的随机数

在开发中，我们可能需要用到某些随机生成的字段数值

```js
let num = Math.floor(Math.random() * (max - min + 1)) + min;
```

### 15、保留小数

```js
let num =2.123456;
num = num.toFixed(2);  // 这个数值会被四舍五入 2.12
//如果不想被四舍五入的话
let num2 = parseFloat((num * 100)/100) // 

//其他的方法
parseInt(num)  //只会取整 2
Math.ceil(num) // 向上取整,有小数就整数部分加1
Math.floor(num) //向下取整
Math.floor(num)  //四舍五入
```

### 16、把对象的键和变变成数值

```js
let obj={id:1,res:true,msg:error}
//把对象的键变成数组
Object.keys(obj) //['id','res','msg']

//把对象的值变成数组
Object.values(obj) // [1,true,error]

//时获取对象的键和值，并返回一个多维数组
Object.entries(obj) // [['id',1],['res',true],['msg',error]]
```

### 17、判断字符串中有没有特定的字符，检验`http`

```js
let html = (this.html).trim().toLowerCase() // 变成小写
console.log(html.indexOf('http')== '-1');  //判断url是否存在http
```

### 18、判断数组中有没有特定的字符

```js
let text = ['TXT','DOC','XLS','PPT','DOCX','XLSX','PPTX','pdf','txt','doc','xls','ppt','docx','xlsx','pptx','zip','rar','ZIP','RAR']
text.indexOf(type)

如果等于 -1 就说明数组中没有该字符，
```

### 19、把字符串变成小写模式

```js
let type2 = type.trim().toLowerCase()
```

### 20、时间格式的转换与时间的获取

```js
var myDate = new Date(); 
myDate.getYear(); //获取当前年份(2位) 
myDate.getFullYear(); //获取完整的年份(4位,1970-????) 
myDate.getMonth(); //获取当前月份(0-11,0代表1月)         // 所以获取当前月份是myDate.getMonth()+1;  
myDate.getDate(); //获取当前日(1-31) 
myDate.getDay(); //获取当前星期X(0-6,0代表星期天) 
myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数) 
myDate.getHours(); //获取当前小时数(0-23) 
myDate.getMinutes(); //获取当前分钟数(0-59) 
myDate.getSeconds(); //获取当前秒数(0-59) 
myDate.getMilliseconds(); //获取当前毫秒数(0-999) 
myDate.toLocaleDateString(); //获取当前日期 
var mytime=myDate.toLocaleTimeString(); //获取当前时间 
myDate.toLocaleString( ); //获取日期与时间 
```

### 21、`JS`获取当前时间戳的方法-`JavaScript `获取当前毫秒时间戳有以下三种方法

```js
var timestamp =Date.parse(new Date());    结果：1280977330000       //不推荐; 毫秒改成了000显示 

var timestamp =(new Date()).valueOf();       结果：1280977330748       //推荐;  

var timestamp=new Date().getTime();         结果：1280977330748        //推荐;  


js中单独调用new Date();  显示这种格式  Mar 31 10:10:43 UTC+0800 2012 

但是用new Date() 参与计算会自动转换为从1970.1.1开始的毫秒数 
```

