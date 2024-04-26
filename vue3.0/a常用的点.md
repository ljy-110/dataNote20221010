vue3中常见的点

1、js文件使用路由跳转

```js
//在js文件引入router的index.js
import router from '../router/index'

//使用
router.push('/login')
```

2、获取ref的dom，获取盒子的scrollLeft和获取scrollWidth

```js
<div ref="myBox">Hello, Vue 3.0!</div>

const myBox = ref(null);


//获取盒子宽高度
const scrollWidth = myBox.value.scrollWidth;
// 设置 scrollLeft  
myBox.value.scrollLeft = 100; // 滚动到水平位置 100px

onMounted(() => {  
      console.log(myBox.value); // 输出 DOM 元素  
});
```

3、获取子组件的ref，触发方法

```js
<ChildComponent ref="childRef" />
    
const childRef = ref(null);

childRef.value.childMethod(); //子组件方法
```

4、nextTick用法

```js
import { ref, onMounted, nextTick } from 'vue'; 

nextTick(() => {  
    //操作
});
```

5、computed计算机属性

```js
import { ref, computed } from 'vue';

const count = ref(0); 
const doubled = computed(() => {  
  return count.value * 2;  
}); 
```

6、全局组件引入使用

```js
import vue3SeamlessScroll from 'vue3-seamless-scroll';

app.use(vue3SeamlessScroll);

<vue3-seamless-scroll
                :list="sectionNameList"
                class="seamless-warp"
                direction="left"
                :step="0.5"
                :limitScrollNum="1"
/>
```

7、页面销毁触发的生命周期

```js
import { onUnmounted, ref } from 'vue'; 

// 当组件卸载时，这个函数会被调用  
onUnmounted(() => {  
  console.log('组件已卸载');  
  // 在这里执行组件卸载时需要进行的清理工作，比如取消定时器、移除事件监听器等  
}); 
```

