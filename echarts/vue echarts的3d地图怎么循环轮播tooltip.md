vue echarts的3d地图怎么循环轮播tooltip

```js
要使用Vue Echarts的3D地图，在循环轮播tooltip时，可以通过配置option中的`series`属性和`animation`属性。具体地，我们需要设置`series`中的`label`属性和`emphasis`属性的`show`值为`true`，并在`animation`中添加一个回调函数，来实现轮询切换。示例代码如下：

​```javascript
<template>
  <div ref="chart" style="height: 500px;"></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-gl'

export default {
  mounted() {
    const chart = echarts.init(this.$refs.chart)

    // 构造假数据
    const data = [
      { name: '北京', value: Math.random() * 100 },
      { name: '天津', value: Math.random() * 100 },
      { name: '上海', value: Math.random() * 100 },
      { name: '重庆', value: Math.random() * 100 },
      { name: '河北', value: Math.random() * 100 },
      { name: '山西', value: Math.random() * 100 },
      { name: '辽宁', value: Math.random() * 100 },
      { name: '吉林', value: Math.random() * 100 },
      { name: '黑龙江', value: Math.random() * 100 },
      { name: '江苏', value: Math.random() * 100 },
      { name: '浙江', value: Math.random() * 100 },
      { name: '安徽', value: Math.random() * 100 },
      { name: '福建', value: Math.random() * 100 },
      { name: '江西', value: Math.random() * 100 },
      { name: '山东', value: Math.random() * 100 },
      { name: '河南', value: Math.random() * 100 },
      { name: '湖北', value: Math.random() * 100 },
      { name: '湖南', value: Math.random() * 100 },
      { name: '广东', value: Math.random() * 100 },
      { name: '海南', value: Math.random() * 100 },
      { name: '四川', value: Math.random() * 100 },
      { name: '贵州', value: Math.random() * 100 },
      { name: '云南', value: Math.random() * 100 },
      { name: '陕西', value: Math.random() * 100 },
      { name: '甘肃', value: Math.random() * 100 },
      { name: '青海', value: Math.random() * 100 },
      { name: '内蒙古', value: Math.random() * 100 },
      { name: '广西', value: Math.random() * 100 },
      { name: '西藏', value: Math.random() * 100 },
      { name: '宁夏', value: Math.random() * 100 },
      { name: '新疆', value: Math.random() * 100 },
      { name: '台湾', value: Math.random() * 100 },
      { name: '香港', value: Math.random() * 100 },
      { name: '澳门', value: Math.random() * 100 }
    ]

    // 创建option配置
    const option = {
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: 'rgba(50,50,50,0.7)',
        textStyle: {
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 12,
          color: '#fff',
          fontStyle: 'normal',
          fontWeight: 'normal'
        }
      },
      globe: {
        baseTexture: './globe/world.topo.bathy.200401.jpg',
        heightTexture: './globe/bathymetry_bw_composite_4k.jpg',
        displacementScale: 0.1,
        shading: 'realistic',
        environment: './globe/starfield.jpg',
        light: {
          ambient: {
            intensity: 0.1
          },
          main: {
            intensity: 1.5
          }
        },
        viewControl: {
          autoRotate: false,
          distance: 150
        },
        postEffect: {
          enable: true,
          depthOfField: {
            focalRange: 10
          }
        },
        layers: [{
          type: 'bar3D',
          coordinateSystem: 'globe',
          barSize: 0.6,
          bevelSize: 0.05,
          data: data.map(item => [item.name, item.value]),
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              position: 'insideTop',
              formatter: '{b}\n{c}'
            }
          },
          itemStyle: {
            color: '#029ed9',
            opacity: 0.8
          }
        }]
      },
      animation: {
        duration: 2000,
        loop: true, // 开启循环播放
        easing: 'cubicInOut',
        // 回调函数，每次动画结束后会执行一次
        onFrame(idx) {
          // 获取series中的所有标签元素
          const elements = chart.getDom().querySelectorAll('.geo3d > canvas + div')

          // 循环遍历每个标签元素，并设置其样式
          for (let i = 0; i < elements.length; i++) {
            if (i === idx % elements.length) {
              elements[i].style.display = 'block'
            } else {
              elements[i].style.display = 'none'
            }
          }
          chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: idx % data.length
          })
        }
      },

    }

    // 将配置注入到chart中，渲染图表
    chart.setOption(option)
  }
}
</script>
​```

在示例代码中，我们通过`emphasis`属性给每个柱形添加了一个内置标签。然后，在`animation`中通过循环遍历获取所有的标签元素，并根据当前的帧数设置它们的display值。同时，将帧数对数据总长度取模后，使用dispatchAction()方法发送'action'事件高亮轮播到的对应项。

需要注意的是，轮询切换时，最好将每个标签元素的display值从默认的'none'切换为'block'，而不是从'inline-block'或其他值。因为默认情况下，第一次渲染时每个标签元素的display值可能不是'inline-block'，如果在这个基础上进行toggle操作，可能会产生意想不到的效果
```

