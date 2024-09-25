legend文字太长和数量太多

在我们使用图表饼图的时候会发现因为数据太多导致页面的布局发现重叠或者不好看，比如label的文字太长了，legend的数量太多了等一些问题，所以今天我们就来聊聊遇到这些问题的是可以通过那些设置来进行改进

文字太长，换行处理

```js
legend: {
          icon: 'circle',
          top: '',
          right: '0px',
          // width: 120,
          // height:'100%',
          type: 'scroll',  //legend要多，进行分页处理
          orient: 'vertical',
          textStyle: {
            color: 'rgba(223, 231, 252, 0.996078431372549)',
            fontSize: 14,
          },
          data: listData[0].name,
          pageIconColor: '#ccc',//分页按钮颜色
          pageTextStyle:{
            color:'rgba(223, 231, 252, 0.996078431372549)' //分页数字
          },
          formatter: (name) => {
            if (!name) return ''
            return this.LineFeedLabel(name, 8) // 根据你的需求修改参数
          }

          // formatter: function (name) {
          //   return name;
          // }
        },
```

下面是处理文字太长的行数，这里设置的是超过8个字就进行换行

```js
LineFeedLabel (data, length) {
      //data 要处理的字符串
      //length 每行显示长度
      let word = ''
      let num = Math.ceil(data.length / length) // 向上取整数
      // 一行展示length个
      if (num > 1) {
        for (let i = 1; i <= num; i++) {
          word += data.substr((i - 1) * length, length)
          if (i < num) {
            word += '\n'
          }
        }
      } else {
        word += data.substr(0, length)
      }
      return word
    },
```

legend的数量太多需要进行分页处理的方法，就是给legend的添加一个`type:scroll,orient: 'vertical'`的属性，就可以实现分页的效果

```js
type: 'scroll',  //legend要多，进行分页处理
orient: 'vertical',
```

![image-20211116141107113](D:\LJY\code\dataNote20221010\img\image-20211116141107113.png)

如果需要修改下分页效果下面的文字和分页箭头的样式颜色可以通过`pageIconColor`，属性来进行修改

```js
pageIconColor:'#ccc'
```

翻页按钮不激活时（即翻页到头时）的颜色修改

```js
pageIconInactiveColor : '#aaa'
```

翻页按钮的大小。可以是数字，也可以是数组，比如`[12,5]`，表示的是`[宽，高]`

```js
 pageIconSize : 12
```

图例中，按钮和页信息之间的间隔

```js
pageButtonItemGap  : 5
```

分页信息的显示格式，想要页面加总页数一起显示

```js
pageFormatter : '{current}/{total}'

//current与total，都必须是number数值型数字
```

分页图标箭头的设置，可以修改，可以用原本的箭头模式

```js
pageIcons:{
    horizontal
}
```

分页信息的文字样式的修改，就是正常的css样式属性，只是记得要用驼峰命名

```js
 pageTextStyle:{
     color:'rgba(223, 231, 252, 0.996078431372549)', //分页数字
     fontWeight:'400'
 }
```









