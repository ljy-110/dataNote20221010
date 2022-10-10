vue+echarts的图表使用--详细

1、取消图表的网格

```js
// 控制网格线是否显示
splitLine: {
                 show: false,   // 网格线是否显示
                 //  改变样式
                 lineStyle: {
                     color: '#ccc'   // 修改网格线颜色     
                 }                            
},
```

2、坐标轴的样式修改

```js
xAxis: [
              {
                  type: 'category',
                  boundaryGap: false,
                  data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                  axisLine:{
                      lineStyle:{color:"#ccc"}
                  },
                  axisTick: {
                    show: false // 去掉刻度
                  },
                  axisLabel:{//字体样式的修改
                      show: true,//显示隐藏
                       textStyle:{color:"#ccc"}
                  },
                  // 控制网格线是否显示
splitLine: {
                 show: false,   // 网格线是否显示
                 //  改变样式
                 lineStyle: {
                     color: '#ccc'   // 修改网格线颜色     
                 }                            
},
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '(次)',
                  axisLine:{
                      lineStyle:{color:"#ccc",fontSize:'16'}
                  },
                  axisTick: {
                    show: false // 去掉刻度
                  },
              }
          ],
```

3、圆环图的

```js
//圆环中心的文字的样式修改
title: {
          text: value.value+'次',
          subtext: value.name,
          x: 'center',
          y: 'center',
          itemGap: 0,
          textStyle: {
            fontSize: 26,
            fontWeight: 'bold',
            color: 'rgb(0,237,255)'
          },
          subtextStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#fff'
          },
},
//圆环的鼠标移入的浮动效果清除
series: [
            {
              hoverAnimation:false,//添加这个属性
            }
    ]
```

4、图表的地图模块的    颜色报错

![image-20210927103946759](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20210927103946759.png)

经过研究发现，是因为颜色引入加多了一个双引号，如下

![image-20210927104058490](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20210927104058490.png)

![image-20210927104326465](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20210927104326465.png)

一不小心就是坑

5、map的使用

引入地图json文件

```js
let ChinaJSON = require("../../../js/China.json")
```

```js
NativePlace(){
      function randomData() {  
        return Math.round(Math.random()*500);  
      }
      var mydata = [  
          {name: '北京',value: '100' },{name: '天津',value: randomData() },  
          {name: '上海',value: randomData() },{name: '重庆',value: randomData() },  
          {name: '河北',value: randomData() },{name: '河南',value: randomData() },  
          {name: '云南',value: randomData() },{name: '辽宁',value: randomData() },  
          {name: '黑龙江',value: randomData() },{name: '湖南',value: randomData() },  
          {name: '安徽',value: randomData() },{name: '山东',value: randomData() },  
          {name: '新疆',value: randomData() },{name: '江苏',value: randomData() },  
          {name: '浙江',value: randomData() },{name: '江西',value: randomData() },  
          {name: '湖北',value: randomData() },{name: '广西',value: randomData() },  
          {name: '甘肃',value: randomData() },{name: '山西',value: randomData() },  
          {name: '内蒙古',value: randomData() },{name: '陕西',value: randomData() },  
          {name: '吉林',value: randomData() },{name: '福建',value: randomData() },  
          {name: '贵州',value: randomData() },{name: '广东',value: randomData() },  
          {name: '青海',value: randomData() },{name: '西藏',value: randomData() },  
          {name: '四川',value: randomData() },{name: '宁夏',value: randomData() },  
          {name: '海南',value: randomData() },{name: '台湾',value: randomData() },  
          {name: '香港',value: randomData() },{name: '澳门',value: randomData() }  
      ];
      var myChart = echarts.init(this.$refs.NativePlace)
      myChart.clear()
      echarts.registerMap('china', ChinaJSON);
      let optionMap = {
        tooltip: {
          trigger: 'item',
          backgroundColor: '#152659',
          extraCssText: 'box-shadow:0 0 10px rgba(0,0,0,0.35)',
          // formatter: '{b}<br/>{c}人'
          formatter: function (params) {
            let num = 0
            if (!isNaN(params.value)) {
              num = params.value
            }
            return params.name + '<br />' + num + '人';
          }
        },
        visualMap: {
          show: true,
          type: 'piecewise',
          calculable: true,
          showLabel: true,
          itemSymbol: 'rect',
          left: 20,
          bottom: 30,
          itemWidth: 20,
          itemHeight: 6,
          // inRange: {
          //   color: ['#fee5da', '#fcbaa0', '#f66b4a', '#de2d27','#a60f14']
          // },
          // padding: 0,
          // pieces: [
          //   { min: 400, label: '400以上', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
          //   { min: 300, max: 399,label: '300~399', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
          //   { min: 200, max: 299, label: '200~299', symbol: 'rect' },
          //   { min: 100, max: 199, label: '100~199', symbol: 'rect' },
          //   { min: 0, max: 99, label: '0~100', symbol: 'rect' }
          // ],
          inRange: {
            // color: ['#007BFF', '#36CFC9', '#73D13D', '#E69E11']
            color: ['#FEE5dA;', '#FCBAA0', '#F66B4A', '#DE2D27','#A60F14']
          },
          padding: 0,
          pieces: [
            { min: 300, label: '300以上', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
            // { min: 1000, max: 5000, label: '1000~5000', symbol: 'rect' },
            { min: 200, max: 299, label: '200~299', symbol: 'rect' },
            { min: 100, max: 199, label: '100~199', symbol: 'rect' },
            { min: 0, max: 99, label: '1~100', symbol: 'rect' }
          ],
          align: "left",
          itemGap: 5,
          textStyle: {
            color: '#fff'
          },
        },
        geo: {
          show: true,
          map: 'china',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
            }
          },
          roam: false,
          zoom: 1.2,
          itemStyle: {
            normal: {
              areaColor: '#01215c',
              borderWidth: 3,//设置外层边框
              borderColor: '#1483DF',
              shadowColor: 'rgba(38,108,198, 1)',
              shadowBlur: 5,
              shadowOffsetY: 2
            }
          }
        },
        series: [
          {
            type: 'map',
            map: 'china',
            geoIndex: 1,
            zoom: 1.2,
            // aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
                color: 'rgba(255,255,255,0.9)'
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: "#1339A2",
                borderColor: '#1585D4',
                borderWidth: 1
              },
              emphasis: {
                areaColor: '#01215c'
              }
            },
            data: mydata
          }]
      }
      myChart.setOption(optionMap, true);
    },
```

6、多图表切换，清除上一次加载的数据

```js
在setOption里面加 true

option && myChart.setOption(option,true);
```

