配置路由

index.js

```js
import { createRouter, createWebHistory } from 'vue-router';
// createWebHashHistory
import mainRoute from './main.js';
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main.vue'),
    meta: { title: '容器' },
    children: mainRoute
  }
];

const router = createRouter({
  // 使用 hash 模式构建路由（ url中带 # 号的那种)
  // history: createWebHashHistory(),
  // 使用 history 模式构建路由 （ url 中没有 # 号，但生产环境需要特殊配置）
  history: createWebHistory(),
  routes
});

export default router;
```

main.js

```js
const mainRoute = [
  {
    path: 'index',
    name: 'index',
    component: () => import('../views/home/index.vue'),
    meta: { title: '首页' }
  }
];

export default mainRoute;
```

