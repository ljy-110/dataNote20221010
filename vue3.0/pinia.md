用法，index.js

```js
import { defineStore } from 'pinia'

export const useInfoStore = defineStore('counter', {
  // 推荐用于完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      fullLoading: false,
      systemInfo: {},
      sessionInfo: {}
    }
  },
  // 定义getters，类似于computed，具有缓存功能
  getters: {
    getSystemInfo: (state) => (state.systemInfo = JSON.parse(sessionStorage.systemInfo)),
    getSessionInfo: (state) => (state.systemInfo = JSON.parse(sessionStorage.sessionInfo))
  },
  // 定义actions，类似于methods，用来修改state，做一些业务逻辑
  actions: {
    updateSystemInfo() {
      this.systemInfo = JSON.parse(sessionStorage.systemInfo)
    },
    updateSessionInfo() {
      this.sessionInfo = JSON.parse(sessionStorage.sessionInfo)
    }
  }
})

```

页面使用

```js
import { useInfoStore } from '@/stores/counter'
const store = useInfoStore()

store.updateSystemInfo()
```

