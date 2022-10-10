vue-router的路由懒加载

```js
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/solution-bussiness',
      name: 'solution-bussiness',
      // component: bussiness,
      component: (resolve) => require(['@/page/solution-bussiness'], resolve)
    }
  })
```

