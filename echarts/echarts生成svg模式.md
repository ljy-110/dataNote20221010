echarts生成svg模式

为了解决移动端上面echarts的权重太高，挡住了弹窗的展示做的改变；使用svg模式后，会导致我们使用的一些函数渲染出现问题需要一个进行修改

```js
官网：https://echarts.apache.org/handbook/zh/best-practices/canvas-vs-svg/#%E4%BD%BF%E7%94%A8-canvas-%E6%88%96%E8%80%85-svg-%E6%B8%B2%E6%9F%93
```

```js
import * as echarts from 'echarts';

// 使用 SVG 渲染器
var chart = echarts.init(containerDom, null, { renderer: 'svg' });
```

比如  渲染  饼图的 `label `的自定义

```js
//原本
formatter: function (params) {
                const name = params.name
                const percent = params.percent + '%'
                const index = params.dataIndex
                const value = params.value
                return [`{a${index}|${name}} {b${index}|${value}}{c${index}|个}`, `{hr${index}|}`].join('\n')
              },
//修改
return [`${name}  ${value}个`]
```

比如圆环图的  自定义title

```js
 //原本
text: '{a|' + getvalue + '%}\n{c|整改回复率}',
 textStyle: {
            rich: {
              a: {
                fontSize: 28,
                fontWeight: 'bold',
                color: '#FFF',
                padding: 5
              },

              c: {
                fontSize: 12,
                fontWeight: 'bold',
                color: '#FFF',
                // padding: [5,0]
              },
            },
          },    
  //修改
text: getvalue + '%',
x: 'center',
y: '33%',
  textStyle: {
              fontSize: 28,
              fontWeight: 'bold',
              color: '#FFF',
              padding: 5
          },
          subtext:title,
          subtextStyle:{
            fontSize: 12,
            fontWeight: 'bold',
            color: '#FFF',
          }
```







![image-20220329100237253](D:\LJY\code\dataNote20221010\img\image-20220329100237253.png)

