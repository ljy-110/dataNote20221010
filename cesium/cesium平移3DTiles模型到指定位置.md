cesium平移3Dtiles模型到指定坐标点

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



渲染3dtiles模型

```js

let tilesetUrl = '/model/tileset.json'
let property = {
      skipLevelOfDetail : true,
      maximumScreenSpaceError: 16,
      cullWithChildrenBounds : true,
      baseScreenSpaceError: 100, // 基本屏幕错误阈值
      skipScreenSpaceErrorFactor: 16, // 跳过屏幕错误因子
      skipLevels: 3, // 跳过的层数
      immediatelyLoadDesiredLevelOfDetail: false, // 是否立即加载所需的细节级别
      loadSiblings: false, // 是否加载同级别的其他3DTiles
}
tileset = await Cesium.Cesium3DTileset.fromUrl(tilesetUrl,property);
// 加载完成的回调
// tileset.allTilesLoaded.addEventListener(function() {
//     console.log('All tiles are loaded');
// });
viewer.scene.primitives.add(tileset);
//加载完成后缩放到模型位置
viewer.zoomTo(tileset);
tileset.modelMatrix = this.countMoveModel(111.82286,21.58929,0) // -----重点
```

计算位置

```js
countMoveModel(longitude,latitude,height) {
    //计算世界坐标系中的目标位置offset
    var cartographic = new Cesium.Cartographic.fromCartesian(
      tileset.boundingSphere.center
    );
    var offset = Cesium.Cartesian3.fromDegrees(longitude,latitude,cartographic.height+height);

    //将模型位移至地心
    const origin = tileset.boundingSphere.center;
    const originMatrix = tileset.modelMatrix;//模型的初始变换矩阵
    const backToEarthCenter = new Cesium.Cartesian3(-origin.x,-origin.y,-origin.z);//初始位置到地心的位移向量
    let backToEarthCenterMatrix = Cesium.Matrix4.fromTranslation(backToEarthCenter);//初始位置到地心的变换矩阵
    Cesium.Matrix4.multiply(backToEarthCenterMatrix, originMatrix, backToEarthCenterMatrix);//移动模型到地心的矩阵

    // 旋转模型使得Z轴与世界坐标Z轴重合
    let arrowX = new Cesium.Cartesian3(1, 0, 0);
    let arrowZ = new Cesium.Cartesian3(0, 0, 1);
    let angleToXZ = Cesium.Cartesian3.angleBetween(arrowX, new Cesium.Cartesian3(origin.x, origin.y, 0));//局部Z轴在世界坐标系XY平面上投影到X轴角度，即绕Z顺时针旋转这个角度可以到XZ平面上
    let angleToZ = Cesium.Cartesian3.angleBetween(origin, arrowZ);//然后绕Y轴顺时针旋转此角度可使得Z轴与世界坐标系Z轴重合
    const rotationAngleToXZ = Cesium.Matrix3.fromRotationZ((origin.y>0?-1:+1)*angleToXZ);//绕Z轴旋转的Matrix3矩阵，正角度逆时针旋转
    const rotationAngleToZ = Cesium.Matrix3.fromRotationY(-angleToZ);//绕Y轴旋转的Matrix3矩阵，负角度顺时针旋转
    let rotationAngleToZMatrix = Cesium.Matrix3.multiply(rotationAngleToZ, rotationAngleToXZ, new Cesium.Matrix3);//连续旋转的Matrix3矩阵，即先绕Z轴旋转，后绕Y旋转的矩阵。
    rotationAngleToZMatrix = Cesium.Matrix4.fromRotationTranslation(rotationAngleToZMatrix);//连续旋转的Matrix4矩阵
    Cesium.Matrix4.multiply(rotationAngleToZMatrix, backToEarthCenterMatrix, rotationAngleToZMatrix);//将移动至地心模型，旋转至Z轴重合的矩阵

    // 旋转模型使得X，Y轴与世界坐标X，Y轴重合
    const rotationZ = Cesium.Matrix3.fromRotationZ(-Math.PI/2); // 绕Z轴旋转90°的Matrix3变换矩阵
    let rotationMatrix = Cesium.Matrix4.fromRotationTranslation(rotationZ); // 绕Z轴旋转90°的Matrix4变换矩阵
    Cesium.Matrix4.multiply(rotationMatrix, rotationAngleToZMatrix, rotationMatrix);//将移动至地心模型的物体坐标系，旋转到与世界坐标系重合的矩阵

    //在地心位置，旋转物体坐标系和世界坐标系重合的模型，使得与目标坐标系重合
    const offsetToWorldMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(offset);//获取到以目标位置为原点,的eastNorthUp局部坐标系的变换矩阵
    const backToEarthCenterOffset = new Cesium.Cartesian3(-offset.x, -offset.y, -offset.z);//目标位置到地心的位移向量
    let backToEarthCenterMatrixOffset = Cesium.Matrix4.fromTranslation(backToEarthCenterOffset);//目标位置到地心的变换矩阵
    Cesium.Matrix4.multiply(backToEarthCenterMatrixOffset, offsetToWorldMatrix, backToEarthCenterMatrixOffset);//获得从世界坐标系旋转至目标坐标系的旋转矩阵（只有旋转，没有位移）
    Cesium.Matrix4.multiply(backToEarthCenterMatrixOffset, rotationMatrix, backToEarthCenterMatrixOffset);//将移动至地心模型的物体坐标系，旋转到与目标坐标系重合的矩阵（完成模型的最终旋转，没有位移）

    //移动到目标位置
    const backToOriginMatrix = Cesium.Matrix4.fromTranslation(offset);//地心到目标位置位移向量
    const lastMatrix = Cesium.Matrix4.multiply(backToOriginMatrix,backToEarthCenterMatrixOffset,new Cesium.Matrix4());//最终矩阵，即将地心位置的模型移动到目标位置（完成模型的最终旋转，最终位移）
    // console.log('最终变换矩阵',lastMatrix);
    return lastMatrix //返回最终变换矩阵
},
```

