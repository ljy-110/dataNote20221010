threejs，引入glb地图模型，怎么使用tween.js让模式在缩放的同时进行模式平移

```js
您可以使用Three.js的GLTFLoader和Tween.js库加载并处理GLB模型，并创建动画效果。以下是一个示例代码片段，演示如何使用Tween.js在缩放时平移模型：

​```javascript
// 创建GLTFLoader对象来加载.glb文件
var loader = new THREE.GLTFLoader();
loader.load('model.glb', function(gltf) {
    // 获取模型中的第一个场景
    var scene = gltf.scene || gltf.scenes[0];

    // 将场景添加到三维场景中
    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.castShadow = true;
    scene.receiveShadow = true;
    camera.lookAt(scene.position);

    // 添加场景到渲染器
    renderer.render(scene, camera);

    // 创建Tween对象来执行动画
    var tween = new TWEEN.Tween({x: 0, y: 0, scale: 1})
        .to({x: 100, y: 50, scale: 0.5}, 1000)
        .onUpdate(function() {
            // 更新物体的位置和缩放比例
            scene.position.set(this.x, this.y, 0); // 模式平移
            scene.scale.set(this.scale, this.scale, this.scale); // 模式缩放
        })
        .start();

    // 设置动画循环函数
    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
        renderer.render(scene, camera);
    }
    animate();
});
​```

这个示例将GLB模型从位置 (0, 0) 移动到位置 (100, 50)，同时将其缩放为原来的一半。在 Tween 对象的 onUpdate 回调函数中，我们更新场景的位置和缩放比例，以此来实现所需的动画效果。

请注意，要使Tween.js正常工作，您需要在每帧调用TWEEN.update()函数。可以使用Three.js的render loop或requestAnimationFrame()函数来实现这一点。
```

