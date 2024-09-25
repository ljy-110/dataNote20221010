echarts的饼图，外圈旋转，中心添加图标，阴影加入

![image-20230328113505466](D:\LJY\code\dataNote20221010\img\image-20230328113505466.png)

通过css添加背景图片，然后动画来进行旋转

```js
<div class="flex1 center" >
    <div class="person-charts pie-charts-bg" ref="personEcharts"></div>
</div>
```

```css
// 饼图背景
.pie-charts-bg{
  position: relative;
}
.pie-charts-bg::before{
  background: url('../image/box/per-bg.png') no-repeat center center;
  background-size: 100% 100%;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  // z-index: -1;
  -webkit-transform: rotate(360deg);
  animation: rotation 3s linear infinite;
  -moz-animation: rotation 3s linear infinite;
  -webkit-animation: rotation 3s linear infinite;
  -o-animation: rotation 3s linear infinite;
}
@keyframes rotation{
  from {-webkit-transform: rotate(0deg);}
  to {-webkit-transform: rotate(360deg);}
}
```

生成图表

```js
var that = this;
      var myChart = echarts.init(this.$refs['personEcharts']);
      var option = {
        graphic: {//图形中间图片
          elements: [{
            type: "image",
            style: {
              image: require('../../../assets/image/worker.png'),//你的图片地址
              width: 47,
              height: 55,
            },
            left: "center",
            top: "center",
          }],
        },
        tooltip: {
          trigger: 'item',
        },
        grid: {
          containLabel:true
        },
        color:this.colorList,
        series: [
          {
            type: 'pie',
            radius: ['70%', '80%'],
            center:['50%','50%'],
            minAngle: 0,
            startAngle: 180, // 渐变角度
            avoidLabelOverlap: true,   //是否启用防止标签重叠
            label:{
              show:false
            },
            data: data,
            zlevel:2,
            // animationType:'transition',
            animation:false,
            
          },
          {
            radius: ['60%', '70%'],
            center:['50%','50%'],
            type: 'pie',
            minAngle: 0,
            startAngle: 180, // 渐变角度
            avoidLabelOverlap: true,   //是否启用防止标签重叠
            label: {
              normal: {show: false},
              emphasis: {show: false}
            },
            labelLine: {
              normal: {show: false},
              emphasis: {show: false}
            },
            animation: false,
            tooltip: {
              show: false
            },
            itemStyle: {
              opacity: 0.5,
            },
            data: data,
            zlevel:1,
          }
        ]
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true)
      }
      window.addEventListener('resize', myChart.resize);
```

