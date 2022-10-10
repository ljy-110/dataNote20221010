js的number的类型

当Number（）和运算符new作为构造函数一起使用的时候会返回一个新的创建的Number对象。如果不添加运算符new，把Number（）作为一个函数来调用就会返回一个原始的数值。

```js
new Number(x)
Number(x)
//x 是创建的number的对象数值或者需要转换的数字的参数
```

代表了js里面最大的数值

```js
Number.MAX_VALUE
```

代表了js里面最小的数值，无限接近0，但是不会是负数

```js
Number.MIN_VALUE
```

Number.NaN是一个特别的值，而且一些数值转值得方法无法操作这种返回得参数值。如果js中返回得值不能使用通过Number.NaN来比较检测这个值是不是一个数字，只能使用其他得方法，比如调用函数isNaN()来比较。

```js
Number.NaN 
```

isNaN()，是一个用来检测判断参数值是否是NaN。通常用来判断返回得值和其他得数值转换得函数进行对比，用来判断参数值是否是一个合法得数字

```js
isNaN(x)

isNaN(0);                  // 返回 false
isNaN(0/0);                // 返回 true
isNaN(parseInt("1"));      // 返回 false
isNaN(parseInt("vue"));  // 返回 true
isNaN("1");                // 返回 false
isNaN("word");            // 返回 true
isNaN(true);               // 返回 false
isNaN(undefined);          // 返回 true
```

js中的负无穷大

```js
Number.NEGATIVE_INFINITY
```

js中的正无穷大

```js
Number.POSITIVE_INFINITY
```

用指数计数法格式化数字

```js
Number.toExponential( )
```

对参数进行四舍五入的参数`Number.toFixed( )`

```js
var num = 78945.789456;
num.toFixed();            // 返回 78946，注意舍入，没有小数部分
num.toFixed(1);             // 返回 78945.8，注意舍入
num.toFixed(8);             // 返回 78945.78945600，注意补零
(1.23e+20).toFixed(2);    // 返回 123000000000000000000.00
(1.23e-10).toFixed(2)     // 返回 0.00
```

把数字转换成本地格式的字符串

```js
number.toLocaleString( )
//数值的字符串来展示，有可能影响到小数点或者千分位分隔符采用的标点符号
```

格式化数字的有效位

```JS
Number.toPrecision()

var num = 78945.7894;
num.toPrecision(1);   // 返回 7e+4
num.toPrecision(3);   // 返回 7.23e+4
num.toPrecision(5);   // 返回 72346:注意舍入
num.toPrecision(10);  // 返回 72345.67890:注补L零
```

将—个数字转换成字符串

```js
Number.toString()
//可以将数字换成字符串
```

返回原始数值

```js
Number.valueOf()
```

