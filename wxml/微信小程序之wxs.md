微信小程序之wxs

WXS（WeiXin Script）是小程序的一套脚本语言，结合 `WXML`，可以构建出页面的结构。

### 注意

1. WXS 不依赖于运行时的基础库版本，可以在所有版本的小程序中运行。
2. WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。
3. WXS 的运行环境和其他 JavaScript 代码是隔离的，WXS 中不能调用其他 JavaScript 文件中定义的函数，也不能调用小程序提供的API。
4. WXS 函数不能作为组件的事件回调。
5. 由于运行环境的差异，在 iOS 设备上小程序内的 WXS 会比 JavaScript 代码快 2 ~ 20 倍。在 android 设备上二者运行效率无差异。

常用的wxs

1、时间格式化

```js
<wxs module="format">
    var format = function(date) {
        var date = getDate(date)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var weekDay = date.getDay()
        var week = ''
        switch(weekDay){ 
            case 0: 
                week = '周日'
                break; 
            case 1:
                week = '周一'
                break; 
            case 2: 
                week = '周二'
                break; 
            case 3: 
                week = '周三'
                break; 
            case 4: 
                week = '周四'
                break; 
            case 5: 
                week = '周五'
                break; 
            case 6: 
                week = '周六'
                break; 
        }
        return month + '月' + day + '日' +' ' + week;
    }
module.exports.format = format;
</wxs>

<view style="margin-top:10px;">{{format.format(startTime)}}</view>

```

2、打星号

```js
<wxs module="phone">
var toHide = function(array) {
  var mphone = array.substring(0, 3) + '****' + array.substring(7);
  return mphone;
}
module.exports.toHide = toHide;
</wxs>


<text style="font-size:24px;">{{phone.toHide(userInfo.email)}}</text>
```

