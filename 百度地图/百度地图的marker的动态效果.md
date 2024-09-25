百度地图的marker的动态效果--外部事件控制

上一篇写了批量渲染百度地图的marker标注点的文章，现在我们来说下，如何通过外部的事件来操作百度地图的marker的修改icon和给多个标注点中的某一个添加动态效果，如图

1、先创建一个map实例

```js
var bmap = new BMapGL.Map("allmap"); 
        bmap.centerAndZoom(new BMapGL.Point(-105.672462,35.512837), value);  // 初始化地图,设置中心点坐标和地图级别(默认背景)
      bmap.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
      for (var i = 0; i < projectList.length; i++) {
        let myIcon = new BMapGL.Icon(dw2, new BMapGL.Size(30,30));
        var point = new BMapGL.Point(110, 12);
        var marker = new BMapGL.Marker(point,{
          icon: myIcon
        })
        var label = new BMapGL.Label(html, { offset: new BMapGL.Size(13, -13) });
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
        marker.setLabel(label);
        marker.customData = { 'data': projectList[i] } // 添加标点数据
          
          //把标注点添加到data里面，方便在外部的事件里面去操作
        this.markerList.push(marker)
        bmap.addOverlay(marker); // 添加标点
      } 
      bmap.setMapType(BMAP_EARTH_MAP); 
//这是为了把实例对象添加到data里面，这种重要的步骤
      this.map = bmap
```

2、外部事件来进行操控

我们先来简单的讲说下具体的实现和操作的逻辑，因为上面实例话map的时候，我们把marker和map给添加到了data里面，所以我们可以直接使用了map地图里面的数据和属性，所以就可以使用`setIcon()`方法拿到了当前坐标的icon，然后就可以进行操作和修改，如下

修改icon

```js
let icon = new BMapGL.Icon(mapGif, new BMapGL.Size(30,60));
that.markerList[index].setIcon(icon);
```

修改label的div来进行添加动态效果，如图我们发现地图渲染的盒子的class名称来进行操做

![image-20211111142335461](D:\LJY\code\dataNote20221010\img\image-20211111142335461.png)

然后在我们获取到的marker的列表数据里面可以看到，是可以拿到该标注点的className

![image-20211111142756390](D:\LJY\code\dataNote20221010\img\image-20211111142756390.png)

然后我们就可以给这个盒子添加一个class动态样式，然后给这个盒子添加动态效果，所以

```js
that.markerList[index].domElement.className = item.domElement.className + ' mapBG'

//直接添加一个mapBG的动态样式

.mapBG{  
    height:30px;  
    width:30px;  
    border-radius: 25px;  
    background: rgba(250, 0, 0);  
    transform: scale(0);  
    animation: myfirst 2s;  
    animation-iteration-count: infinite; 
}  
@keyframes myfirst{  
    to{  
        transform: scale(2);  
        background: rgba(0, 0, 0, 0);  
    }  
}  
```

可以看到，已经成功添加了这个class，也可以实现到给某个标注点添加动态效果

![image-20211111142638278](D:\LJY\code\dataNote20221010\img\image-20211111142638278.png)

![8](D:\LJY\code\dataNote20221010\img\8.gif)

修改label的样式

```js
var label = that.markerList[index].getLabel()
label.setStyle({ display: "block", whiteSpace:"normal",width:'250px'});
```

以上就是基本的要点，下面是完整的代码例子

```js
getProjectId(i){
      let that = this
      this.projectStatus = i.sectionId
      this.mapInput = i.sectionName
      console.log(that.map);
      let markerList = that.markerList
      markerList.forEach((item,index) =>{
          //这个if判断是为了找到自己想要修改的marker里面里对应的marker标注点的icon
          if (i.sectionId === item.customData.data.sectionId) {
              
            // let icon = new BMapGL.Icon(mapGif, new BMapGL.Size(30,60));
            var label = that.markerList[index].getLabel()
            // that.markerList[index].setIcon(icon);
            label.setStyle({ display: "block", whiteSpace:"normal",width:'250px'});
            that.markerList[index].domElement.className = item.domElement.className + ' mapBG'
 
          }else{
              //这是给其他icon不变或者变回原来的样子
            let myIcon = new BMapGL.Icon(dw2, new BMapGL.Size(30,30));
            that.markerList[index].setIcon(myIcon);
            let className = item.domElement.className
            if (className.indexOf("mapBG") != -1) {
              className = className.replace('mapBG', '')
              that.markerList[index].domElement.className = className
            } else {
              that.markerList[index].domElement.className = className
            }
      })
      this.$nextTick(()=>{
        setTimeout(function(){
          that.map.centerAndZoom(new BMapGL.Point(i.gpsX, i.gpsY), 13);
          // that.map.addOverlay(that.markerList)
        },20);
      })
    },
```















