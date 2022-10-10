百度地图的marker的icon修改（1）

对百度地图进行marker的标注是做数据大屏常用的一个功能，我们项目有个要求就是点击对不同地点的通过外部事件来操作地图的marker来进行改变和添加动态效果，今天就来说下，我是怎么对marker标注点进行添加icon，还有通过其他的事件来对icon进行替换和。

一、渲染多个标注点

1、要把标注点和map实例添加到data里面

```js
//这一步就是通过外部事件操作重要操作  看下面实例
this.map = bmap
//把标注点给添加到data里面，方便我们后期通过外部事件进行操作标注点icon
//循环添加标注点的时候  添加  看下面实例
this.markerList.push(marker)
```

2、了解百度地图的JSAPI的一些用法，比如怎么获取标注点的图像对象，获取label的文本内容等等的方法，具体可以参考官网：https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_webgl_1_0.html#a3b2

![image-20211111094323639](E:\ljy\资料\img\image-20211111094323639.png)

从上面可以看到，我们可以通过`this.getLabel()`获取label的对象，然后进行操控。通过`this.setIcon(icon)`来修改marker的icon

```js
let projectList = list //返回的标注点信息
var bmap = new BMapGL.Map("allmap"); 
bmap.centerAndZoom(new BMapGL.Point(-105.672462,35.512837), value);  // 初始化地图,设置中心点坐标和地图级别(默认背景)
bmap.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
for (var i = 0; i < projectList.length; i++) {
    	//icon  是我引入项目的图片
        let myIcon = ''
        myIcon = new BMapGL.Icon(dw, new BMapGL.Size(30,30));
		var point = new BMapGL.Point(parseFloat(projectList[i].gpsX), parseFloat(projectList[i].gpsY));
        var marker = new BMapGL.Marker(point,{
          icon: myIcon
        })
        var label = new BMapGL.Label(html, { offset: new BMapGL.Size(13, -13) });
         //给label的添加样式
    label.setStyle({
            display: "none",
            color: "#fff",
            fontSize: "12px",
            fontFamily: "微软雅黑",
            backgroundColor: "rgb(11,34,44)",
            padding: "5px 10px",
            borderWidth: 1,
            borderColor: "rgb(11,34,44)",
            borderRadius: "6px",
            borderLeft:'none',
            zIndex:'-5',
            textOverflow:'ellipsis',
            overflow:'hidden',
            whiteSpace:'nowrap',
            maxWidth:'250px',
          });
        // }
        marker.setLabel(label);
        marker.customData = { 'data': projectList[i] } // 添加标点数据
    	//把标注点给添加到data里面，方便我们后期通过外部事件进行操作标注点icon
        this.markerList.push(marker)
        bmap.addOverlay(marker); // 添加标点
        marker.addEventListener("mouseover", function (e,i) {
          var label = this.getLabel()
          label.setStyle({ display: "block", whiteSpace:"normal",width:'250px'});
		
            //这是给鼠标移入的事件的时候把标注点的icon偏转；  num是数值
          //   this.setRotation(num)
            
            // MiconHover  是我引入的其他的图片，通过事件来进行修改
          let icon = new BMap.Icon(MiconHover, new BMap.Size(60,119));
          this.setIcon(icon);
          // this.setZIndex(999)
        });
        marker.addEventListener("mouseout", function (e) {
            //通过鼠标事件来修改label的样式
          var label = this.getLabel()
          label.setStyle({ display: "none",whiteSpace:"normal",width:'250px'});
          // label.setStyle({ display: "block",whiteSpace:"nowrap",maxWidth:'250px',width:0});
            
            //改变icon的样式
          let icon = new BMap.Icon(Micon, new BMap.Size(60,119));
          this.setIcon(icon);
        });
        marker.addEventListener("click", function (e) {
          // var label = this.getLabel()
          // label.setStyle({ display: "block",whiteSpace:"nowrap",maxWidth:'250px'});
            
          // let icon = new BMapGL.Icon(mapGif, new BMapGL.Size(60,119));
          // this.setIcon(icon);
        });
      }
      bmap.loadMapStyleFiles(() => {
        // 这里写样式加载完成后的回调
        that.mapMaskShow = false
      })
      bmap.setMapType(BMAP_EARTH_MAP); 
//这一步就是通过外部事件操作重要操作
      this.map = bmap
```

























