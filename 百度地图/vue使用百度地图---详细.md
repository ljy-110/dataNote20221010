百度地图

```js
import bmapJSON from '../../../assets/js/custom_map_config.json'
import Micon from '../../../assets/icon/marker2.png'
import MiconHover from '../../../assets/icon/markerHover.png'
import MiconActive from '../../../assets/icon/markerActive.png'
```

```js
let that = this;
      let projectList = this.projectList
      var bmap = new BMap.Map("map");    // 创建Map实例
      var mapstyle = bmapJSON
      this.globalMap = bmap;
      if (projectList.length > 0) {
        bmap.centerAndZoom(new BMap.Point(parseFloat(projectList[0].gpsX), parseFloat(projectList[0].gpsY)), 14);
      } else {
        bmap.centerAndZoom(new BMap.Point(116.404197, 39.909982), 14);  // 初始化地图,设置中心点坐标和地图级别(默认背景)
      }
      bmap.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
      bmap.setMapStyleV2({styleJson:mapstyle});  //百度开发平台下载的地图样式json文件
      for (var i = 0; i < projectList.length; i++) { //循环创建标注点
        let myIcon = ''
        if (projectList[i].sectionState === 'SHUTDOWN') {
          myIcon = new BMap.Icon(Micon, new BMap.Size(60,119));
        } else {
          myIcon = new BMap.Icon(Micon, new BMap.Size(60,119));
        }
        var point = new BMap.Point(parseFloat(projectList[i].gpsX), parseFloat(projectList[i].gpsY));
        var marker = new BMap.Marker(point, {
          icon: myIcon
        })
        var label = new BMap.Label(projectList[i].sectionName, { offset: new BMap.Size(49, 2) });//label的样式设置
        label.setStyle({
          display: "none",
          color: "#fff",
          fontSize: "12px",
          fontFamily: "微软雅黑",
          backgroundColor: "rgb(11,34,44)",
          padding: "5px 10px",
          borderWidth: 1,
          borderColor: "rgb(0,254,212)",
          borderRadius: "6px",
          borderLeft:'none',
          zIndex:'-5'
        });

        marker.setLabel(label);
        marker.customData = { 'data': projectList[i] } // 添加标点数据
        marker.addEventListener("mouseover", function (e,i) {//鼠标移入事件
          var label = this.getLabel()
          label.setStyle({ display: "block", borderColor: "#fe8418"}); //鼠标移入显示窗口
          let icon = new BMap.Icon(MiconHover, new BMap.Size(60,119));//鼠标移入改变标注点图标
          this.setIcon(icon);
            this.setZIndex(999)//修改标注点的权重
        });
        marker.addEventListener("mouseout", function (e) {
          var label = this.getLabel()
          label.setStyle({ display: "none",borderColor: "rgb(0,254,212)"});//鼠标隐藏显示窗口
          let icon = new BMap.Icon(Micon, new BMap.Size(60,119));//鼠标移出改变标注点图标
          this.setIcon(icon);
        });
        marker.addEventListener("click", function (e) {
          console.log(e.target.customData.data)
          that.showSectionInfo(e.target.customData.data)
          let icon = new BMap.Icon(MiconActive, new BMap.Size(60,119));
          this.setIcon(icon);
          // if (that.mapType === "danger") {
          //   let info = e.pixel
          //   that.$emit('acceptSectionInfo', info, e.target.customData.data)
          // } else {
          //   let info = e.target.customData.data
          //   that.$emit('acceptSectionInfo', info)
          // }

        });
        this.markerList.push(marker)
        bmap.addOverlay(marker); // 添加标点
      }
```

