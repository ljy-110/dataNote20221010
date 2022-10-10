JavaScript的string的字符串类型

返回字符串string中的第n个字符，和数组是一样的，下标值的开始都是从0开始。如果这个n参数超过了字符串的长度或者是少于0的，只会返回一个空的字符串。

```js
string.charAt(n)
//n 参数
```

返回字符串的第n个Unicode编码。返回的是0到65536之间的16位数值

```js
string.charCodeAt(n)
```

字符串的拼接，可以连接多个字符串，当时我们更多的是习惯使用`+`来进行拼接

```js
string.concat(value, ...) 
//value, ...   多个参数
```

检测字符串是否有某个字符，如果有就返回第一次出现的位置，如果没有找到就是返回-1

```js
string.indexOf('ing') 
//或是规定位置开始检测
string.indexOf('ing',start) 
//start  下标值  没有写就是默认从头开始
```

从后面开始检测字符串，如果有就返回最后一次出现的位置，如果没有找到就是返回-1

```js
string.lastIndexOf('ing') 
//或是规定位置开始检测
string.lastIndexOf('ing',start) 
//start  下标值  没有写就是默认从头开始到后面
```

获取字符串得长度

```js
string.length
```

结合正则表达式来替换合适得字符串

```js
string.replace('正则表达式', '替换内容')
```

分割字符串。根据特定得符合或者下标来截取自己想要得字符串。它将返回的是一个数组

```js
let id = 'user_sdhishdjsndjn'
let arr = id.split("_"); 
// 返回值  ['user','sdhishdjsndjn']

//也可以使用特定得数值来给定分割得长度
"user".split("", 2);  // 返回 ["u","s"] 

//也可以使用正则表达式来进行分割
let phone = '14545613841321'
let str = phone.split('正则表达式')
```

抽取字符串中某一段字符串，`string.slice(start, end)`,start  开始截取得下标，end  结束截取得下标(但是不包含这个下标得值)。如果是负数，就是从结尾开始算。如果没有这个值们就是截取到字符串结尾

```js
string.slice(start, end)

let str = 'peopleType'
let str2 = str.slice(0,4) //返回 'peop'
str.slice(4)  // 返回 'leType'
str.slice(3,-1)  //返回 'pleTyp'  
```

从某个位置抽取字符串得，然后取固定的长度得字符串``string.substr(start, length)`,start需要获取得字符串开始得下标，length需要获取得字符串，如果length省略了就是从start位置到结尾

```js
string.substr(start, length)

let str = 'peopleType'
let str2 = str.slice(2,2) //返回 'op'
str.slice(4)  // 返回 'leType'
str.slice(-5)  //返回 'eType' 
```

截取字符串中的部分字符串

```js
str.substring(2,5)
// 返回 opl
```

把字符串转换成小写

```js
string.toLocaleLowerCase()
```

把字符串转换成大写

```js
string.toLocaleUpperCase()
```

