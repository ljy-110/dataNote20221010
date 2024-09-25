固定的横向

![bar-y-category](D:\LJY\code\dataNote20221010\img\bar-y-category.png)

```js
option = {
  title: {
    text: 'World Population'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  dataZoom: [
    {
      type: 'slider',
      maxValueSpan: 5, // 显示数据的条数(默认显示10个)
      show: true,
      zoomLock: false,
      startvalue: 0,
      width: 10,
      yAxisIndex: [0],
      // height: '10',
      left: '97%', // 滑动条位置
      start: 100, // 默认为0
      end: 90, // 默认为100
      orient: 'vertical',
      filterMode: 'empty',
      fillerColor: 'rgba(27,90,169,1)',
      borderColor: 'transparent',
      handleSize: '100%',
      handleStyle: {
        color: 'rgba(27,90,169,1)',
        borderWidth: 0
      },
      backgroundColor: 'rgba(37, 46, 100, 0.8)', // 两边未选中的滑动条区域的颜色
      showDataShadow: false, // 是否显示数据阴影 默认auto
      showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
      // filterMode: 'filter',
      brushSelect: false
    },
    {
      type: 'inside', // 内置滑动，随鼠标滚轮展示
      yAxisIndex: [0],
      start: 1, // 初始化时，滑动条宽度开始标度
      end: 100, // 初始化时，滑动条宽度结束标度
      zoomOnMouseWheel: false, // 如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。。
      moveOnMouseMove: true,
      moveOnMouseWheel: true // 鼠标滚轮实现移动
    }
  ],
  grid: {
    left: '3%',
    right: '15%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: [{
    type: 'category',
    data: [
      'Brazil',
      'Indonesia',
      'USA',
      'India',
      'China',
      'World',
      '天津市',
      '河北省',
      '山西省',
      '上海市',
      '江苏省',
      '浙江省',
      '安徽省',
      '福建省',
      '江西省',
      '山东省',
      '河南省',
      '湖北省',
      '湖南省',
      '广东省',
      '广西壮族自治区',
      '海南省',
      '重庆市',
      '云南省',
      '陕西省',
      '甘肃省',
      '新疆维吾尔自治区'
    ]
  },
  {
    type: 'category',
    position:['15%','15%'],
    offset:20,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      inside: false,
      textStyle: {
        color: '#b3ccf8',
        fontSize: '14',
        fontFamily: 'PingFangSC-Regular',
        marginLeft:15,
      },
      formatter: function (val) {
        console.log(val)
        return `1555/67/75`
      }
    },
    splitArea: {
      show: false
    },
    splitLine: {
      show: false
    },
    data:[18, 9, 34, 10,],
  }
  ],
  series: [
    {
      name:'2011',
      type: 'bar',
      barWidth:'15',
      data: [
        18, 9, 34, 10, 44, 30, 4, 11, 28, 17, 15, 11, 36, 44, 10, 0, 5, 15, 30,
        30, 48, 0, 3, 45, 65, 5, 6
      ],
      color: ['#7EB3FF'],
      itemStyle: {
        normal: {
          label: {
            show: false,
            formatter: function (params, b, callback) {
              // return params.dataIndex + '---' + params.data
              return `{people|${params.dataIndex}} + '---' + {percentage|${params.data}}`
            },
            rich: {
              people: {
                color: 'white'
              },
              percentage: {
                color: 'red',
                width: 1
              }
            },
            // position: 'insideBottomRight',
            // distance: -1,
            // offset:[700,45],
            // position: ['100%','100%'],
            textStyle: {
              color: '#7EB3FF',
              fontSize: 14,
              fontWeight: 'bold',
            }
          },
          
        }
      }
    },
    {
      name: '2012',
      type: 'bar',
      barWidth:'15',
      data: [
        19, 2, 3, 12, 13, 6, 8, 9, 3, 5, 6, 2, 9, 6, 1, 2, 1, 40, 7, 25, 7, 1,
        1, 4, 3, 1, 3
      ],
      color: ['#FFFFFF']
    }
  ]
};

```

不固定的

![image-20230106142135979](D:\LJY\code\dataNote20221010\img\image-20230106142135979.png)

```js
option = {
        grid: {
          left: '3%',
          right: '30%',
          bottom: '3%',
          top:'2%',
          containLabel: true
        },
        dataZoom: [
          {
            type: 'slider',
            minValueSpan: 5, // 显示数据的条数(默认显示10个)
            show: true,
            zoomLock: false,
            startvalue: 0,
            width: 10,
            yAxisIndex: [0],
            // height: '10',
            left: '97%', // 滑动条位置
            start: 100, // 默认为0
            end: 90, // 默认为100
            orient: 'vertical',
            filterMode: 'empty',
            fillerColor: 'rgba(89, 135, 164, 0.5)',
            borderColor: 'transparent',
            handleSize: '100%',
            handleStyle: {
              color: 'rgba(89, 135, 164, 0.1)',
              borderWidth: 0
            },
            backgroundColor: 'rgba(89, 135, 164, 0.1)', // 两边未选中的滑动条区域的颜色
            showDataShadow: 'auto', // 是否显示数据阴影 默认auto
            showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
            // filterMode: 'filter',
            brushSelect: false,
          },
          {
            type: 'inside', // 内置滑动，随鼠标滚轮展示
            yAxisIndex: [0],
            start: 1, // 初始化时，滑动条宽度开始标度
            end: 100, // 初始化时，滑动条宽度结束标度
            zoomOnMouseWheel: false, // 如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。。
            moveOnMouseMove: true,
            moveOnMouseWheel: true // 鼠标滚轮实现移动
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        xAxis: {
          // data: firm,
          axisLabel: {
            color: '#DEEEFF',
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(102, 242, 255, 0.16)',
              width: 1,
            }
          }
        },
        yAxis: [{
          type: 'category',
          data: firm,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#DEEEFF',
          },
        },
        ],

        series: [
          {
            name: '管理人员',
            type: 'bar',
            stack: 'manage',
            barWidth: 12,
            color: ['#7EB3FF'],
            data: manageCount,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(3, 134, 226, 0.2)',
            },
            legendHoverLink: false,
            silent: true,
            z: 1,
            animationEasing: "elasticOut",
          },
          {
            type: 'pictorialBar',
            stack: 'manage',
            symbol: "rect",
            symbolBoundingData: 500,
            barWidth: 12,
            data: numLabel,
            dataNumLabel: manageCount,
            color: ['rgba(3, 134, 226, 0.2)'],
            itemStyle: {
                normal: {
                  color: "none",
                }
            },
            label: {
                normal: {
                	formatter: (params) => {
                		var text = '{a|'+(this.SubCompany[params.dataIndex].manager+this.SubCompany[params.dataIndex].labour)+'}'+
                    '{f|/'+ this.SubCompany[params.dataIndex].labour+'}'+'{b|/'+this.SubCompany[params.dataIndex].manager + '}'
                    return text;
                  },
                  align: 'right',
                  rich:{
                    a: {color: '#43F9FF',fontSize: 16,
                    fontWeight: 'bold'},
                    b: {color: '#7EB3FF',fontSize: 16,
                    fontWeight: 'bold'},
                    f:{color:"#ffffff",fontSize: 16,
                    fontWeight: 'bold'}
                  },
                  position: 'right',
                  distance: 110, // 向右偏移位置
                  show: true,
                }
            },
            z: 0,
            animationEasing: "elasticOut"
          },
          {
            name: '劳务人员',
            type: 'bar',
            barWidth: 12,
            data: laborCount,
            color: ['#FFFFFF'],
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(3, 134, 226, 0.2)'
            },
          },
        ]
      };
```

