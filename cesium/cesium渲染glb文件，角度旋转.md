cesium渲染glb模型文件，角度旋转

初始化

```js
tileset = null
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
viewer = new Cesium.Viewer("Model", {
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false, // 影像切换
    animation: false, // 是否显示动画控件
    infoBox: false, // 是否显示点击要素之后显示的信息
    selectionIndicator: false, // 要素选中框
    geocoder: false, // 是否显示地名查找控件
    timeline: false, // 是否显示时间线控件
    fullscreenButton: false,
    shouldAnimate: false,
    navigationHelpButton: false, // 是否显示帮助信息控件
});
// 隐藏版权
viewer._cesiumWidget._creditContainer.style.display = "none";
```

渲染glb模型

```js
let modelUrl = `/fly.glb`;
// 创建一个Entity
let entity = new Cesium.Entity({
      id: '1',
      name: 'glb',
      // modelMatrix:  Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees([item.lon, item.lat])),
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude,height), // 设置模型的位置  
      model: {  
        uri: modelUrl,  
        scale: 1,
      },
});
// this.showLabel(item);
// 将Entity添加到Cesium Viewer的entities集合中 
viewer.entities.add(entity); 
```

角度旋转

```js
let heading = Cesium.Math.toRadians(35)
let hpr = new Cesium.HeadingPitchRoll(heading, Cesium.Math.toRadians(0), Cesium.Math.toRadians(0))
let orientation = Cesium.Transforms.headingPitchRollQuaternion(entity.position.getValue(), hpr)
entity.orientation = orientation
```

