vue限制不登录，通过url进入其他页面强制回到登录页面;已经登录了，不可以再进入登录界面

先在router下的index.js添加 `meta:{requireAuth:true}`，如下

```js
{
  path: '/data',
  name: 'data',
  component: data,
  meta:{requireAuth:true}
},
```

然后在main.js添加如下代码

```js
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if(localStorage.getItem('userInfo')){ //判断本地是否存在access_token
      next();
    }else {
     if(to.path === '/login'){
        next();
      }else {
        alert('请先进行登录！')
        next({
          path:'/login'
        })
      }
    }
  }
  else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if(to.fullPath == "/login"){
    if(localStorage.getItem('userInfo')){
      alert('您已经登录了，如果想要登录其他账号，请先退出当前账号！')
      next({
        path:from.fullPath
      });
    }else {
      next();
    }
  }
});
```

或者是

```js
router.beforeEach((to, from, next)=> {
 let userInfo = localStorage.getItem('userInfo')
 let list = ['login','checking','register','phoneLogi','chat','GroupSharing','new_file','videoChat',]//多个路由
 if (userInfo || list.indexOf(to.name) !== -1) {
   next()
 }
 else {
   next({
     name:'login'
   })
 }
  // next()
})
```

参数说明：

   \* to: Route: 即将要进入的目标 路由对象 
   \* from: Route: 当前导航正要离开的路由 
   \* next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。 