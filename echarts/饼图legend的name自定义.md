饼图的legend的name的自定义

```js
legend: {
          top: '25%',
          right: '10%',
          type: 'scroll',  //legend要多，进行分页处理
          orient: 'vertical',
          textStyle: {
            color: 'rgba(223, 231, 252, 0.996078431372549)',
            fontSize: 14,
          },
          data: legendList,
          pageIconColor: '#ccc',//分页按钮颜色
          pageTextStyle:{
            color:'rgba(223, 231, 252, 0.996078431372549)' //分页数字
          },
          formatter: (name) => {
            var target;
            for (var i = 0, l = data.length; i < l; i++) {
              if (data[i].name == name) {
                target = data[i].value;
              }
            }
            return name + '    ' + target + '个';
            // if (!name) return ''
            // return this.LineFeedLabel(name, 8) // 根据你的需求修改参数
          }
        },
```

