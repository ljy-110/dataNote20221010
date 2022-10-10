NavigationDuplicated: Avoided redundant navigation to current location: "operate“

点击跳转当前页面的路由带参数的时候报错，报错显示是路由重复

```
vue-router 报错Error: Avoided redundant navigation to current location: “/index/user
```

```js

// router文件夹-->index.js文件添加以下代码解决报错

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

或者

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


```

