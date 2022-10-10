vue跳转外部链接

```js
//这个方法会在跳转的时候再url前面添加原来的路径地址
let routeUrl = this.row.html
      window.open(routeUrl, '_blank');
 //这个只能在原来页面跳转。不会新开窗口
     window.location.href=routeUrl
```

