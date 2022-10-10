<<<<<<< HEAD
vue的关于姓名文字，电话号码，身份证号码的打码隐藏的过滤器
=======
vue的关于过滤器使用

vue 2.0 的开发中我们有时候需要对一些渲染返回的数据进行特别的处理，比如时间的格式化、数字的浮点值计算四舍五入等等的处理，如果只有一两个还好，但是批量进行数据渲染的时候就要用到vue的过滤器`filters`，可以使用页面的管道符来进行数据的处理，这样就可以进行多地方的引入使用，方便快捷。下面我们就来聊聊过滤器的方法和使用。

一、注册过滤器`Vue.filter()`

使用`Vue.filter()`可以注册一个自定义的过滤器来方便我们使用。比如一个数值的浮点数的处理的过滤器

```js
filters:{
    accuracyDust(value){
      let str = Math.round(value*100)
      return str
    }
},
```

从上面可以看到，`accuracyDust`是过滤器的名称，也是引用的名称；`value`就是需要处理的参数。页面的使用如下：

```js
<el-col :span="6">{{ item.number | accuracyDust }}%</el-col>
```

二、双向过滤器

上面的是常规的过滤器的使用，显示我们来说说双向的过滤器。双向，其实就是对`v-model`的参数进行处理转化

```js
<input v-model="input | accuracyDust" placeholder="请输入比例"></input>
```

但是因为这种过滤器的使用导致很多其他的情况，所以在vue2.0之后取消了这种情况，所以现在的过滤器只能在`{{}}`里面的数据进行使用过滤器。

三、过滤器的使用实例
>>>>>>> 8939307 (2022年10月10日2)

1.关于姓名文字的打码显示

```js
formatName (value) {
      if (!value) return '';
      let str = value;
      if(str.length == 2){
        str = str.toString().replace(/^([^\x00-\xff])([^\x00-\xff]{0,})([^\x00-\xff])/g , '$1*')
      }else if(str.length == 3){
        str = str.toString().replace(/^([^\x00-\xff])([^\x00-\xff]{0,})([^\x00-\xff])/g , '$1*$3')
      }else if(str.length == 4){
        str = str.toString().replace(/^([^\x00-\xff])([^\x00-\xff]{0,2})([^\x00-\xff])/g , '$1**$3')
      }else if(str.length > 4){
        str = str.toString().replace(/^([^\x00-\xff])([^\x00-\xff]{0,3})([^\x00-\xff])/g , '$1***$3')
      }else{}
      // str = str.toString().replace(/^([^\x00-\xff])([^\x00-\xff]{1,3})([^\x00-\xff])/g , '$1**$3')
      return str;
    }
```

2.电话号码打码显示

```js
formatPhone (value) {
  if (!value) return '';
  let str = value;
  str = str.toString().replace(/^(\d{3})(\d{4})(\d{4})/g , '$1****$3')
  return str;
})
```

3.身份证号码的打码

```js
formatIDcard (value) {
  if (!value) return '';
  let str = value;
  str = str.toString().replace(/^(.{6})(?:\w+)(.{4})$/ , '$1********$2')
  return str;
})
```

<<<<<<< HEAD
4.

```js
 hidden : function(str,frontLen,endLen) {    //str：要进行隐藏的变量  frontLen: 前面需要保留几位    endLen: 后面需要保留几位
		         var len = str.length-frontLen-endLen;
		         var xing = '';
		         for (var i=0;i<len;i++) {
		         xing+='*';
		        }
		         return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
		   }
       
       }
=======
4.时间的格式化。我的时间格式化使用比较多，所以我单独写了一个js文件，然后引入，进行使用

date.js

```js
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
```

引入使用

```js
import {formatDate} from '@/common/date.js'
filters: {
    formatDate(time) {
      time = time * 1000
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
>>>>>>> 8939307 (2022年10月10日2)
```

