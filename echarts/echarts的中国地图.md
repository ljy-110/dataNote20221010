Vue+ElementUI+Echarts的地图DOM

地图图表的开发在我们开发的过程中就很常见，特别是在开发大屏的时候，最近在进行地图图表的开发，就单独用引入的方式来记录一个DOM，让大家一起学习下。

示例图

![image-20220826112349996](D:\LJY\code\dataNote20221010\img\image-20220826112349996.png)

从上图可以看到，这个主要是就是对地图做个一个展示，省份的高亮，各个板块的颜色修改的一些功能的DOM。

因为我使用是html来写的，所以都是用引入的模式来进行开发

```js
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script src="https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js"></script>
<script src="https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000"></script>
//地图的js
<script src="https://cdn.jsdelivr.net/npm/echarts/map/js/china.js?v=1598903772045"></script>
```

`html`板块。旁边的颜色块选择修改的模块就不一一展示了。

```html
<div id="box" :style="{'background-color': form.backgroundColor}" style="width: 800px; height: 600px;"></div>
```

下面就是`JS`方法板块

因为我添加了颜色的图层展示，就导致了地图样式修改会失效，比较已经给了底色

```js
initMap(){
          var myEcharts = echarts.init(document.getElementById("box"));
          var option = {
            title: {
              text: this.form.title,
              x: "center",
              textStyle: {
                fontSize: 18,
                color: this.form.titleColor
              },
            },
            tooltip: {
                trigger: 'item', 
                backgroundColor: "#588ED5",
                formatter: '地区：{b}<br/>value：{c}'
            },
            visualMap: {
              show: true,
              type: 'piecewise',
              calculable: true,
              showLabel: true,
              itemSymbol: 'rect',
              left: 20,
              top: 20,
              itemWidth: 20,
              itemHeight: 6,
              inRange: {
                color: ['rgb(163,163,163)','#FEE5Da', '#FCBAA0', '#F66B4A', '#DE2D27','#A60F14']
              },
              padding: 0,
              pieces: [
                { min: 50000, label: '>50000', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
                { min: 4000, max: 50000,label: '4000~50000', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
                { min: 300, max: 4000,label: '300~4000', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
                { min: 1, max: 20, label: '1~20', symbol: 'rect' },
                { min: 0, max: 1, label: '0~1', symbol: 'rect' },
                { min: 0, max: 0, label: '无数据', symbol: 'rect' }
              ],
              
              align: "left",
              itemGap: 5,
              textStyle: {
                color: '#000'
              },
            },
            series: [
              {
                name: '地图',
                type: 'map',
                mapType: 'china',
                roam: false,
                itemStyle: {
                  // show:false,
                  normal: {
                    areaColor: this.form.areaColor,
                    label: {
                      show: true,//是否显示标签
                      textStyle: {
                        color: this.form.wordColor
                      }
                    }
                  },
                  zoom: 1.5, 
                  emphasis: {//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                    areaColor: this.form.highlightColor,
                    label: { show: true }
                  }
                },
                top: "4%",
                data: [
                    { name: '北京', value: 0 },
                    { name: '天津', value: 0 },
                    { name: '上海', value: 0 },
                    { name: '重庆', value: 0 },
                    { name: '河北', value: 0 },
                    { name: '河南', value: 0 },
                    { name: '云南', value: 0 },
                    { name: '辽宁', value: 0 },
                    { name: '黑龙江', value: 10 },
                    { name: '湖南', value: 0 },
                    { name: '安徽', value: 0 },
                    { name: '山东', value: 400 },
                    { name: '新疆', value: 0 },
                    { name: '江苏', value: 0 },
                    { name: '浙江', value: 0 },
                    { name: '江西', value: 0 },
                    { name: '湖北', value: 0 },
                    { name: '广西', value: 1500 },
                    { name: '甘肃', value: 0 },
                    { name: '山西', value: 0 },
                    { name: '内蒙古', value: 0 },
                    { name: '陕西', value: 0 },
                    { name: '吉林', value: 0 },
                    { name: '福建', value: 0 },
                    { name: '贵州', value: 0 },
                    { name: '广东', value: 0 },
                    { name: '青海', value: 0 },
                    { name: '西藏', value: 10000 },
                    { name: '四川', value: 0 },
                    { name: '宁夏', value: 0 },
                    { name: '海南', value: 0 },
                    { name: '台湾', value: 0 },
                    { name: '香港', value: 0 },
                    { name: '澳门', value: 0 }
                  ]
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myEcharts.setOption(option,true);
        }
```

上面`js`的`data`的省份数据，记得名字要一样的，不能修改。