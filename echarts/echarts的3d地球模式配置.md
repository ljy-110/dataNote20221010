地球配置

```js
        buildOption() {
            let style = this.attrs.style
            this.option = {
                backgroundColor: style.backgroundColor,
                globe: {
                    // show: false,
                    globeRadius: style.globeRadius, // 地球的半径
                    globeOuterRadius: style.globeOuterRadius, // 地球的外半径
                    baseTexture: style.heightTextureSrcEnable ? (style.heightTextureSrc ? this.heightTextureSrc : require("../zImage/gl/world.topo.bathy.200401.jpg")) : '',  //  背景图  地球的纹理
                    heightTexture: style.heightTextureSrcEnable ? (style.heightTextureSrc ? this.heightTextureSrc : require("../zImage/gl/world.topo.bathy.200401.jpg")) : '', // 背景图凹凸贴图  地球的高度纹理
                    displacementScale: style.displacementScale, // 地球顶点位移的大小
                    displacementQuality: style.displacementQuality, //地球顶点位移的质量。支持设置成 'low', 'medium', 'high', 'ultra'
                    shading: style.shading, //地球中三维图形的着色效果  color  lambert  realistic
                    environment: style.environmentEnable ? (style.environmentSrc ? this.environmentSrc : require("../zImage/gl/Milkyway/Milkyway_BG.jpg")) : '', // 环境贴图
                    realisticMaterial: {
                        roughness: style.realisticMaterialRoughness, // 粗糙度
                    },
                    // 后处理特效的相关配置
                    postEffect: {
                        enable: style.postEffectEnable, // 是否开启后处理特效
                        // 高光特效
                        bloom: {
                            enable: style.postEffectBloomEnable,
                            bloomIntensity: style.postEffectBloomBloomIntensity,
                        },
                        // 景深效果
                        depthOfField: {
                            enable: style.depthOfFieldEnable,
                            focalDistance: style.depthOfFieldFocalDistance, // 初始的焦距
                            focalRange: style.depthOfFieldFocalRange, //完全聚焦的区域范围
                            fstop: style.depthOfFstop,  //镜头的F值，值越小景深越浅。
                            blurRadius: style.depthOfBlurRadius,  // 模糊半径
                        },
                        SSAO: {
                            enable: style.SSAOEnable,
                            quality: style.SSAOQuality, // 环境光遮蔽的质量
                            radius: style.SSAORadius, // 采样半径
                            intensity: style.SSAOIntensity, // 环境光遮蔽的强度  值越大颜色越深
                        }
                    },
                    // 光照相关的设置  shading 为 'color' 的时候无效
                    light: {
                        // 主光源
                        main: {
                            color: style.lightMainColor, // 主光源的颜色
                            intensity: style.lightMainIntensity, // 主光源的强度
                            shadow: style.lightMainShadow, // 主光源是否投射阴影
                            shadowQuality: style.lightMainShadowQuality, // 阴影质量
 
                        },
                        ambient: {
                            color: style.lightAmbientColor,// 环境光的颜色
                            intensity: style.lightAmbientIntensity, // 环境光的强度
                        },
                    },
                    // 地球外部大气层相关设置
                    atmosphere: {
                        show: style.atmosphereShow, // 是否显示外部大气层
                        color: style.atmosphereColor,
                        glowPower: style.atmosphereGlowPower, // 外部大气层发光功率
                        innerGlowPower: style.atmosphereInnerGlowPower, // 外部大气层内发光功率
                    },
                    // 鼠标的旋转，缩放等视角控制
                    viewControl: {
                        projection: style.viewControlProjection, // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'
                        autoRotate: style.viewControlAutoRotate, // 是否开启视角绕物体的自动旋转查看。
                        autoRotateDirection: style.viewControlAutoRotateDirection, // 物体自转的方向 'cw'顺时针方向 'ccw'逆时针方向
                        autoRotateSpeed: style.viewControlAutoRotateSpeed, // 物体自转的速度  单位为角度 / 秒，默认为10 ，也就是36秒转一圈
                        autoRotateAfterStill: style.viewControlAutoRotateAfterStill, // 在鼠标静止操作后恢复自动旋转的时间间隔
                        zoomSensitivity: style.viewControlZoomSensitivity, // 鼠标灵敏度
                        distance: style.viewControlDistance, // 默认视角距离主体的距离
                        minDistance: style.viewControlMinDistance, // 鼠标控制能拉近到主体的最小距离
                        maxDistance: style.viewControlMaxDistance, // 鼠标控制能拉远到主体的最大距离
                    },
                },
                series: [
                    {
                        type: 'lines3D',
                        coordinateSystem: 'globe',
                        blendMode: style.blendMode,  // 'lighter'是叠加模式  'source-over'是通过 alpha 混合
                        // 飞线尾迹特效
                        effect: {
                            show: style.effectShow,
                            period: style.effectPeriod, // 尾迹周期 
                            constantSpeed: style.effectConstantSpeed, // 轨迹特效的移动动画是否是固定速度
                            trailWidth: style.effectTrailWidth, //尾迹的宽度。
                            trailLength: style.effectTrailLength, // 尾迹的长度，范围从 0 到 1，为线条长度的百分比
                            trailColor: style.effectTrailColor,  //尾迹的颜色
                            trailOpacity: style.effectTrailOpacity, // 尾迹的不透明度
                            // symbol: 'path://"M61.3,2c6.2,0,12.1,1.1,17.5,3.4C84.3,7.7,89,10.8,93,14.6c4.1,4,7.3,8.6,9.7,13.8c2.4,5.2,3.5,10.9,3.5,16.9c0,8.1-2.4,16.9-7.1,26.4c-4.7,9.4-9.9,18.2-15.5,26.2c-5.6,8-13.1,17.4-22.4,28.1c-9.3-10.7-16.8-20-22.4-28.1c-5.6-8-10.8-16.8-15.5-26.2c-4.7-9.4-7.1-18.2-7.1-26.4c0-6,1.2-11.6,3.5-16.9c2.4-5.2,5.6-9.8,9.7-13.8c4-3.9,8.8-7,14.2-9.2C49.2,3.1,55,2,61.3,2L61.3,2z"',
                            symbol: "arrow", //箭头图标
                            symbolSize: 10, //图标大小
                        },
                        lineStyle: {
                            width: style.lineStyleWidth,
                            color: style.lineStyleColor,
                            opacity: style.lineStyleOpacity,// 线条的不透明度
                        },
                        data: [
              [
                [-75.440806, 40.652083],
                [80.943139, 35.214],
              ],
              [
                [86.02, 37.77],
                [-109.09, 41.82],
              ],
              [
                [90.24, 35.23],
                [-61.63, -21.06],
              ],
              [
                [113.62, 25.23],
                [91.82, 36.79],
              ],
              [
                [112.57, 25.39],
                [149.66, -29.17],
              ],
              [
                [24.5, -18.41],
                [113.97, 32.01],
              ],
              [
                [-9.43, 15.18],
                [-66.2, 1.48],
              ],
            ],
                    },
                ],
            };
 
        },
```

