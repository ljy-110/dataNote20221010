vue消除url上面的`#`符号

在router的index.js的里面添加`mode:'history',`

```js
export default new Router({
  mode:'history',//加入这个
  routes: [
    {
      path: '/cxyz',
      name: 'cxyz',
      component: cxyz,
      meta:{requireAuth:true}
    },
  ]
})
```

