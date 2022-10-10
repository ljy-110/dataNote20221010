## vue的url带参数跳转

### 1.router带参数

```js
{
  path: '/operate/:id',//带参数
  name: 'operate',
  meta:{requireAuth:true},
  component: ()=>import('@/page/user/operate')
},
```

然后带参数跳转

```js
this.$router.push({path:'/operate/${id}'})
```

获取参数

```js


或者也可以通过props来获取参数

props: ['id']
```

### 2.query带参数

使用query带参数会显示在url的后面

```js
this.$router.push({path:'/operate',query:{id:id}})
```

获取参数

```js
this.$route.query.id
```

### 3.params参数

```js
this.$router.push({name:'operate', params:{id: '2'}});
```

获取参数

```js
this.$route.params.id
```

### 4.push()跳转的用法

```js
this.$router.push('/operate')

this.$router.push({path:'/operate'})

this.$router.push({path:'/operate/${id}'})//刷新还在
 
this.$router.push({name:'operate', params:{id: '2'}})
 
this.$router.push({path:'/operate', query:{id: '2'}})
```

