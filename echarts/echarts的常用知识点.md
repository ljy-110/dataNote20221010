echarts的常用知识点

echarts是我们常用的一个图表工具，里面也有很多现成的成熟的图表模板组件的实例。但是echarts的文档里面过于的庞大，有些配置的属性不好找，今天我就我自己的开发过程中来进行记录下一些常用的知识点，记录一些经常查找的配置项。

1、渐变色的背景色的设置。主要是横向渐变颜色，还是就是径向的渐变颜色。就是从中心往外进行渐变。渐变主要是使用了`LinearGradient`和`RadialGradient`

线性渐变

```js
color: function (params) {
                  var colorList = [
                    {c1: ' #CBA0FF',c2: '#598EFE'},
                    {c1: ' #FCAE17',c2: '#FCDA5B'},
                    {c1: '#30DDD8',c2: '#84F0F0'}, 
                    {c1: '#3288FC',c2: '#36B4FD'
                    },]
                  return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                    offset: 0,
                    color: colorList[params.dataIndex].c1
                  }, {
                    offset: 1,
                    color: colorList[params.dataIndex].c2
                  }])
                }
```

径向渐变（中心往外面渐变）

```js
color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, 
              [{offset: 0,color: 'rgb(24,43,99,.3)'},{offset: 0.5,color: 'rgb(24,43,99,.8)'},{offset: 1,color: baColor}]
                  ),
```

2、legend的数量太多了，需要进行分页的操作。给`legend`里面添加下面两个属性就可以实现了legend的分页功能，避免了legend太多，遮住了图表的内容。

```js
type: 'scroll',  //legend要多，进行分页处理
orient: 'vertical',
```

3、x轴的刻度标签间隔的控制。图表本身如果数据太多了的话，间隔会自动打开的，但是有时候是不能符合我们自己项目要求的，所以就需要自己去配置，就要使用到了`interval`。我的设置是针对时间的来进行做展示刻度标签的

```js
axisLabel: {
   show: true,
   interval:23,//刻度之间的间距设置
},
```

4、x轴的文字标签的倾斜角度。如果x轴的标签的文字太长了会发生重叠，所以就需要对文字进行倾斜，一遍完整的显示出来

```js
axisLabel: {
   rotate: 20,// 倾斜角度
},
```

5、图表上面显示数字。在柱状图或者折线图上面添加数值展示。在`series`里面添加`label`

```js
label: {
   show: true, //开启显示
   position: 'top', //在上方显示
   textStyle: { //数值样式
      color: '#fff',
      fontSize: 16
   }
}
```

6、图表的提示框中的内容格式配置。只要是只有字符串模板和回调函数的两种形式。

字符串模板(下面是官网的内容解析)

模板变量有 `{a}`, `{b}`，`{c}`，`{d}`，`{e}`，分别表示系列名，数据名，数据值等。 在 [trigger](https://echarts.apache.org/zh/option.html#tooltip.trigger) 为 `'axis'` 的时候，会有多个系列的数据，此时可以通过 `{a0}`, `{a1}`, `{a2}` 这种后面加索引的方式表示系列的索引。 不同图表类型下的 `{a}`，`{b}`，`{c}`，`{d}` 含义不一样。 其中变量`{a}`, `{b}`, `{c}`, `{d}`在不同图表类型下代表数据含义为：

- 折线（区域）图、柱状（条形）图、K线图 : `{a}`（系列名称），`{b}`（类目值），`{c}`（数值）, `{d}`（无）
- 散点图（气泡）图 : `{a}`（系列名称），`{b}`（数据名称），`{c}`（数值数组）, `{d}`（无）
- 地图 : `{a}`（系列名称），`{b}`（区域名称），`{c}`（合并数值）, `{d}`（无）
- 饼图、仪表盘、漏斗图: `{a}`（系列名称），`{b}`（数据项名称），`{c}`（数值）, `{d}`（百分比）

![image-20211122140109456](E:\ljy\资料\img\image-20211122140109456.png)

实例

```js
formatter: '分类' + ' <br/>{b} : {c} '+'人'+'({d}%)'
```

回调函数的

```js
formatter: function (params) {
            return (
              '<span style="color: #fff;">整改回复率：' + getvalue + "%</span>"
            );
},
```

7、鼠标移入的数据展示变成一个阴影方块高亮

```js
xAxis: {
              axisPointer: {
                type: 'shadow'
              }
          },
```

8、修改legend的类型

```js
legend: {
    icon: "roundRect",//圆角矩形
},
//circle：圆形
//roundRect：圆角矩形
//triangle：三角形
//diamond：菱形
//arrow：箭头形
//none：没有
     itemHeight: 0.5, // 粗细
```

9、折线图x轴y轴的颜色设置

```js
axisLine:{
              lineStyle:{
                color:'rgba(223, 231, 252, 0.91)',
                width:1
              }
            },
```

10、y轴的最小值是

```js
interval: 1,
```

11、去掉圆环图的放大效果

```js
hoverAnimation: false,
    
    //新版 5.4.0
 emphasis:{
              scale:false
            },
```

12、柱状图鼠标滚动缩放

```js
dataZoom: {
          type: 'inside',
        },
```

13、柱状图的背景色

```js
showBackground: true,
            backgroundStyle: {
              color: 'rgba(3, 134, 226, 0.2)'
            },
```

14、图表缩放

```js
if (option && typeof option === 'object') {
        myChart.setOption(option);
      }
      window.addEventListener('resize', myChart.resize);
```

