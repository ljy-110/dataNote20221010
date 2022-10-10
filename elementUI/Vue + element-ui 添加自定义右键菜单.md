### `Vue + element-ui` 添加自定义右键菜单

1.`<template></template>`,`contextmenu`方法

```html
<el-button size="medium" @contextmenu.prevent.native="openMenu($event)">测试右键</el-button>
<ul v-show="visibleRight" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li>上移一层</li>
      <li>下移一层</li>
</ul>
```

2.`data ==>  return`

```js
visibleRight: false,
top: 0,
left: 0
```

3.`methods`

```js
methods: {
    openMenu(e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY - 60 // fix 位置bug
      this.visibleRight = true
    },
    closeMenu() {
      this.visibleRight = false
    },
 }
```

4.`watch`

```js
visibleRight(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
```

5.css

```css
.contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
```

