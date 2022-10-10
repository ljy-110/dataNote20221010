tooltip的固定高度

```js
tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'shadow'
          },
          // 固定高度
          position: function (point, params, dom, rect, size) {
            return [point[0]-50, '10%']  //返回x、y（横向、纵向）两个点的位置
          }
        },
```

