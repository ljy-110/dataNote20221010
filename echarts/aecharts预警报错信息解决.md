新版5.4.0的echarts浏览器预警和报错信息

[ECharts] DEPRECATED: 'normal' hierarchy in itemStyle has been removed since 4.0. All style properties are configured in itemStyle directly now.

![image-20231212111700541](E:\ljy\资料\img\image-20231212111700541.png)

因为normal层被移除，问题代码如下图所示

```js
itemStyle: {
   normal: {color:'rgba(3,134,226,0.36)'}      
},
                
//改成
itemStyle: {
   color:'rgba(3,134,226,0.36)'
},
```

二、[ECharts] DEPRECATED: barBorderRadius is deprecated, use borderRadius instead.

```js
barBorderRadius: [2, 2, 0, 0],
    //改成
borderRadius: [2, 2, 0, 0],
```

三、[ECharts] DEPRECATED: label.emphasis has been changed to emphasis.label since 4.0

```js
label: {
     show: false
     // normal: {show: false},
     // emphasis: {show: false}
},
```



四、hoverAnimation is deprecated, use emphasis.scale instead.

```js
// hoverAnimation: false,
emphasis:{
    scale:false
},
```

五、[ECharts] DEPRECATED: textStyle hierarchy in axisLabel has been removed since 4.0. All textStyle properties are configured in axisLabel directly now.

自4.0以来，axisLabel中的textStyle层次结构已被删除。现在所有的textStyle属性都直接在axisLabel中配置了。

```js
axisLabel: {
            show: true,
            textStyle: { color: '#fff' }
          },
 //改成
     axisLabel: {
            show: true,
            color: '#fff',
          },         
```

