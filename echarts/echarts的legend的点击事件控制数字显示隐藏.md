echarts的legend的点击事件控制数字显示隐藏

```js
myChart.off('legendselectchanged'); //解决重复触发

myChart.on('legendselectchanged', (e) => {
        if (e.selected.人员数量 && !e.selected.工程数量){
          personLineStatus = true
        }else{
          personLineStatus = false
        }
        console.log(personLineStatus);
        myChart.setOption({
          series: [
          {
            name: '工程数量',
            type: 'bar',
            barWidth: 12,
            data: sectionCount,
            itemStyle: {
              normal: {
                barBorderRadius: [2, 2, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#00ffff' },
                  { offset: 1, color: '#02a7f0' }
                ])
              },
            },
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: '#fff',
                fontSize: 16
              }
            }
          },
          {
            name: '人员数量',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'circle',
            symbolSize: 8,
            data: personCount,
            itemStyle: {
              normal: {
                color: "#f59a23",
                lineStyle: {
                  color: '#f59a23',
                  width: 1
                }
              }
            },
            label: {show: personLineStatus, //开启显示
              position: 'right', //在上方显示
              textStyle: { //数值样式
                color: '#fff',
                fontSize: 16
              }
            }
          }
        ]
        });
        // 如果不加off事件，就会叠加触发
      })
```

完整代码

```js
provinceStatisticsChart(id,province,sectionCount,personCount) {
      var myChart = echarts.init(document.getElementById(id));
      // var myChart = echarts.init(this.$refs.statisticsChart);
      myChart.off('legendselectchanged'); //解决重复触发
      let personLineStatus = false
      
      
      var option;
      option = {
        tooltip: {
          trigger: 'axis',
          // axisPointer: {
          //   type: 'cross',
          //   crossStyle: {
          //     color: '#999'
          //   }
          // }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '5%',
          top: '35%',
          containLabel: true
        },
        legend: {
          data: ['工程数量', '人员数量',],
          x: 'right',
          top: 30,
          itemWidth: 20,
          itemHeight: 8,
          textStyle: {
            color: 'rgba(223, 231, 252, 0.91)',
            fontSize: 12
          }
        },
        xAxis: [
          {
            type: 'category',
            data: province,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              // inside: true,
              color: 'rgba(223, 231, 252, 0.91)',
              interval: 0, // 坐标全部显示
              rotate: 0,// 倾斜角度
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '工程数量',
            nameTextStyle: {
              color: 'rgba(223, 231, 252, 0.91)',
              fontSize: 12
            },
            min: 0,
            minInterval: 1,
            // max: 250,
            // interval: 50,
            // axisLabel: {
            //   formatter: '{value} ml'
            // }
            splitLine: {
              show: true,
              lineStyle: {
                color: '#1c4479',
                width: 1,
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              // inside: true,
              color: 'rgba(223, 231, 252, 0.91)',
              interval: 0, // 坐标全部显示
              rotate: 0,// 倾斜角度
            },
          },
          {
            type: 'value',
            name: '人员数量',
            nameTextStyle: {
              color: 'rgba(223, 231, 252, 0.91)',
              fontSize: 12
            },
            min: 0,
            splitLine: {
              show: false,
              lineStyle: {
                color: '#1c4479',
                width: 1,
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              // inside: true,
              color: 'rgba(223, 231, 252, 0.91)',
              interval: 0, // 坐标全部显示
              rotate: 0,// 倾斜角度
            },
            // max: 25,
            // interval: 5,
            // axisLabel: {
            //   formatter: '{value} °C'
            // }
          }
        ],
        series: [
          {
            name: '工程数量',
            type: 'bar',
            barWidth: 12,
            data: sectionCount,
            itemStyle: {
              normal: {
                barBorderRadius: [2, 2, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#00ffff' },
                  { offset: 1, color: '#02a7f0' }
                ])
              },
            },
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: '#fff',
                fontSize: 16
              }
            }
          },
          {
            name: '人员数量',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'circle',
            symbolSize: 8,
            data: personCount,
            itemStyle: {
              normal: {
                color: "#f59a23",
                lineStyle: {
                  color: '#f59a23',
                  width: 1
                }
              }
            },
            label: {
              show: personLineStatus, //开启显示
              position: 'right', //在上方显示
              textStyle: { //数值样式
                color: '#fff',
                fontSize: 16
              }
            }
          }
        ]
      };
      myChart.on('legendselectchanged', (e) => {
        if (e.selected.人员数量 && !e.selected.工程数量){
          personLineStatus = true
        }else{
          personLineStatus = false
        }
        myChart.setOption({
          series: [
          {
            name: '工程数量',
            type: 'bar',
            barWidth: 12,
            data: sectionCount,
            itemStyle: {
              normal: {
                barBorderRadius: [2, 2, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#00ffff' },
                  { offset: 1, color: '#02a7f0' }
                ])
              },
            },
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: '#fff',
                fontSize: 16
              }
            }
          },
          {
            name: '人员数量',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'circle',
            symbolSize: 8,
            data: personCount,
            itemStyle: {
              normal: {
                color: "#f59a23",
                lineStyle: {
                  color: '#f59a23',
                  width: 1
                }
              }
            },
            label: {show: personLineStatus, //开启显示
              position: 'right', //在上方显示
              textStyle: { //数值样式
                color: '#fff',
                fontSize: 16
              }
            }
          }
        ]
        });
        // 如果不加off事件，就会叠加触发
      })
      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }
    },
```

