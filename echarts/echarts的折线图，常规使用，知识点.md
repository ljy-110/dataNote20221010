echarts的折线图

一些常用的折线图的使用方法

基本折线图

```js
option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};
```

![image-20240201150205322](D:\LJY\code\dataNote20221010\img\image-20240201150205322.png)

1、平滑曲线

在`series`的里面添加，`smooth: true`

2、添加`legend`

在option里面加`legend:{}`，在`series`的里面加`name:'数据'`

（1）修改`legend`的icon

类型：'circle'`, `'rect'`, `'roundRect'`, `'triangle'`, `'diamond'`, `'pin'`, `'arrow'`, `'none'

3、自带标题的使用

在option里面加主标题`text`,副标题`subtext`

4、添加坐标轴名称

在yAxis里面添加`name`，修改样式`nameTextStyle`