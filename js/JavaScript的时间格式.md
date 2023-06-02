js的时间格式

获取时间是我们开发经常用到，今日就来看下各种获取时间的方法，还有一些特别的处理方法，来做一个汇总。

`var date = new Date()`

指定Date对象date所指的月份中的某一天，使用本地时间。返回值是1～31之间的 一个整数。

```js
date.getDate()
```

指定Date对象date所指的一个星期中的某一天，使用本地时间。返回值是0(周日) 到6(周六)之间的一个整数。

```js
date.getDay()
```

当dace用本地时间表示时返回的年份。返回值是一个四位数，表示包括世纪值在内的完整年份。也可以获取返回两位数的年份

```js
date.getFullYear() //四位数年份
date.getYear(); //两位数年份
```

指定Date对象date的小时字段，以本地时间表示。返回值是0(午夜)到23(晚上 11点)之间的一个整数。

```js
date.getHours()
```

指定Date对象date的毫秒字段，用本地时间表示。返回值在0～999之间。

```js
date.getMilliseconds()
```

指定的Date对象date的分钟字段，以本地时间表示。返回值在0～59之间。 

```js
date.getMinutes()
```

指定的Date对象date的月份字段，以本地时间表示。返回值在0(一月)到11(十二月)之间。

```js
date.getMonth()
//正常的月份 应该要+1   date.getMonth()+1
```

指定的Date对象date的秒字段，以本地时间表示。返回值在0～59之间。 

```js
date.getSeconds()
```

指定的Date对象date的毫秒表示，也就是date指定的日期和时间距从1970.1.1开始的毫秒数

```js
date.getTime()
```

指定的日期和时间距1970年1月1日午夜(GMT时间)之间的毫秒数。

```js
Date.parse(date)
//1280977330000
```

date的日期部分的字符串表示，由实现决定，可以读懂，以本地时间表示

```js
date.toDateString()
```

date的日期部分的字符串表示，由实现决定，可以读懂，以本地时间表示，根 据本地规约格式化。

```js
date.toLocaleDateString()
```

```js
console.log(date.toDateString());
console.log(date.toLocaleDateString());
console.log(date.toLocaleString());
console.log(date.toLocaleTimeString());
console.log(date.toString());
console.log(date.toTimeString());
console.log(date.valueOf());  //返回毫秒数

//打印结果如下

// Fri Nov 05 2021
// 2021/11/5
// 2021/11/5 下午5:36:27
// 下午5:36:27
// Fri Nov 05 2021 17:39:29 GMT+0800 (中国标准时间)
// 17:39:29 GMT+0800 (中国标准时间)
// 1636105169501
```

在javascript中取date的前一天时间：

```js
new Date(new Date()-24*60*60*1000),//取前一天的时间
```

获取 `2021-01-11`格式的时间

```js
let year = new Date().getFullYear()
let month = new Date().getMonth() + 1
let month2 = (month.toString().length > 1 ? month : '0'+month).toString() //给月份补0
let day = new Date().getDate()
let day2 = (day.toString().length > 1 ? day : '0'+day).toString() //给日补0
let date = year + '-' + month2 + '-' + day2
//2021-01-11
```

js 获取当前日期所在季度

```js
可以使用 JavaScript 中的 Date 对象和 Math 对象来获取当前日期所在季度。

具体实现方法如下：

​```javascript
// 获取当前月份
var month = new Date().getMonth();

// 获取当前季度
var quarter = Math.floor(month / 3) + 1;

console.log("当前季度为：" + quarter);
​```

其中，`new Date().getMonth()` 获取当前月份，由于季度是以3个月为一个周期，因此需要用 `Math.floor(month / 3)` 计算出当前是第几个季度，再加上 1 即为当前季度的编号。

以上代码输出的结果，以 2023 年 4 月 23 日为例，输出的结果为：当前季度为：2。
```

js 获取当前日期是当前季度的第几个月

```js
可以使用 JavaScript 中的 Date 对象和 Math 对象来获取当前日期是当前季度的第几个月。

具体实现方法如下：

​```javascript
// 获取当前月份
var month = new Date().getMonth();

// 获取当前季度的第一个月份
var startMonth = (Math.floor(month / 3)) * 3;

// 获取当前日期是当前季度的第几个月
var currentQuarterMonth = month - startMonth + 1;

console.log("当前季度的第" + currentQuarterMonth + "个月");
​```

其中，`new Date().getMonth()` 获取当前月份，由于季度是以 3 个月为一个周期，因此需要用 `Math.floor(month / 3)` 来计算当前是第几个季度的第一个月，再用当前月份减去第一个月份，再加 1 即为当前季度的第几个月。

以上代码输出的结果，以 2023 年 4 月 23 日为例，输出的结果为：当前季度的第2个月。
```

