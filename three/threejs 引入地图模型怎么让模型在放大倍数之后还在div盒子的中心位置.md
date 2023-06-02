threejs 引入地图模型怎么让模型在放大倍数之后还在div盒子的中心位置

```js
当模型放大倍数之后，它将从中心点开始扩展。要确保模型始终在div盒子的中心位置，请采用以下步骤：

1. 使用Box3对象检索地图模型的边界框（bounding box）。
2. 计算模型的中心位置，并记录该值。
3. 对模型进行缩放更改时，在每个维度上都将部分缩放程度添加到模型的位置。例如，如果模型被缩放为其原始大小的两倍，则应使用模型的当前位置加上原始中心点位置与部分沿X轴缩放的增量，以确定模型的新位置。

这是一个示例代码片段来实现上述步骤：

​```javascript
// 将初始比例设置为1
var scale = 1;

// 创建GLTFLoader对象来加载.glb文件
var loader = new THREE.GLTFLoader();
loader.load('model.glb', function(gltf) {
    // 获取模型中的第一个场景
    var scene = gltf.scene || gltf.scenes[0];

    // 将场景添加到三维场景中
    scene.scale.set(scale, scale, scale);
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.castShadow = true;
    scene.receiveShadow = true;

    // 获取模型边界框
    var box = new THREE.Box3().setFromObject(scene);

    // 计算模型的中心位置
    var center = box.getCenter(new THREE.Vector3());

    // 记录中心位置
    var originalCenter = center.clone();

    // 将起始比例设置为1时的中心点记录下来
    var originalPosition = scene.position.clone();

    // 将场景添加到渲染器
    camera.lookAt(scene.position);
    renderer.render(scene, camera);

    // 设置动画循环函数
    function animate() {
        requestAnimationFrame(animate);

        // 根据需要对比例进行更改
        if(needsScaleChange()){
            scale += 0.1; // 或任何您需要更改的量
            scene.scale.set(scale, scale, scale);

            // 更改模型的位置以使其仍保持在div盒子中央
            var newCenter = originalCenter.clone().multiplyScalar(scale);
            var delta = new THREE.Vector3().subVectors(originalPosition, newCenter);
            scene.position.copy(delta);
        }

        renderer.render(scene, camera);
    }
    animate();
});

function needsScaleChange(){
  // 检索是否需要对模型进行缩放操作。例如，如果按下了“+”或“-”按钮，则返回true。
}
​```

在示例代码片段中，我们首先将初始比例设置为1，并使用Box3对象来检索地图模型的边界框，然后计算模型的中心位置，并记录该值和初始位置记录。

在Animate() 函数中，我们加入一个用于检测修改比例并重新定位模型的代码块。当满足一些恰当的条件（如点击“+”或“-”按钮）时，我们将scale属性增加（或减少），并计算出新的中心点位置和相应的位移，同时将其赋值给模型。这样，即可实现放大/缩小地图时的中心定位。

请注意，在窗口大小调整时需要重置originalCenter 和 originalPosition变量，并更新模型的位置。
```

