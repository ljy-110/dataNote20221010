echarts的展示区域地图，添加纹理图片

下面我们以广西南宁的来做实例，来进行这个渲染和添加纹理图片的操作。

![image-20230328101229146](D:\LJY\code\dataNote20221010\img\image-20230328101229146.png)

首先我们先看看文档，echarts 的geo的areaColor是可以支持通过图片来对地图的区域内容来进行纹理填充的，也可以进行颜色的修改。

文档的具体位置：https://echarts.apache.org/zh/option.html#color

![image-20230328101702641](D:\LJY\code\dataNote20221010\img\image-20230328101702641.png)

但是这个纹理图片的填充是*支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串，所以我们需要新构建一个图片内容。

![image-20230328101842432](D:\LJY\code\dataNote20221010\img\image-20230328101842432.png)

展示图片我们可以使用下面两者方法来进行，当然方法很多，也可以使用其他的方法，这里就不一一列举了

```js
//方法一
 let img = document.createElement('img')
 img.src = require('../../../assets/image/2.jpg')
//方法二
<img ref="mapSvg" id="mapSvg" v-show="false" hidden style="width:500px;height:500px;" src="../../../assets/image/2.jpg">
this.$refs.mapSvgAreaMap
```

获取对于区域的json文件，这个可以去下面网站获取，也可以到gitHub上面直接获取，各位各取所需

```js
//阿里的获取地图json文件的
http://datav.aliyun.com/portal/school/atlas/area_selector
//gitHub上面可以直接获取完整所有的省份和市区的
https://github.com/ljy-110/china-geojson-map
```

下面就是具体的代码展示内容

（1）数据格式展示

```js
dataMapList : [
    //坐标是为了展现label的定位
   {name:"兴业区",value:[108.320189,22.819511],datas:12},
    ...
]
```

（2）叠加层和发光效果可以参考代码

```js
initAreaMap(){
      var myChart = echarts.init(this.$refs.areaMap);
    //GuangXi  引入的地图json文件
		echarts.registerMap("mapStype", GuangXi);
      let option = {}
      //label的图片引入
      let mapLabel = require('../../../assets/image/home/mapLabel.png');
      let data = this.dataMapList
      option={
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return params.name;
          }
        },
        geo: [
          {
            map: "mapStype",
            geoIndex: 1,
            zoom: 1,
            layoutCenter: ["50%", "44%"],
            layoutSize: "80%",
            zlevel: 4,
            show: true,
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff",
                  fontSize: "16"
                }
              },
              emphasis: {
                show: true,
                label: {
                  formatter: function(params) { // 鼠标经过的回调函数  
                    return params.name
                  },
                },
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: false, // 是否允许缩放
            itemStyle: {
              normal: {
                areaColor:'rgb(0,0,0,0)',
                borderWidth: 1,
                borderColor: 'rgb(222, 238, 255,0.5)',
                shadowColor: '#1773c3',
                shadowBlur: 20,
              },
              emphasis: {
                borderColor: 'rgb(222, 238, 255,0.5)',
                areaColor:'rgb(26, 92, 158,0.6)',
              }
            }
          },
          {
            map: "mapStype",
            geoIndex: 3,
            zoom: 1,
            layoutCenter: ["50%", "44%"],
            layoutSize: "80%",
            zlevel: 2,
            // aspectScale: 1,
            silent: true,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false, // 是否允许缩放
            itemStyle: {
              areaColor: {
                image: this.$refs.mapSvgAreaMap, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
              },
            }
          },
          {
            map: "mapStype",
            animation:true,
            animationDurationUpdate:0,
            geoIndex: 4,
            zoom: 1,
            layoutCenter: ["50%", "45.5%"],
            layoutSize: "80%",
            zlevel: 1,
            // aspectScale: 1,
            silent: true,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false, // 是否允许缩放
            itemStyle: {
              borderWidth: 1,
              areaColor:'#030a17',
              shadowColor: '#1773c3',
              shadowBlur: 60,
            }
          }
        ],
        series: [
          {
            type: 'map',
            geoIndex: 1,
            zoom: 1.2,
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
            data: data
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                color: "#fff",
                fontWeight:500,
                fontSize:18,
                verticalAlign:'top',
                lineHeight:-26,
                formatter: function(params) {
                  return params.data.name + '         '+ params.data.datas;
                },
              },
              emphasis: {
                show: false
              },
            },
            itemStyle: {
              opacity: 1
            },
            symbol:'image://' + mapLabel,
            symbolSize: [160, 70],
            symbolOffset: [0, 0],
            zlevel: 6,
            data: data
          },
        ]
      }
      if (option && typeof option === 'object') {
        myChart.setOption(option,true);
      }
      window.addEventListener('resize', myChart.resize);
    },
```

tip

1.那个图片展示可能会变得模糊

2.图片无法展示可以使用setTimeout，延迟渲染

可能还有各种问题，欢迎大家一起来探讨解决。

最后贴一张纹理图片，大家也可以自己去截取。卫星地图方法去截取。

![2](D:\LJY\code\dataNote20221010\img\2.jpg)