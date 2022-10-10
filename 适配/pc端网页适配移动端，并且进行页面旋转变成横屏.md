pc端网页适配移动端，并且进行页面旋转变成横屏

将页面进行整体的缩放，随屏幕进行缩放

先下载安装

```js
npm i lodash -S

//引入
import _ from 'lodash'
```

现在`app.vue`页面进行设置

```vue
<template>
  <div id="app" ref="app">
    <router-view/>
  </div>
</template>
```

然后主要是使用下面的这段代码

首先是正常的缩放

```js
this.$nextTick(() => {
      const $app = this.$refs.app
      const standardScale = 1080 / 1920

      window.addEventListener(
        'resize',
        _.debounce(function () {
          const docHeight = document.body.clientHeight
          const docWidth = document.body.clientWidth

          if (docWidth < 1680) {
            const currentScale = docHeight / docWidth
            let [scale, translate] = [0, 0]
            if (currentScale < standardScale) {
              // 以高度计算
              scale = docHeight / 1080
              const shouleWidth = 1920 * scale
              const offsetWidth = docWidth - shouleWidth
              translate = offsetWidth > 0 ? `translate(${offsetWidth / 2}px, 0)` : ''
            } else {
              // 以宽度计算
              scale = docWidth / 1920
              const shouleHeight = 1080 * scale
              const offsetHeight = docHeight - shouleHeight
              // translate = offsetHeight > 0 ? `translate(0, 0)` : ''
              translate = offsetHeight > 0 ? `translate(0,0)` : ''
            }
            // console.log(translate)
              //主要是这段代码，这个css样式
            $app.style.cssText = `
            transform: scale(${scale}) ${translate};  
            transform-origin: top left;
            min-width: 1920px;
            min-height: 1080px;
          `
          } else {
            $app.style.cssText = ''
          }
        }),
        200
      )

      if (document.createEvent) {
        var event = document.createEvent('HTMLEvents')
        event.initEvent('resize', true, true)
        window.dispatchEvent(event)
      } else if (document.createEventObject) {
        window.fireEvent('onresize')
      }
    })
```

然后还有一个就是页面缩放，但是要吧页面进行90度的旋转，将页面进行强制横屏

```js
this.$nextTick(() => {
      const $app = this.$refs.main.$el
      const standardScale = 1080 / 1920

      window.addEventListener(
        'resize',
        _.debounce(function () {
          const docHeight = document.body.clientHeight
          const docWidth = document.body.clientWidth

          if (docWidth < 1680) {
            const currentScale = docHeight / docWidth
            let [scale, translate] = [0, 0]
            if (currentScale < standardScale) {
              // 以高度计算
              // scale = docHeight / 1920
              // const offsetHeight = 1920 * scale
              // const shouleHeight = docHeight - offsetHeight
              scale = docHeight / 1080
              const shouleWidth = 1920 * scale
              const offsetWidth = docWidth - shouleWidth
              translate = offsetHeight > 0 ? `translate(0, 0)` : ''
              // translate = offsetWidth > 0 ? `translate(${offsetWidth / 2}px, 0)` : ''
            } else {
              // 以宽度计算
              // scale = docWidth / 1080
              // const offsetHeight = 1920 * scale
              // const shouleHeight = docHeight - offsetHeight
              scale = docWidth / 1080
              const shouleHeight = 1080 * scale
              const offsetHeight = docHeight - shouleHeight
              translate = offsetHeight > 0 ? `translate(1100px, 20px)` : ''
              // translate = offsetHeight > 0 ? `translate(${shouleHeight}px,20px)` : ''
            }
            // transform: scale(${scale}) ${translate};
            //scale(${scale}) translate(${docHeight}px,20px) rotate(90deg)
            $app.style.cssText = `
            transform: scale(${scale}) ${translate} rotate(90deg);
            transform-origin: left top;
            min-width: 1920px;
            min-height: 1080px;
          `
          } else {
            $app.style.cssText = ''
          }
        }),
        20
      )

      if (document.createEvent) {
        var event = document.createEvent('HTMLEvents')
        event.initEvent('resize', true, true)
        window.dispatchEvent(event)
      } else if (document.createEventObject) {
        window.fireEvent('onresize')
      }
    })
```

