用vue router如何获得当前页面的路由url-->this.$route.path

```js
this.$route.path
```

获取当前地址栏的url

```js
window.location.href
```

vue监听路由变化

```vue
watch:{
  $route(to,from){
    console.log(to.path);
  }
},

或者

watch: {
  $route: {
    handler: function(val, oldVal){
      console.log(val);
    },
    // 深度观察监听
    deep: true
  }
},

或者

// 监听,当路由发生变化的时候执行
watch: {
  '$route':'getPath'
},
methods: {
  getPath(){
    console.log(this.$route.path);
  }
}
```

```
beforeRouteLeave(to, from, next) {
    next()
},
beforeRouteEnter(to, from, next) {
    next()
},
beforeRouteUpdate(to, from, next) { // 用于相同路由组件的的参数更新
    next()
},
data:{},
method: {}

//
beforeRouteLeave(to, from, next) {
    console.log(this.ruleForm || this.src);
    if(this.ruleForm || this.src){
      this.$confirm('是否将你填写的数据保存为草稿？')
      .then(_ => {
        // next()
      })
      .catch(_ => {
        next()
      });
    }else{
      next()
    }
  },
```

<<<<<<< HEAD
=======
vue中，我们经常需要用到根据不同的路由来进行不一样的操作或者实现不一样的功能，所以获取当前页面的路由是我们经常需要的功能。今天我们就来盘点下vue中都有那些方法可以来获取当前的路由。

一、`vue-router`的导航守卫

`vue-router`的导航守卫是我们最常用的一种获取路由的方法，这种方式是`vue-router`自带的一个方法属性，它有全局的路由守卫、路由的独享的守卫、组件内的守卫等一些方法。

1、全局的路由守卫--`router.beforeEach`，这个常用来对路由的权限进行设置

to  即将进入的路由对象
from 正要离开的页面的路由对象
next() 进行下一步

```js
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.query.novalidate) {
    next()
    return
  }
  next()
  
})
```

2、路由的独享的守卫 ----`beforeEnter`

这是一个写在了路由文件里面的一个方法

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

3、组件内的守卫

组件内的守卫主要是包含了三种，`beforeRouteLeave`,`beforeRouteEnter`,`beforeRouteUpdate`，这三种都是需要在特定的环境下才可以触发使用

```js
//导航离开盖组件的时候调用
// 可以访问组件实例 `this`
beforeRouteLeave(to, from, next) {
    next()
},
// 在渲染该组件的对应路由被 confirm 前调用
// 不！能！获取组件实例 `this`
// 因为当守卫执行前，组件实例还没被创建
beforeRouteEnter(to, from, next) {
    next()
},
// 在当前路由改变，但是该组件被复用时调用
// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
// 可以访问组件实例 `this`
beforeRouteUpdate(to, from, next) { // 用于相同路由组件的的参数更新
    next()
},
```

二、使用vue的监听功能，`watch`

监听的功能，有时候可以直接获取到当前的路由，或者是路由变化时候进行触发，有时候需要深度的监听才可以进行获取到。所以主要看你的实际情况。

```js
watch:{
  $route(to,from){
    console.log(to.path);
  }
},

或者

watch: {
  $route: {
    handler: function(val, oldVal){
      console.log(val);
    },
    // 深度观察监听
    deep: true
  }
},

或者

// 监听,当路由发生变化的时候执行
watch: {
  '$route':'getPath'
},
methods: {
  getPath(){
    console.log(this.$route.path);
  }
}
```

三、直接获取当前页面的url

1、用vue router如何获得当前页面的路由url-->this.$route.path

```js
this.$route.path
```

2、获取当前地址栏的url

```js
window.location.href
```

四、使用了vue的`updated()`方法

这种方法是在当前页面的时候获取当前的路由来进行截取

```js
updated(){
    console.log(location.href)
    let url = location.href
    let route = (url).substring((url).lastIndexOf("/")+1)
}
```

>>>>>>> 8939307 (2022年10月10日2)
