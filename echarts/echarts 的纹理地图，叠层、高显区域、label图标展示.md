echarts 的纹理地图，叠层、高显区域、label图标展示

![image-20230328112027300](D:\LJY\code\dataNote20221010\img\image-20230328112027300.png)

```js
initMap3DChina(chinaJson){
      // console.log(this.regionsMap);
      document.getElementById('allmap').style = 'transform: scale(0.5);transition: transform 2s;'
      setTimeout(function () {
        document.getElementById('allmap').style = 'transform: scale(1);transition: transform 2s;'
      },1000)
      let mapLabel = require('../../../assets/image/home/mapLabel.png');
      let mapIcon = require('../../../assets/image/home/mapIcon.png');
      let that = this
      this.chinaJson = chinaJson ? chinaJson:China
      var chartDom = document.getElementById('allmap');
      var myChart = echarts.init(chartDom);
			echarts.registerMap("mapStype", this.chinaJson)
      let data = this.deployInfo.data
      let option = {}
      // this.mapCenter = [104.114129, 37.550339]
      option={
        // backgroundColor:'#131e42',
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return params.name;
          }
        },
        visualMap: {
          show: false,
          type: 'piecewise',
          calculable: true,
          seriesIndex:[0],
          showLabel: true,
          itemSymbol: 'rect',
          left: 20,
          bottom: 30,
          itemWidth: 20,
          itemHeight: 6,
          inRange: {
            color: ['rgba(6, 194, 231,0.6)'],
            opacity:0.15,
            colorLightness:1,
          },
          padding: 0,
          pieces: [
            { min: 400, label: '400以上', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
            { min: 300, max: 399,label: '300~399', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
            { min: 200, max: 299, label: '200~299', symbol: 'rect' },
            { min: 100, max: 199, label: '100~199', symbol: 'rect' },
            { min: 1, max: 99, label: '1~100', symbol: 'rect' },
            { min: 0, max: 0, label: '无数据', symbol: 'rect' }
          ],
          
          align: "left",
          itemGap: 5,
          textStyle: {
            color: '#fff'
          },
        },
        geo: [
          {
            map: "mapStype",
            animation:true,
            animationDurationUpdate:0.1,
            geoIndex: 1,
            zoom: this.deployInfo.room,
            // center: this.deployInfo.center,//当前视角的中心点
            // regionHeight: 4, //地图厚度
            layoutCenter: ["50%", "44%"],
            layoutSize: "80%",
            zlevel: 4,
            show: true,
            // aspectScale: 1,
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
                    // console.log('hover', params)
                    // dataObj = params;
                    return params.name
                  },
                },
                textStyle: {
                  color: "#fff"
                }
              }
            },
            regions: [
              {
                name: "南海诸岛",
                itemStyle: {
                  // 隐藏地图// 为 0 时不绘制该图形
                  normal: {
                    opacity: this.regionsMap ? 1:0,
                  }
                },
                // 隐藏文字
                label: {show: false},
              }
            ],
            roam: false, // 是否允许缩放
            itemStyle: {
              normal: {
                areaColor:'rgb(26, 92, 158,0.15)',
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
            animation:true,
            animationDurationUpdate:0,
            geoIndex: 2,
            zoom: this.deployInfo.room,
            // center: this.deployInfo.center,//当前视角的中心点
            layoutCenter: ["50%", "44%"],
            layoutSize: "80%",
            zlevel: 3,
            // aspectScale: 1,/
            silent: true,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false, // 是否允许缩放
            regions: [
              {
                name: "南海诸岛",
                itemStyle: {
                  // 隐藏地图// 为 0 时不绘制该图形
                  normal: {opacity: this.regionsMap ? 1:0, }
                },
                // 隐藏文字
                label: {show: false},
                emphasis: {
                  show: false
                }
              }
            ],
            itemStyle: {
              // areaColor:'rgb(0, 58, 140,0.5)',
              areaColor:'rgba(0,58,140,0.3)',
              shadowColor: '#1773c3',
              shadowBlur: 20,
              borderWidth: 0
            }
          },
          {
            map: "mapStype",
            animation:true,
            animationDurationUpdate:0,
            geoIndex: 3,
            zoom: this.deployInfo.room,
            // center: this.deployInfo.center,//当前视角的中心点
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
            regions: [
              {
                name: "南海诸岛",
                itemStyle: {
                  // 隐藏地图// 为 0 时不绘制该图形
                  normal: {opacity: this.regionsMap ? 1:0, }
                },
                // 隐藏文字
                label: {show: false},
                emphasis: {
                  show: false
                }
              }
            ],
            itemStyle: {
              areaColor: {
                image: this.$refs.mapSvg, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
              },
            }
          },
          {
            map: "mapStype",
            animation:true,
            animationDurationUpdate:0,
            geoIndex: 4,
            zoom: this.deployInfo.room,
            // center: this.deployInfo.center,//当前视角的中心点
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
            regions: [
              {
                name: "南海诸岛",
                itemStyle: {
                  // 隐藏地图// 为 0 时不绘制该图形
                  normal: {opacity: this.regionsMap ? 1:0, }
                },
                // 隐藏文字
                label: {show: false},
                emphasis: {
                  show: false
                }
              }
            ],
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
                areaColor: 'rgba(2, 41, 80, 0.3)',
                borderWidth: 1,//设置外层边框
              },
              emphasis: {
                areaColor: 'rgba(38,108,198, 0.6)'
              }
            },
            data: data
          },
          {
            tooltip: {
              show: false
            },
            type: "effectScatter",
            coordinateSystem: "geo",
            rippleEffect: {
              scale: 6,
              brushType: "stroke"
            },
            showEffectOn: "render",
            itemStyle: {
              color: "#0ff"
            },
            symbol: "circle",
            symbolSize: [10, 5],
            symbolOffset: [0, -1],
            data: data,
            zlevel: 5
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            itemStyle: {
              opacity: 1
            },
            symbolSize: [46, 62],
            symbolOffset: [0, -20],
            zlevel: 6,
            symbol:'image://' + mapIcon,
            data: data
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                color: "#fff",
                formatter: function(params) {
                  return params.data.datas;
                },
                // offset: [10, 3]
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              opacity: 1
            },
            symbol:'image://' + mapLabel,
            symbolSize: [81, 27],
            symbolOffset: [0, -60],
            zlevel: 6,
            data: data
          },
          // {
          //   type: "map",
          //   coordinateSystem: "geo",
          //   symbolSize: [0, 1],
          //   label: {
          //     normal: {
          //       show: false,
          //       color: "#fff",
          //       fontSize: "16",
          //       formatter: function(params) {
          //         return params.data.name;
          //       },
          //       offset: [0, 20]
          //     },
          //     emphasis: {
          //       show: false
          //     }
          //   },
          //   itemStyle: {
          //     color:'#0ff',
          //     opacity: 1
          //   },
          //   zlevel: 6,
          //   data: data
          // }
          // {
          //   name: 'mapSer',
          //   type: 'map',
          //   roam: false,
          //   geoIndex: 0,
          //   label: {
          //       show: false,
          //   },
          //   zlevel: 9,
          //   data: data
          // },
          // {
          //   tooltip: {
          //     show: false
          //   },
          //   type: "effectScatter",
          //   coordinateSystem: "geo",
          //   rippleEffect: {
          //     scale: 6,
          //     brushType: "stroke"
          //   },
          //   showEffectOn: "render",
          //   itemStyle: {
          //     color: "#0ff"
          //   },
          //   symbol: "circle",
          //   symbolSize: [10, 5],
          //   symbolOffset: [0, -1],
          //   data: data,
          //   zlevel: 5,
          //   // animation:true,
          //   // animationDurationUpdate:0,
          // },
          // {
          //   type: "scatter",
          //   coordinateSystem: "geo",
          //   itemStyle: {
          //     opacity: 1
          //   },
          //   symbolSize: [46, 62],
          //   symbolOffset: [0, -20],
          //   zlevel: 6,
          //   symbol:'image://' + mapIcon,
          //   data: data,
          //   animation:true,
          //   animationDurationUpdate:0,
          //   visualMap: false,
          // },
          // {
          //   type: "scatter",
          //   coordinateSystem: "geo",
          //   label: {
          //     normal: {
          //       show: true,
          //       color: "#fff",
          //       formatter: function(params) {
          //         return params.data.datas;
          //       },
          //       // offset: [10, 3]
          //     },
          //     emphasis: {
          //       show: false
          //     }
          //   },
          //   itemStyle: {
          //     opacity: 1
          //   },
          //   symbol:'image://' + mapLabel,
          //   symbolSize: [81, 27],
          //   symbolOffset: [0, -60],
          //   zlevel: 6,
          //   data: data,
          //   animation:true,
          //   animationDurationUpdate:0,
          //   visualMap: false,
          // },
          
        ]
      }
      myChart.on('click', function (params) {
        // console.log(params);
      })
      myChart.getZr().on('dblclick', (e)=> {
        console.log(e);
        let name = e.target.eventData.name
        if (name == '黑龙江省') {
          this.regionsMap = false;
          this.chinaJson = require('../../../js/HLJ.json')
          this.deployInfo.data = [
            { name: "伊春", value: [128.810254,47.761601], datas: 1 },
            { name: "哈尔滨", value: [126.52899,45.841579], datas: 1 },
            { name: "双鸭山", value: [131.165108,46.671083], datas: 1 },
          ]
          // this.deployInfo.center = [126.52899,45.841579];
          // this.deployInfo.room = 1
          myChart.dispose();
          myChart.clear(); //地图销毁函数
          // echarts.registerMap("china", this.chinaJson)
          
          this.initMap3DChina(this.chinaJson) //重新执行初始化地图的方法并传入地图数据
          // this.initMap2d(this.chinaJson) //重新执行初始化地图的方法并传入地图数据
        }else if (name == '广东省') {
          this.regionsMap = false;
          this.chinaJson = require('../../../js/GuangDong.json')
          this.deployInfo.data = [
            { name: "广州市", value: [113.269829,23.134775], datas: 1 },
            { name: "深圳市", value: [114.097708,22.684172], datas: 1 },
            { name: "韶关市", value: [113.600981,24.826239], datas: 1 },
          ]
          // this.deployInfo.center = [113.249132,23.168269];
          // this.deployInfo.room = 1
          myChart.dispose();
          myChart.clear(); //地图销毁函数
          // echarts.registerMap("china", this.chinaJson);
          
          this.initMap3DChina(this.chinaJson) //重新执行初始化地图的方法并传入地图数据
        }else{
          this.chinaJson = China;
          this.regionsMap = true;
          this.deployInfo.data = [
            { name: "黑龙江省", value: [128.540736,46.925779], datas: 3 },
            { name: "广东省", value: [113.307774,23.053927], datas: 3 },
          ]
          // this.deployInfo.center = [104.114129, 37.550339];
          // this.deployInfo.room = 1
          myChart.dispose();
          myChart.clear(); //地图销毁函数
          // echarts.registerMap("china", this.chinaJson)
          this.initMap3DChina(this.chinaJson) //重新执行初始化地图的方法并传入地图数据
        }
        
      });
      // console.log(myChart);
      this.chinaMap = myChart;
      // option && myChart.setOption(option,true);
      if (option && typeof option === 'object') {
        myChart.setOption(option,true);
      }
      window.addEventListener('resize', myChart.resize);
    },
```

